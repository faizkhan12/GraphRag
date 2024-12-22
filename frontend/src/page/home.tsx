import { useNavigate } from "react-router";
import Button from "../components/button";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col justify-center items-center w-full h-screen bg-gray-900 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('your-background-image-url.jpg')" }}
      ></div>

      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-extrabold mb-4">
          Welcome to <br />
          <span className="text-blue-500">GraphRAG</span>
        </h1>
        <p className="text-xl max-w-xl mx-auto mb-8">
          GraphRAG leverage the power of large language models (LLMs) and
          knowledge graphs to centralize all brand information in a
          user-friendly, model-agnostic platform.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => navigate("/signin")}
            className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
          >
            Login
          </Button>
          <Button
            onClick={() => navigate("/signup")}
            className="bg-gray-700 text-white hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105"
          >
            Sign Up
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 text-center text-sm text-gray-400">
        <p>© 2024 GraphRAG. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
