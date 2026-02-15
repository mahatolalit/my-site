import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControls from "#components/WindowControls";
import { Download, ZoomIn, ZoomOut, Loader } from "lucide-react";

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for PDF rendering
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resume = () => {
    const [numPages, setNumPages] = useState(null);
    const [scale, setScale] = useState(() => window.innerWidth < 640 ? 1.3 : 1.0);
    const [containerWidth, setContainerWidth] = useState(null);
    const containerRef = useRef(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2.0));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));

    useEffect(() => {
        let animationFrameId;

        const resizeObserver = new ResizeObserver((entries) => {
            if (entries[0]) {
                const newWidth = entries[0].contentRect.width;
                
                // Throttle updates using requestAnimationFrame to prevent flickering loop
                cancelAnimationFrame(animationFrameId);
                animationFrameId = requestAnimationFrame(() => {
                     setContainerWidth(prev => {
                        // Only update if difference is significant (e.g., > 10px) to assume it's a real resize 
                        // and not a scrollbar adjustment loop.
                        if (!prev || Math.abs(prev - newWidth) > 15) {
                            return newWidth;
                        }
                        return prev;
                     });
                });
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="h-full flex flex-col bg-gray-100 w-full rounded-xl overflow-hidden">
            {/* Window Header */}
            <div id="window-header" className="bg-[#f3f4f6] px-2 sm:px-4 py-2 flex items-center justify-between border-b border-[#e5e7eb] h-14 shrink-0">
                <div className="flex items-center gap-4">
                    <WindowControls target="resume" />
                    <span className="font-semibold text-gray-700 hidden sm:block">Resume.pdf</span>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-1 bg-white rounded-md px-2 py-1 shadow-sm border border-gray-200">
                        <ZoomOut 
                            size={18} 
                            className="cursor-pointer hover:text-blue-600 active:scale-95 transition-transform" 
                            onClick={handleZoomOut}
                        />
                        <span className="text-xs text-gray-500 w-12 text-center select-none">{Math.round(scale * 100)}%</span>
                        <ZoomIn 
                            size={18} 
                            className="cursor-pointer hover:text-blue-600 active:scale-95 transition-transform" 
                            onClick={handleZoomIn}
                        />
                    </div>
                
                    <a 
                        href="/files/resume.pdf" 
                        download="resume.pdf"
                        className="p-1.5 hover:bg-gray-200 rounded-md transition-colors text-gray-700"
                        title="Download Resume"
                    >
                        <Download size={20} />
                    </a>
                </div>
            </div>

            {/* Content Area */}
            <div 
                ref={containerRef}
                className="flex-1 overflow-auto p-4 flex justify-center custom-scrollbar bg-[#525659]"
            >
                <Document
                    file="/files/resume.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="flex flex-col gap-4"
                    loading={
                        <div className="flex flex-col items-center gap-2 text-white/80 mt-20">
                            <Loader className="animate-spin" size={32} />
                            <p>Loading PDF...</p>
                        </div>
                    }
                    error={
                        <div className="text-red-400 mt-20 bg-red-900/20 p-4 rounded-lg">
                            Failed to load PDF. Please try downloading it.
                        </div>
                    }
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page 
                            key={`page_${index + 1}`} 
                            pageNumber={index + 1} 
                            scale={scale}
                            width={containerWidth ? Math.min(containerWidth - 40, 800) : null} // Subtract padding, max 800px
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                            className="shadow-lg"
                        />
                    ))}
                </Document>
            </div>
        </div>
    );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
