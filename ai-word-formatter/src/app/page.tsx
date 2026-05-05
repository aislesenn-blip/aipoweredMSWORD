"use client";

import { useState, useRef, useEffect } from "react";
import { Code2, Wand2, Download, AlertCircle, CheckCircle2, FileJson, Loader2, Maximize2, Printer } from "lucide-react";
import React from "react";

export default function Home() {
  const [jsonInput, setJsonInput] = useState("");

  useEffect(() => {
    fetch('/massive_payload.json')
      .then(res => res.text())
      .then(text => setJsonInput(text))
      .catch(err => console.error("Failed to load massive payload", err));
  }, []);

  const [jsonError, setJsonError] = useState<string | null>(null);
  const [parsedAst, setParsedAst] = useState<any | null>(null);
  const [zenMode, setZenMode] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    try {
      JSON.parse(e.target.value);
      setJsonError(null);
    } catch (err) {
      setJsonError("Invalid JSON Syntax");
    }
  };

  // Convert AST styles to React inline style objects
  const mapStylesToReact = (astStyle: any): React.CSSProperties => {
    const reactStyle: any = {};
    if (!astStyle) return reactStyle;

    if (astStyle.font) reactStyle.fontFamily = `'${astStyle.font}', serif`;
    if (astStyle.size) reactStyle.fontSize = `${astStyle.size}pt`;
    if (astStyle.align) reactStyle.textAlign = astStyle.align;
    if (astStyle.spacing) reactStyle.lineHeight = astStyle.spacing;
    if (astStyle.bold) reactStyle.fontWeight = "bold";
    if (astStyle.italic) reactStyle.fontStyle = "italic";
    if (astStyle.underline) reactStyle.textDecoration = "underline";
    if (astStyle.color) reactStyle.color = astStyle.color;
    if (astStyle.textIndent) reactStyle.textIndent = astStyle.textIndent;

    // Layout
    if (astStyle.border) reactStyle.border = astStyle.border;
    if (astStyle.borderBottom) reactStyle.borderBottom = astStyle.borderBottom;
    if (astStyle.borderLeft) reactStyle.borderLeft = astStyle.borderLeft;
    if (astStyle.borderStyle) reactStyle.borderStyle = astStyle.borderStyle;
    if (astStyle.backgroundColor) reactStyle.backgroundColor = astStyle.backgroundColor;
    if (astStyle.padding) reactStyle.padding = astStyle.padding;
    if (astStyle.paddingBottom) reactStyle.paddingBottom = astStyle.paddingBottom;
    if (astStyle.margin) reactStyle.margin = astStyle.margin;
    if (astStyle.marginBottom) reactStyle.marginBottom = astStyle.marginBottom;
    if (astStyle.marginRight) reactStyle.marginRight = astStyle.marginRight;
    if (astStyle.borderRadius) reactStyle.borderRadius = astStyle.borderRadius;
    if (astStyle.width) reactStyle.width = astStyle.width;
    if (astStyle.borderCollapse) reactStyle.borderCollapse = astStyle.borderCollapse;
    if (astStyle.display) reactStyle.display = astStyle.display;
    if (astStyle.alignItems) reactStyle.alignItems = astStyle.alignItems;
    if (astStyle.pageBreakInside) {
      reactStyle.breakInside = astStyle.pageBreakInside;
      reactStyle.pageBreakInside = astStyle.pageBreakInside;
    }

    // Multi-column
    if (astStyle.columns) reactStyle.columnCount = astStyle.columns;
    if (astStyle.columnGap) reactStyle.columnGap = astStyle.columnGap;

    return reactStyle;
  };

  const RenderIcon = ({ name, color = "currentColor", size = 24 }: { name: string, color?: string, size?: number }) => {
    switch(name.toLowerCase()) {
      case "tick":
      case "check":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        );
      case "cross":
      case "x":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        );
      case "warning":
      case "alert":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case "info":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
      default:
        return null;
    }
  };

  // Pure React Native Node Renderer
  const ASTNode = ({ node, index }: { node: any, index: string }) => {
    if (!node) return null;

    const reactStyle = mapStylesToReact(node.style);

    // Parse content lines supporting simple line breaks \n
    const renderContent = () => {
      if (!node.content) return null;
      return node.content.split('\\n').map((line: string, i: number) => (
        <React.Fragment key={i}>
          {line}
          {i < node.content.split('\\n').length - 1 && <br />}
        </React.Fragment>
      ));
    };

    const renderChildren = () => {
       if (node.children && Array.isArray(node.children)) {
         return node.children.map((child: any, i: number) => (
            <ASTNode key={`${index}-${i}`} node={child} index={`${index}-${i}`} />
         ));
       }
       return null;
    };

    switch (node.tag) {
      case "Header":
        return <div className="doc-header" style={{ width: '100%', ...reactStyle }}>{renderContent()}{renderChildren()}</div>;
      case "Columns":
        return <div className="doc-columns" style={reactStyle}>{renderContent()}{renderChildren()}</div>;
      case "Icon":
        return <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...reactStyle }}><RenderIcon name={node.name} color={node.color} size={node.size} /></span>;
      case "TitlePage":
        return <div className="title-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', breakAfter: 'page', pageBreakAfter: 'always', ...reactStyle }}>{renderContent()}{renderChildren()}</div>;
      case "Kichwa_Kuu":
      case "H1":
        return <h1 style={reactStyle}>{renderContent()}{renderChildren()}</h1>;
      case "Kichwa_Dogo":
      case "H2":
        return <h2 style={reactStyle}>{renderContent()}{renderChildren()}</h2>;
      case "Aya":
      case "Paragraph":
        return <p style={{ marginBottom: 0, ...reactStyle }}>{renderContent()}{renderChildren()}</p>;
      case "Blockquote":
        return <blockquote style={reactStyle}>{renderContent()}{renderChildren()}</blockquote>;
      case "List":
        return <ul style={reactStyle}>{renderContent()}{renderChildren()}</ul>;
      case "ListItem":
        return <li style={{ marginBottom: '8px', ...reactStyle }}>{renderContent()}{renderChildren()}</li>;
      case "Footnote":
        return <div style={reactStyle}><sup>1</sup> {renderContent()}{renderChildren()}</div>;
      case "Box":
        return <div style={reactStyle}>{renderContent()}{renderChildren()}</div>;
      case "Table":
        return <table style={reactStyle}><tbody>{renderContent()}{renderChildren()}</tbody></table>;
      case "TableRow":
        return <tr style={reactStyle}>{renderContent()}{renderChildren()}</tr>;
      case "TableCell":
        return <td style={reactStyle}>{renderContent()}{renderChildren()}</td>;
      case "Page_Break":
        return (
          <div className="native-page-break">
            <span className="break-text">Page Break</span>
          </div>
        );
      default:
        return <div style={reactStyle}>{renderContent()}{renderChildren()}</div>;
    }
  };

  const handleExecute = () => {
    try {
      const ast = JSON.parse(jsonInput);
      setJsonError(null);

      if (!ast.Document_Tree || !Array.isArray(ast.Document_Tree)) {
        setJsonError("Missing 'Document_Tree' array in JSON.");
        return;
      }

      setParsedAst(ast);
      setZenMode(true);
    } catch (err) {
      setJsonError("Engine failed to parse AST JSON.");
    }
  };

  const handleBrowserPrint = () => {
    window.print();
  };

  const isReady = jsonError === null && jsonInput.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-sans">

      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm print:hidden">
        <div className="flex items-center gap-2">
          <div className="bg-black text-white p-2 rounded-lg">
            <FileJson size={20} />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-black">React<span className="text-gray-500">AST Engine</span></h1>
        </div>

        <div className="flex items-center gap-3">
          {parsedAst && (
             <button
               onClick={() => setZenMode(!zenMode)}
               className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-3 py-2 flex items-center gap-2 border border-gray-200 rounded-md bg-white hover:bg-gray-50"
             >
               {zenMode ? <><Code2 size={16}/> Edit JSON</> : <><Maximize2 size={16}/> Preview Mode</>}
             </button>
          )}

          <button
            onClick={handleBrowserPrint}
            disabled={!parsedAst}
            className={`text-sm font-medium px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${parsedAst ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm" : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
             <Printer size={16} />
             Print Native
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className={`flex-1 flex ${zenMode ? 'flex-col items-center py-10' : 'flex-col lg:flex-row p-6 gap-8 max-w-[1600px] mx-auto w-full'} transition-all duration-300 print:p-0 print:m-0`}>

        {/* Left Panel: JSON Input */}
        {!zenMode && (
          <section className="flex-1 flex flex-col bg-[#1e1e1e] rounded-xl shadow-lg border border-gray-800 overflow-hidden shrink-0 print:hidden transition-opacity duration-300 h-[calc(100vh-120px)]">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-[#2d2d2d]">
              <div className="flex items-center gap-2">
                <Code2 size={18} className="text-blue-400" />
                <h2 className="text-sm font-semibold text-gray-200">1. AST Configuration</h2>
              </div>
              {jsonError ? (
                 <span className="text-xs text-red-400 flex items-center gap-1 font-medium bg-red-400/10 px-2 py-1 rounded"><AlertCircle size={14}/> {jsonError}</span>
              ) : (
                 <span className="text-xs text-green-400 flex items-center gap-1 font-medium bg-green-400/10 px-2 py-1 rounded"><CheckCircle2 size={14}/> Valid JSON</span>
              )}
            </div>
            <textarea
              className="flex-1 w-full p-6 resize-none focus:outline-none bg-[#1e1e1e] text-[#ce9178] font-mono text-sm leading-relaxed"
              value={jsonInput}
              onChange={handleJsonChange}
              spellCheck="false"
            ></textarea>
          </section>
        )}

        {/* Center Execute Button */}
        {!zenMode && (
          <div className="hidden lg:flex flex-col items-center justify-center -mx-4 z-10 print:hidden">
            <button
              onClick={handleExecute}
              disabled={!isReady}
              className={`p-4 rounded-full shadow-xl transition-transform ${isReady ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/40 hover:scale-105 active:scale-95 group relative" : "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300"}`}
            >
               <Wand2 size={24} className={isReady ? "group-hover:animate-pulse" : ""} />
            </button>
          </div>
        )}

        {/* Right Panel / Center Canvas: Output Render */}
        <section className={`${zenMode ? 'w-full flex justify-center bg-transparent' : 'flex-1 bg-[#F0F2F5] rounded-xl overflow-hidden relative'} flex flex-col print:w-full print:max-w-none print:block transition-all duration-300`}>

          <div className={`flex-1 ${zenMode ? 'w-full flex flex-col items-center' : 'flex-1 overflow-y-auto px-6 pb-6 flex flex-col items-center'} print:overflow-visible print:p-0 print:block print:bg-white`}>
             {parsedAst ? (
               <div ref={printRef} className="w-full text-black print-container print:shadow-none print:m-0 print:w-full flex flex-col items-center print:bg-white">

                 <div className="document-flow w-full relative">
                    {/* Watermark Rendering */}
                    {parsedAst.Metadata?.Watermark && (
                      <div className="watermark print-watermark" style={{
                        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-45deg)',
                        fontSize: '100px', color: 'rgba(0,0,0,0.05)', fontWeight: 'bold', pointerEvents: 'none',
                        zIndex: 1, whiteSpace: 'nowrap'
                      }}>
                        {parsedAst.Metadata.Watermark}
                      </div>
                    )}

                    {/* Native Continuous React Render */}
                    <div className="continuous-page-container" style={{
                       position: 'relative', padding: '96px', background: 'white', color: 'black',
                       boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', maxWidth: '21cm', margin: '0 auto', minHeight: '100vh'
                    }}>
                       {parsedAst.Document_Tree.map((node: any, idx: number) => (
                           <ASTNode key={`root-${idx}`} node={node} index={`root-${idx}`} />
                       ))}
                    </div>
                 </div>

               </div>
             ) : (
               <div className="text-center mt-32 max-w-xs bg-white p-8 rounded-xl shadow-sm border border-gray-200 print:hidden">
                 <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                    <FileJson size={32} className="text-gray-300" />
                 </div>
                 <p className="text-sm text-gray-600 font-medium">Workspace is Empty</p>
                 <p className="text-xs text-gray-400 mt-2 leading-relaxed">Paste your valid JSON and click the magic wand.</p>
               </div>
             )}
          </div>

        </section>

      </main>

      {/* Global Native CSS for Print Media and Page Breaks */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Visual cue for page breaks in UI */
        .native-page-break {
          width: 100%;
          text-align: center;
          border-bottom: 2px dashed #cbd5e1;
          margin: 60px 0;
          line-height: 0.1em;
          position: relative;
        }
        .native-page-break .break-text {
          background: #f8fafc;
          padding: 0 15px;
          color: #94a3b8;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 1in;
          }
          html, body, .print-container, .continuous-page-container, .document-flow, main, section {
            background: white !important;
            background-color: white !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          /* Remove layout restrictions to prevent memory crash on 130+ page renders */
          .print-container, .continuous-page-container {
            box-shadow: none !important;
            max-width: none !important;
            width: 100% !important;
            min-height: auto !important;
            display: block !important;
          }
          .native-page-break {
             border: none !important;
             margin: 0 !important;
             break-before: page !important;
             page-break-before: always !important;
          }
          .native-page-break .break-text {
             display: none !important;
          }
          .print-watermark {
             position: fixed !important;
             top: 50% !important;
             left: 50% !important;
          }
        }
      `}} />
    </div>
  );
}
