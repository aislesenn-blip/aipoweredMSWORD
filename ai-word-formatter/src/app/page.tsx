"use client";

import { useState, useRef } from "react";
import { Code2, Wand2, Download, AlertCircle, CheckCircle2, FileJson, Loader2, Maximize2, Minimize2, Printer } from "lucide-react";

export default function Home() {
  const defaultJson = `{
  "Metadata": {
    "Type": "Harvard Research Proposal",
    "Engine": "Recursive AST Parser v3.0",
    "Margins": "1 inch"
  },
  "Document_Tree": [
    {
      "tag": "TitlePage",
      "style": { "align": "center", "margin": "100px 0" },
      "children": [
        {
          "tag": "Kichwa_Kuu",
          "style": { "font": "Times New Roman", "size": 18, "bold": true, "margin": "0 0 50px 0" },
          "content": "THE EVOLUTION OF DETERMINISTIC FORMATTING ENGINES"
        },
        {
          "tag": "Aya",
          "style": { "font": "Times New Roman", "size": 12, "spacing": 2, "margin": "20px 0" },
          "content": "A Dissertation Proposal Submitted by\\nChief Engineer"
        },
        {
          "tag": "Aya",
          "style": { "font": "Times New Roman", "size": 12, "margin": "150px 0 0 0" },
          "content": "Harvard University\\nMay 2026"
        }
      ]
    },
    { "tag": "Page_Break" },
    {
      "tag": "Kichwa_Kuu",
      "style": { "font": "Times New Roman", "size": 14, "bold": true, "align": "center" },
      "content": "ABSTRACT"
    },
    {
      "tag": "Aya",
      "style": { "font": "Times New Roman", "size": 12, "spacing": 2, "align": "justify", "textIndent": "0.5in" },
      "content": "This research proposal explores the shift from non-deterministic AI text formatting tools to absolute, rule-based Abstract Syntax Tree (AST) parsers. By enforcing strict JSON schemas, documents can maintain 100% adherence to complex academic standards such as the Harvard formatting guidelines."
    },
    { "tag": "Page_Break" },
    {
      "tag": "Kichwa_Dogo",
      "style": { "font": "Times New Roman", "size": 12, "bold": true, "align": "left", "margin": "20px 0 10px 0" },
      "content": "1.0 INTRODUCTION"
    },
    {
      "tag": "Aya",
      "style": { "font": "Times New Roman", "size": 12, "spacing": 2, "align": "justify", "textIndent": "0.5in" },
      "content": "In recent years, the academic community has struggled with inconsistent document formatting caused by large language models. The traditional requirement of one-inch margins and double-spaced Times New Roman font is often ignored by intelligent agents attempting to be creative."
    },
    {
      "tag": "Blockquote",
      "style": { "font": "Times New Roman", "size": 12, "spacing": 1, "margin": "20px 1in 20px 1in", "align": "justify" },
      "content": "A block quotation is an extract consisting of more than 40 words from another author's work. According to strict Harvard guidelines, blockquotes should be single-spaced and indented on both the left and right margins, standing out from the double-spaced paragraphs around them without the use of quotation marks."
    },
    {
      "tag": "Aya",
      "style": { "font": "Times New Roman", "size": 12, "spacing": 2, "align": "justify", "textIndent": "0.5in" },
      "content": "To solve this, we introduce the JSON-driven pipeline. It guarantees the rendering of tables, lists, and specific layout boxes without hallucinations."
    },
    {
      "tag": "Kichwa_Dogo",
      "style": { "font": "Times New Roman", "size": 12, "bold": true, "align": "left", "margin": "20px 0 10px 0" },
      "content": "1.1 Key Methodologies"
    },
    {
      "tag": "List",
      "style": { "font": "Times New Roman", "size": 12, "spacing": 2, "margin": "10px 0 10px 0.5in" },
      "children": [
        { "tag": "ListItem", "content": "Complete decoupling of content and style." },
        { "tag": "ListItem", "content": "Recursive node traversal for complex layouts like Nested Tables." },
        { "tag": "ListItem", "content": "Deterministic CSS injection for PDF conversion." }
      ]
    },
    {
      "tag": "Aya",
      "style": { "font": "Times New Roman", "size": 12, "spacing": 2, "align": "justify", "margin": "40px 0 0 0" },
      "content": "_____________________"
    },
    {
      "tag": "Footnote",
      "style": { "font": "Times New Roman", "size": 10, "spacing": 1, "align": "left" },
      "content": "1. Chief Engineer, 'Building the AST Renderer,' Google Workspace Journal (2026), p. 45."
    }
  ]
}`;

  const [jsonInput, setJsonInput] = useState(defaultJson);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [formattedHtml, setFormattedHtml] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [zenMode, setZenMode] = useState(false); // Controls whether JSON editor is hidden
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

  const renderASTNode = (node: any): string => {
    if (!node) return "";

    let nodeStyle = "";
    if (node.style) {
      if (node.style.font) nodeStyle += `font-family: '${node.style.font}', serif; `;
      if (node.style.size) nodeStyle += `font-size: ${node.style.size}pt; `;
      if (node.style.align) nodeStyle += `text-align: ${node.style.align}; `;
      if (node.style.spacing) nodeStyle += `line-height: ${node.style.spacing}; `;
      if (node.style.bold) nodeStyle += `font-weight: bold; `;
      if (node.style.italic) nodeStyle += `font-style: italic; `;
      if (node.style.underline) nodeStyle += `text-decoration: underline; `;
      if (node.style.color) nodeStyle += `color: ${node.style.color}; `;
      if (node.style.textIndent) nodeStyle += `text-indent: ${node.style.textIndent}; `;

      if (node.style.border) nodeStyle += `border: ${node.style.border}; `;
      if (node.style.backgroundColor) nodeStyle += `background-color: ${node.style.backgroundColor}; `;
      if (node.style.padding) nodeStyle += `padding: ${node.style.padding}; `;
      if (node.style.margin) nodeStyle += `margin: ${node.style.margin}; `;
      if (node.style.borderRadius) nodeStyle += `border-radius: ${node.style.borderRadius}; `;
      if (node.style.width) nodeStyle += `width: ${node.style.width}; `;
      if (node.style.borderCollapse) nodeStyle += `border-collapse: ${node.style.borderCollapse}; `;
    }

    const contentHtml = node.content ? node.content.replace(/\n/g, '<br/>') : '';
    let childrenHtml = "";
    if (node.children && Array.isArray(node.children)) {
       childrenHtml = node.children.map((childNode: any) => renderASTNode(childNode)).join('');
    }

    const innerHtml = contentHtml + childrenHtml;

    switch (node.tag) {
      case "TitlePage":
        return `<div class="title-page" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 800px; ${nodeStyle}">${innerHtml}</div>`;
      case "Kichwa_Kuu":
      case "H1":
        return `<h1 style="${nodeStyle}">${innerHtml}</h1>`;
      case "Kichwa_Dogo":
      case "H2":
        return `<h2 style="${nodeStyle}">${innerHtml}</h2>`;
      case "Aya":
      case "Paragraph":
        return `<p style="margin-bottom: 0px; ${nodeStyle}">${innerHtml}</p>`;
      case "Blockquote":
        return `<blockquote style="${nodeStyle}">${innerHtml}</blockquote>`;
      case "List":
        return `<ul style="${nodeStyle}">${innerHtml}</ul>`;
      case "ListItem":
        return `<li style="margin-bottom: 8px; ${nodeStyle}">${innerHtml}</li>`;
      case "Footnote":
        return `<div style="${nodeStyle}"><sup>1</sup> ${innerHtml}</div>`;
      case "Box":
        return `<div style="${nodeStyle}">${innerHtml}</div>`;
      case "Table":
        return `<table style="${nodeStyle}">${innerHtml}</table>`;
      case "TableRow":
        return `<tr style="${nodeStyle}">${innerHtml}</tr>`;
      case "TableCell":
        return `<td style="${nodeStyle}">${innerHtml}</td>`;
      case "Page_Break":
        // Closes the current A4 page wrapper and opens a new one to simulate multiple pages in UI
        return `</div></div><div class="a4-page-wrapper" style="margin-top: 32px; padding: 0; background: transparent;"><div class="html2pdf__page-break" style="page-break-before: always; height: 1px; width: 100%; margin: 0; opacity: 0;"></div><div style="padding: 96px; background: white; color: black; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); min-height: 29.7cm;">`;
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

      // Open the first A4 wrapper
      htmlOutput += `<div class="a4-page-wrapper" style="padding: 0; background: transparent;"><div style="padding: 96px; background: white; color: black; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); min-height: 29.7cm;">`;

      ast.Document_Tree.forEach((node: any) => {
         htmlOutput += renderASTNode(node);
      });

      // Close the final A4 wrapper
      htmlOutput += `</div></div>`;
      setFormattedHtml(htmlOutput);

      // Automatically switch to Zen Mode for Print Preview Experience
      setZenMode(true);

    } catch (err) {
      setJsonError("Engine failed to parse AST JSON.");
    }
  };

  const handleExportPDF = async () => {
    if (!printRef.current || !formattedHtml) return;
    setIsExporting(true);

    try {
      // @ts-ignore
      const html2pdf = (await import('html2pdf.js')).default;

      const opt = {
        margin:       [25.4, 25.4, 25.4, 25.4] as [number, number, number, number], // 1 inch margins all around
        filename:     'Harvard_Academic_Document.pdf',
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        pagebreak:    { mode: ['css', 'legacy'], avoid: ['tr', 'blockquote'] },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
      };

      await html2pdf().set(opt).from(printRef.current).save();
    } catch (error) {
      console.error("PDF Export failed:", error);
      alert("Failed to export PDF.");
    } finally {
      setIsExporting(false);
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
          <h1 className="text-xl font-semibold tracking-tight text-black">Academic<span className="text-gray-500">Workspace</span></h1>
        </div>

        <div className="flex items-center gap-3">
          {formattedHtml && (
             <button
               onClick={() => setZenMode(!zenMode)}
               className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-3 py-2 flex items-center gap-2 border border-gray-200 rounded-md bg-white hover:bg-gray-50"
             >
               {zenMode ? <><Code2 size={16}/> Edit JSON</> : <><Maximize2 size={16}/> Preview Mode</>}
             </button>
          )}

          <button
            onClick={handleBrowserPrint}
            disabled={!formattedHtml}
            className={`text-sm font-medium px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${formattedHtml ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm" : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
             <Printer size={16} />
             Print
          </button>

          <button
            onClick={handleExportPDF}
            disabled={!formattedHtml || isExporting}
            className={`text-sm font-medium px-5 py-2 rounded-md transition-colors flex items-center gap-2 ${formattedHtml && !isExporting ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {isExporting ? "Generating PDF..." : "Export to PDF"}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className={`flex-1 flex ${zenMode ? 'flex-col items-center py-10' : 'flex-col lg:flex-row p-6 gap-8 max-w-[1600px] mx-auto w-full'} transition-all duration-300 print:p-0 print:m-0`}>

        {/* Left Panel: JSON Input (Hidden in Zen Mode) */}
        {!zenMode && (
          <section className="flex-1 flex flex-col bg-[#1e1e1e] rounded-xl shadow-lg border border-gray-800 overflow-hidden shrink-0 print:hidden transition-opacity duration-300 h-[calc(100vh-120px)]">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-[#2d2d2d]">
              <div className="flex items-center gap-2">
                <Code2 size={18} className="text-blue-400" />
                <h2 className="text-sm font-semibold text-gray-200">1. Define AST Configuration</h2>
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

        {/* Center Execute Button (Hidden in Zen Mode) */}
        {!zenMode && (
          <div className="hidden lg:flex flex-col items-center justify-center -mx-4 z-10 print:hidden">
            <button
              onClick={handleExecute}
              disabled={!isReady}
              className={`p-4 rounded-full shadow-xl transition-transform ${isReady ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/40 hover:scale-105 active:scale-95 group relative" : "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300"}`}
            >
               <Wand2 size={24} className={isReady ? "group-hover:animate-pulse" : ""} />
               {isReady && (
                <span className="absolute -top-10 bg-black text-white text-xs py-1 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Render Document
                </span>
              )}
            </button>
          </div>
        )}

        {/* Right Panel / Center Canvas: Output Render */}
        <section className={`${zenMode ? 'w-full max-w-[21cm] bg-transparent' : 'flex-1 bg-[#F0F2F5] rounded-xl overflow-hidden relative'} flex flex-col print:w-full print:max-w-none print:block transition-all duration-300`}>

          {!zenMode && (
            <div className="p-4 flex items-center justify-between z-10 print:hidden">
               <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest ml-4">Print Preview</h2>
            </div>
          )}

          <div className={`flex-1 ${zenMode ? '' : 'overflow-y-auto px-6 pb-6'} flex flex-col items-center print:overflow-visible print:p-0`}>
             {formattedHtml ? (
               <div
                 ref={printRef}
                 className="w-full text-black print-container print:w-full print:p-0 print:shadow-none"
                 dangerouslySetInnerHTML={{ __html: formattedHtml }}
               />
             ) : (
               <div className="text-center mt-32 max-w-xs bg-white p-8 rounded-xl shadow-sm border border-gray-200 print:hidden">
                 <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                    <FileJson size={32} className="text-gray-300" />
                 </div>
                 <p className="text-sm text-gray-600 font-medium">Workspace is Empty</p>
                 <p className="text-xs text-gray-400 mt-2 leading-relaxed">Paste your valid Harvard-formatted JSON on the left and click the magic wand.</p>
               </div>
             )}
          </div>

        </section>

      </main>

      {/* Global CSS for Print Media to Hide non-document stuff during window.print() */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background-color: white; margin: 0; padding: 0; }
          .print-container { box-shadow: none !important; margin: 0 !important; }
          .a4-page-wrapper { margin: 0 !important; }
        }
      `}} />
    </div>
  );
}
