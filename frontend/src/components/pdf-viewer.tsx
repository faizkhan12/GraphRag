import React, { useEffect, useRef } from "react";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.5.141/pdf.worker.min.js";

interface PdfViewerProps {
  url: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url }) => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const renderPage = async (page: pdfjs.PDFPageProxy) => {
    const viewport = page.getViewport({ scale: 1.2 });

    const wrapper = document.createElement("div");
    wrapper.style.marginBottom = "16px";
    wrapper.style.position = "relative";
    wrapper.id = `page-${page.pageNumber}`;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Failed to get canvas context.");
      return;
    }

    canvas.height = viewport.height;
    canvas.width = viewport.width;
    wrapper.appendChild(canvas);

    if (canvasContainerRef.current) {
      canvasContainerRef.current.appendChild(wrapper);
    }

    try {
      await page.render({
        canvasContext: ctx,
        viewport: viewport,
      }).promise;

      const textLayer = document.createElement("div");
      textLayer.className = "textLayer";
      const textContent = await page.getTextContent();
      pdfjs.renderTextLayer({
        textContentSource: textContent,
        viewport: page.getViewport({ scale: 1.2 }),
        container: textLayer,
      });

      wrapper.appendChild(textLayer);
    } catch (renderError) {
      console.error("Error rendering page:", renderError);
    }
  };

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdfDoc = await pdfjs.getDocument(url).promise;

        for (let num = 1; num <= pdfDoc._pdfInfo.numPages; num++) {
          pdfDoc
            .getPage(num)
            .then(renderPage)
            .catch((err) => {
              console.error(`Error getting page ${num}:`, err);
            });
        }
      } catch (err) {
        console.error("Error loading PDF document:", err);
      }
    };

    loadPdf();
  }, [url]);

  return (
    <div className="pdf-container">
      <div
        ref={canvasContainerRef}
        className="pdf-wrapper"
        style={{ "--scale-factor": "1.2" } as React.CSSProperties}
      />
    </div>
  );
};

export default PdfViewer;
