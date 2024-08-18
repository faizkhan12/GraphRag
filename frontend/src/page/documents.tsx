import React, { useEffect, useState } from "react";
import AuthGuard from "../components/auth-guard";
import axios from "axios";

interface Document {
  id: string;
  name: string;
}

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get<Document[]>("/api/pdfs");
        setDocuments(response.data);
      } catch (err) {
        setError("Failed to load documents.");
      }
    };

    fetchDocuments();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <AuthGuard>
      <div className="flex flex-row justify-between items-center my-4 px-6">
        <h2 className="text-4xl font-extrabold m-2 text-white">
          Your Documents
        </h2>
        <div>
          <a
            href="/upload-document"
            className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105"
          >
            New
          </a>
        </div>
      </div>

      <div className="flex flex-col px-6">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg overflow-hidden shadow-lg">
              {documents.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-700 bg-gray-900 text-white">
                  <thead className="bg-blue-500 text-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                      >
                        Document Name
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-700">
                    {documents.map((document) => (
                      <tr
                        key={document.id}
                        className="hover:bg-gray-800 transition-colors duration-300"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {document.name}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            className="text-blue-400 hover:text-blue-500 transition-colors duration-300 hover:underline"
                            href={`/documents/${document.id}`}
                          >
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center text-3xl flex justify-center items-center text-gray-300 py-10">
                  No documents to show yet. Please upload a new one.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default DocumentsPage;
