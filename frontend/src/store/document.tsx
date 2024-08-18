import { createContext, useReducer, useContext, useCallback } from "react";
import { api, getErrorMessage } from "../api/axios";
import { AxiosProgressEvent } from "axios";

export interface Document {
  id: string;
  file_id: string;
  name: string;
}

interface UploadStore {
  data: Document[];
  error: string;
  uploadProgress: number;
}

const INITIAL_STATE: UploadStore = {
  data: [],
  error: "",
  uploadProgress: 0,
};

type DocumentAction =
  | { type: "SET"; payload: Partial<UploadStore> }
  | { type: "SET_UPLOAD_PROGRESS"; payload: number }
  | { type: "CLEAR_ERRORS" };

const documentReducer = (
  state: UploadStore,
  action: DocumentAction
): UploadStore => {
  switch (action.type) {
    case "SET":
      return { ...state, ...action.payload };
    case "SET_UPLOAD_PROGRESS":
      return { ...state, uploadProgress: action.payload };
    case "CLEAR_ERRORS":
      return { ...state, error: "", uploadProgress: 0 };
    default:
      return state;
  }
};

const DocumentContext = createContext<
  UploadStore & {
    upload: (file: File) => Promise<void>;
    getDocuments: () => Promise<void>;
    clearErrors: () => void;
  }
>({
  ...INITIAL_STATE,
  upload: async () => {},
  getDocuments: async () => {},
  clearErrors: () => {},
});

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(documentReducer, INITIAL_STATE);

  const set = (val: Partial<UploadStore>) => {
    dispatch({ type: "SET", payload: val });
  };

  const setUploadProgress = useCallback((event: AxiosProgressEvent) => {
    const progress = event.total
      ? Math.round((event.loaded / event.total) * 100)
      : 0;
    dispatch({ type: "SET_UPLOAD_PROGRESS", payload: progress });
  }, []);

  const upload = async (file: File) => {
    set({ error: "" });

    try {
      const formData = new FormData();
      formData.append("file", file);

      await api.post("/pdfs", formData, {
        onUploadProgress: setUploadProgress,
      });
    } catch (error) {
      set({ error: getErrorMessage(error) });
    }
  };

  const getDocuments = async () => {
    try {
      const { data } = await api.get("/pdfs");
      set({ data });
    } catch (error) {
      set({ error: getErrorMessage(error) });
    }
  };

  const clearErrors = () => {
    dispatch({ type: "CLEAR_ERRORS" });
  };

  return (
    <DocumentContext.Provider
      value={{
        ...state,
        upload,
        getDocuments,
        clearErrors,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => useContext(DocumentContext);
