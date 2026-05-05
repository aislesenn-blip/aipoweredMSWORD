"use client";

import { useState, useRef } from "react";
import { Code2, Wand2, Download, AlertCircle, CheckCircle2, FileJson } from "lucide-react";

export default function Home() {
  const defaultJson = `{
  "Metadata": {
    "Type": "Ripoti ya Fedha",
    "Engine": "Recursive AST Parser v2.0",
    "Margins": "1 inch"
  },
  "Document_Tree": [
    {
      "tag": "Kichwa_Kuu",
      "style": { "font": "Arial", "size": 18, "align": "center", "bold": true },
      "content": "RIPOTI YA ROBO MWAKA"
    },
    {
      "tag": "Box",
      "style": {
        "border": "2px solid #2563eb",
        "backgroundColor": "#eff6ff",
        "padding": "16px",
        "borderRadius": "8px",
        "margin": "20px 0"
      },
      "children": [
        {
          "tag": "Aya",
          "style": { "font": "Arial", "size": 12, "bold": true, "color": "#1d4ed8" },
          "content": "KUMBUKA: Takwimu hizi ni za siri na zinatumika kwa matumizi ya ndani tu."
        }
      ]
    },
    {
      "tag": "Table",
      "style": {
        "width": "100%",
        "borderCollapse": "collapse",
        "margin": "20px 0"
      },
      "children": [
        {
          "tag": "TableRow",
          "children": [
            {
              "tag": "TableCell",
              "style": { "border": "1px solid black", "padding": "8px", "backgroundColor": "#f3f4f6", "bold": true },
              "content": "Mwezi"
            },
            {
              "tag": "TableCell",
              "style": { "border": "1px solid black", "padding": "8px", "backgroundColor": "#f3f4f6", "bold": true },
              "content": "Mapato"
            }
          ]
        },
        {
          "tag": "TableRow",
          "children": [
            {
              "tag": "TableCell",
              "style": { "border": "1px solid black", "padding": "8px" },
              "content": "Januari"
            },
            {
              "tag": "TableCell",
              "style": { "border": "1px solid black", "padding": "8px", "align": "right" },
              "content": "TZS 5,000,000"
            }
          ]
        }
      ]
    },
    {
      "tag": "Page_Break"
    },
    {
      "tag": "Kichwa_Dogo",
      "style": { "font": "Arial", "size": 16, "bold": true },
      "content": "Ukurasa Mpya (Baada ya Page Break)"
    },
    {
      "tag": "Aya",
      "style": { "font": "Times New Roman", "size": 12, "spacing": 1.5 },
      "content": "Huu ni uthibitisho wa jinsi Engine yetu mpya inavyosoma na kuelewa watoto (children) ndani ya AST, na kuruhusu uchoraji wa Tables, Boxes, na kukata kurasa kikamilifu."
    }
  ]
}`;

  const [jsonInput, setJsonInput] = useState(defaultJson);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [formattedHtml, setFormattedHtml] = useState<string | null>(null);
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

  // --- RECURSIVE RENDERER ---
  const renderASTNode = (node: any): string => {
    if (!node) return "";

    let nodeStyle = "";
    if (node.style) {
      if (node.style.font) nodeStyle += `font-family: '${node.style.font}', serif; `;
      if (node.style.size) nodeStyle += `font-size: ${node.style.size}pt; `;
      if (node.style.align) nodeStyle += `text-align: ${node.style.align}; `;
      if (node.style.spacing) nodeStyle += `line-height: ${node.style.spacing}; `;
      if (node.style.bold) nodeStyle += `font-weight: bold; `;
      if (node.style.underline) nodeStyle += `text-decoration: underline; `;
      if (node.style.color) nodeStyle += `color: ${node.style.color}; `;

      // Box/Table Specific Styles
      if (node.style.border) nodeStyle += `border: ${node.style.border}; `;
      if (node.style.backgroundColor) nodeStyle += `background-color: ${node.style.backgroundColor}; `;
      if (node.style.padding) nodeStyle += `padding: ${node.style.padding}; `;
      if (node.style.margin) nodeStyle += `margin: ${node.style.margin}; `;
      if (node.style.borderRadius) nodeStyle += `border-radius: ${node.style.borderRadius}; `;
      if (node.style.width) nodeStyle += `width: ${node.style.width}; `;
      if (node.style.borderCollapse) nodeStyle += `border-collapse: ${node.style.borderCollapse}; `;
    }

    // Process Content or Children
    const contentHtml = node.content ? node.content.replace(/\n/g, '<br/>') : '';
    let childrenHtml = "";
    if (node.children && Array.isArray(node.children)) {
       childrenHtml = node.children.map((childNode: any) => renderASTNode(childNode)).join('');
    }

    const innerHtml = contentHtml + childrenHtml;

    switch (node.tag) {
      case "Kichwa_Kuu":
      case "H1":
        return `<h1 style="margin-bottom: 24px; ${nodeStyle}">${innerHtml}</h1>`;
      case "Kichwa_Dogo":
      case "H2":
        return `<h2 style="margin-top: 20px; margin-bottom: 12px; ${nodeStyle}">${innerHtml}</h2>`;
      case "Aya":
      case "Paragraph":
        return `<p style="margin-bottom: 16px; ${nodeStyle}">${innerHtml}</p>`;

      // Complex Elements
      case "Box":
        return `<div style="${nodeStyle}">${innerHtml}</div>`;
      case "Table":
        return `<table style="${nodeStyle}">${innerHtml}</table>`;
      case "TableRow":
        return `<tr style="${nodeStyle}">${innerHtml}</tr>`;
      case "TableCell":
        return `<td style="${nodeStyle}">${innerHtml}</td>`;

      // Layout Control
      case "Page_Break":
        // html2pdf.js uses the class 'html2pdf__page-break' to force breaks
        return `<div class="html2pdf__page-break" style="page-break-before: always; height: 1px; width: 100%; border-bottom: 1px dashed #ccc; margin: 40px 0; opacity: 0.3;"></div>`;

      default:
        return `<div style="${nodeStyle}">${innerHtml}</div>`;
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

      let htmlOutput = "";

      let containerStyle = "padding: 40px;";
      if (ast.Metadata && ast.Metadata.Margins) {
         if (ast.Metadata.Margins.includes("1.5 inch")) {
            containerStyle = "padding: 40px 40px 40px 96px;";
         }
      }

      htmlOutput += `<div style="${containerStyle}">`;

      // Trigger the recursive parser
      ast.Document_Tree.forEach((node: any) => {
         htmlOutput += renderASTNode(node);
      });

      htmlOutput += `</div>`;
      setFormattedHtml(htmlOutput);

    } catch (err) {
      setJsonError("Engine failed to parse AST JSON.");
    }
  };

  const handleExportPDF = async () => {
    if (!printRef.current || !formattedHtml) return;

    // @ts-ignore
    const html2pdf = (await import('html2pdf.js')).default;

    const opt = {
      margin:       10,
      filename:     'Rendered_Document_Advanced.pdf',
      image:        { type: 'jpeg' as const, quality: 0.98 },
      html2canvas:  { scale: 2 },
      pagebreak:    { mode: 'css', avoid: ['tr', 'h1', 'h2'] }, // Respect css page breaks and avoid breaking rows
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
    };

    html2pdf().set(opt).from(printRef.current).save();
  };

  const isReady = jsonError === null && jsonInput.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-black text-white p-2 rounded-lg">
            <FileJson size={20} />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-black">AST<span className="text-gray-500">Renderer v2</span></h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExportPDF}
            disabled={!formattedHtml}
            className={`text-sm font-medium px-5 py-2 rounded-md transition-colors flex items-center gap-2 ${formattedHtml ? "bg-black text-white hover:bg-gray-800 shadow-md" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            <Download size={16} />
            Export to PDF
          </button>
        </div>
      </header>

      {/* Main Content - 2 Panel Layout */}
      <main className="flex-1 flex flex-col lg:flex-row p-6 gap-8 max-w-[1600px] mx-auto w-full h-[calc(100vh-73px)]">

        {/* Left Panel: JSON Input */}
        <section className="flex-1 flex flex-col bg-[#1e1e1e] rounded-xl shadow-lg border border-gray-800 overflow-hidden shrink-0">
          <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-[#2d2d2d]">
            <div className="flex items-center gap-2">
              <Code2 size={18} className="text-blue-400" />
              <h2 className="text-sm font-semibold text-gray-200">1. Paste Advanced AST JSON</h2>
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

        {/* Center: Execute Button */}
        <div className="hidden lg:flex flex-col items-center justify-center -mx-4 z-10">
          <button
            onClick={handleExecute}
            disabled={!isReady}
            className={`p-4 rounded-full shadow-xl transition-transform ${isReady ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/40 hover:scale-105 active:scale-95 group relative" : "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300"}`}
          >
             <Wand2 size={24} className={isReady ? "group-hover:animate-pulse" : ""} />
             {isReady && (
              <span className="absolute -top-10 bg-black text-white text-xs py-1 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Execute Formatting
              </span>
            )}
          </button>
        </div>

        {/* Right Panel: Output Render */}
        <section className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50 z-10">
             <div className="flex items-center gap-2">
               <Wand2 size={18} className="text-purple-500" />
               <h2 className="text-sm font-semibold text-gray-700">2. Rendered Output</h2>
             </div>
          </div>

          <div className="flex-1 bg-gray-100/80 p-6 overflow-y-auto flex justify-center items-start">
             {formattedHtml ? (
               <div
                 ref={printRef}
                 className="bg-white shadow-xl w-full max-w-[21cm] min-h-[29.7cm] border border-gray-200 text-black print-container"
                 dangerouslySetInnerHTML={{ __html: formattedHtml }}
               />
             ) : (
               <div className="text-center mt-32 max-w-xs">
                 <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <FileJson size={32} className="text-gray-400" />
                 </div>
                 <p className="text-sm text-gray-600 font-medium">Ready for Execution</p>
                 <p className="text-xs text-gray-400 mt-2 leading-relaxed">Paste your valid JSON on the left and click the magic wand to compile the document.</p>
               </div>
             )}
          </div>

          {/* Mobile Execute Button */}
          <div className="lg:hidden absolute bottom-6 right-6 z-20">
             <button
                onClick={handleExecute}
                disabled={!isReady}
                className={`p-4 rounded-full shadow-xl transition-transform ${isReady ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/40 active:scale-95" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                <Wand2 size={24} />
             </button>
          </div>
        </section>

      </main>
    </div>
  );
}
