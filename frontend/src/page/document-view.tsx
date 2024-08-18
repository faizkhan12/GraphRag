import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useChat } from "../store/chat/store";
import { useSendMessage } from "../store/chat/index";
import ChatPanel from "../components/chat/chat-panel";
import axios from "axios";
import AuthGuard from "../components/auth-guard";

interface Document {
  id: number;
  name: string;
}

interface DocumentPageData {
  document: Document;
  documentUrl: string;
  error?: string;
}

const DocumentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<DocumentPageData | null>(null);
  const { resetAll } = useChat();
  const sendMessage = useSendMessage();

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`/api/pdfs/${id}`);
        setData({
          document: response.data.pdf,
          documentUrl: response.data.download_url,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setData({
          document: { id: 0, name: "" },
          documentUrl: "",
          error: "Failed to load document.",
        });
      }
    };

    fetchDocument();

    return () => {
      resetAll();
    };
  }, [id, resetAll]);

  const handleSubmit = (content: string) => {
    if (data?.document) {
      sendMessage({ role: "user", content }, { documentId: data.document.id });
    }
  };

  if (data?.error) {
    return <div className="text-red-500">{data.error}</div>;
  }

  if (!data || !data.document) {
    return <div>Loading...</div>;
  }

  return (
    <AuthGuard>
      <div
        className="flex justify-between gap-2 bg-white overflow-x-hidden"
        style={{ height: "calc(100vh - 80px)" }}
      >
        {/*
        Remove comment if want to view pdfViewer but there could be performance issue
        */}
        {/* <div className=" max-w-[60%]">
          <PdfViewer url={data.documentUrl} />
        </div> */}

        <div className="sticky top-0 z-[2000] mx-auto max-w-[60%]">
          <ChatPanel documentId={data.document.id} onSubmit={handleSubmit} />
        </div>
      </div>
    </AuthGuard>
  );
};

export default DocumentPage;
