import { useEffect } from "react";
import { useApiWithErrorHandling } from "./api/axios";
import { useAuth } from "./store/auth";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  const { loading, getUser } = useAuth();
  useApiWithErrorHandling();
  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mx-auto h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
