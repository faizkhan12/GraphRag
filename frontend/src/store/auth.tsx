import { createContext, useState, useContext } from "react";
import { api, getErrorMessage } from "../api/axios";

export type User =
  | {
      id: string;
      email: string;
    }
  | null
  | false;

interface AuthInfo {
  user: User;
  error: string;
  loading: boolean;
}

const INITIAL_STATE: AuthInfo = {
  user: null,
  error: "",
  loading: false,
};

const AuthContext = createContext<
  AuthInfo & {
    getUser: () => Promise<User | false>;
    signin: (email: string, password: string) => Promise<void>;
    signout: () => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    clearErrors: () => void;
  }
>({
  ...INITIAL_STATE,
  getUser: async () => INITIAL_STATE.user,
  signin: async () => {},
  signout: async () => {},
  signup: async () => {},
  clearErrors: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthInfo>(INITIAL_STATE);

  const set = (val: Partial<AuthInfo>) => {
    setState((prevState) => ({ ...prevState, ...val }));
  };

  const getUser = async () => {
    const { loading, user } = state;

    if (loading) {
      console.log("Already loading, returning existing user:", user);

      return user;
    }

    set({ loading: true });

    try {
      console.log("Making API call to /auth/user");

      const { data } = await api.get("/auth/user");
      if (!data) {
        set({ user: false, error: "" });
      } else {
        set({ user: data, error: "" });
      }
      return data;
    } catch (err) {
      set({ user: false });
      console.log(err);
      return false;
    } finally {
      set({ loading: false });
    }
  };

  const signin = async (email: string, password: string) => {
    set({ error: "", loading: true });

    try {
      const { data } = await api.post("/auth/signin", { email, password });
      set({
        user: data,
        error: "",
      });
    } catch (error) {
      set({ error: getErrorMessage(error) });
    } finally {
      set({ loading: false });
    }
  };

  const signout = async () => {
    set({ loading: true });
    try {
      await api.post("/auth/signout");
      set(INITIAL_STATE);
    } catch (err) {
      set({ error: getErrorMessage(err) });
    } finally {
      set({ loading: false });
    }
  };

  const signup = async (email: string, password: string) => {
    set({ error: "", loading: true });

    try {
      const { data } = await api.post("/auth/signup", { email, password });
      set({ user: data, error: "" });
    } catch (err) {
      set({ error: getErrorMessage(err) });
    } finally {
      set({ loading: false });
    }
  };

  const clearErrors = () => {
    set({ error: "", loading: false });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        getUser,
        signin,
        signout,
        signup,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
