import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDocuments } from "../store/document";
import Alert from "../components/alert";
import Button from "../components/button";
import AuthGuard from "../components/auth-guard";
import Spinner from "../components/spinner";

const UploadDocument: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUploadComplete] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { upload, error } = useDocuments();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files || files.length === 0) {
      setValidationError("Please select a PDF file to upload.");
      return;
    }
    const file = files[0];
    if (file.type !== "application/pdf") {
      setValidationError("Only PDF files are allowed.");

      return;
    }
    setLoading(true);
    setValidationError(null);

    await upload(files[0]);

    if (!error) {
      setUploadComplete(true);
      navigate("/documents");
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <h2 className="text-4xl font-extrabold text-white my-6">
          Upload a Document
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-black border border-gray-700 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
        >
          <div className="w-full">
            <label htmlFor="file-input" className="sr-only">
              Choose file
            </label>
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              accept=".pdf"
              name="file-input"
              id="file-input"
              className="block w-full border border-gray-500 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-500 file:text-white
                  hover:file:bg-blue-600 transition-colors duration-300"
            />
          </div>

          <div className="my-6" />
          {validationError && <Alert type="error">{validationError}</Alert>}

          {loading && !error && (
            <div className="flex justify-center my-4">
              <Spinner />
            </div>
          )}

          {error && <Alert>Error: {error}</Alert>}

          {!loading && (
            <Button
              className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
              disabled={loading}
            >
              Submit
            </Button>
          )}
        </form>
      </div>
    </AuthGuard>
  );
};

export default UploadDocument;
