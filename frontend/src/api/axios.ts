import axios from "axios";
import { useErrorStore } from "../store/errors"; // Adjust the path accordingly

interface ApiError {
  message: string;
  error: string;
}

export const api = axios.create({
  baseURL:
    import.meta.env.MODE !== "development"
      ? "https://xyz.com/api"
      : `http://localhost:5173/api`,
});

export const useApiWithErrorHandling = () => {
  const { addError } = useErrorStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleApiError = (err: any) => {
    if (err.response && err.response.status >= 500) {
      const { response } = err;
      const message = getErrorMessage(err);

      if (message) {
        addError({
          contentType:
            response.headers["Content-Type"] ||
            response.headers["content-type"],
          message: message,
        });
      }
    }
  };

  api.interceptors.response.use(
    (res) => res,
    (err) => {
      handleApiError(err);
      return Promise.reject(err);
    }
  );
};

export const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as ApiError;
    if (typeof apiError === "string" && (apiError as string).length > 0) {
      return apiError;
    }
    return apiError?.message || apiError?.error || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }

  return "Something went wrong";
};

export const getError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as ApiError;
    return apiError;
  }

  return null;
};
