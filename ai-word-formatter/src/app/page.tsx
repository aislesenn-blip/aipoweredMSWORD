"use client";

import { useState, useRef } from "react";
import { Code2, Wand2, Download, AlertCircle, CheckCircle2, FileJson, Loader2, Maximize2, Printer } from "lucide-react";

export default function Home() {
  const defaultJson = `{
  "Metadata": {
    "Type": "Advanced Document with Graphics",
    "Engine": "Ultimate AST Parser v4.0",
    "Margins": "1 inch",
    "Watermark": "CONFIDENTIAL"
  },
  "Document_Tree": [
    {
      "tag": "Header",
      "style": { "color": "#6b7280", "font": "Arial", "size": 10, "align": "right", "borderBottom": "1px solid #e5e7eb", "paddingBottom": "10px", "marginBottom": "20px" },
      "content": "Google Workspace Internal | Q3 Report"
    },
    {
      "tag": "Kichwa_Kuu",
      "style": { "font": "Arial", "size": 24, "bold": true, "align": "center", "margin": "40px 0" },
      "content": "FEATURE COMPLETION AUDIT"
    },
    {
      "tag": "Columns",
      "style": { "columns": "2", "columnGap": "40px" },
      "children": [
        {
          "tag": "Aya",
          "style": { "font": "Times New Roman", "size": 12, "align": "justify" },
          "content": "Our new layout engine supports multi-column text formatting, bringing true newspaper and academic journal capabilities directly to the JSON format. This allows users to create dense informational layouts without relying on complex table structures, exactly like Microsoft Word."
        },
        {
          "tag": "Aya",
          "style": { "font": "Times New Roman", "size": 12, "align": "justify" },
          "content": "Furthermore, we have introduced native SVG Icon rendering. You can now inject standard shapes, ticks, and crosses anywhere in the document to signify status, warnings, or approvals."
        }
      ]
    },
    {
      "tag": "Box",
      "style": { "border": "1px solid #e5e7eb", "padding": "20px", "margin": "40px 0", "borderRadius": "8px", "backgroundColor": "#f9fafb" },
      "children": [
        {
          "tag": "Kichwa_Dogo",
          "style": { "font": "Arial", "size": 14, "bold": true, "marginBottom": "15px" },
          "content": "Status Checklist"
        },
        {
          "tag": "Table",
          "style": { "width": "100%", "borderCollapse": "collapse" },
          "children": [
            {
              "tag": "TableRow",
              "children": [
                { "tag": "TableCell", "style": { "padding": "10px", "borderBottom": "1px solid #ddd", "width": "40px" }, "children": [{ "tag": "Icon", "name": "tick", "color": "#16a34a", "size": 20 }] },
                { "tag": "TableCell", "style": { "padding": "10px", "borderBottom": "1px solid #ddd", "font": "Arial" }, "content": "Typography & Formatting" }
              ]
            },
            {
              "tag": "TableRow",
              "children": [
                { "tag": "TableCell", "style": { "padding": "10px", "borderBottom": "1px solid #ddd" }, "children": [{ "tag": "Icon", "name": "tick", "color": "#16a34a", "size": 20 }] },
                { "tag": "TableCell", "style": { "padding": "10px", "borderBottom": "1px solid #ddd", "font": "Arial" }, "content": "Tables & Boxes" }
              ]
            },
            {
              "tag": "TableRow",
              "children": [
                { "tag": "TableCell", "style": { "padding": "10px", "borderBottom": "1px solid #ddd" }, "children": [{ "tag": "Icon", "name": "tick", "color": "#16a34a", "size": 20 }] },
                { "tag": "TableCell", "style": { "padding": "10px", "borderBottom": "1px solid #ddd", "font": "Arial" }, "content": "Native SVG Ticks & Crosses" }
              ]
            },
            {
              "tag": "TableRow",
              "children": [
                { "tag": "TableCell", "style": { "padding": "10px" }, "children": [{ "tag": "Icon", "name": "cross", "color": "#dc2626", "size": 20 }] },
                { "tag": "TableCell", "style": { "padding": "10px", "font": "Arial" }, "content": "3D Renderings (Not Supported Yet)" }
              ]
            }
          ]
        }
      ]
    },
    { "tag": "Page_Break" },
    {
      "tag": "Header",
      "style": { "color": "#6b7280", "font": "Arial", "size": 10, "align": "right", "borderBottom": "1px solid #e5e7eb", "paddingBottom": "10px", "marginBottom": "20px" },
      "content": "Google Workspace Internal | Page 2"
    },
    {
      "tag": "Kichwa_Dogo",
      "style": { "font": "Arial", "size": 16, "bold": true, "margin": "0 0 20px 0" },
      "content": "Warning System"
    },
    {
      "tag": "Box",
      "style": { "borderLeft": "4px solid #f59e0b", "padding": "15px 20px", "backgroundColor": "#fffbeb", "display": "flex", "alignItems": "center" },
      "children": [
        { "tag": "Icon", "name": "warning", "color": "#f59e0b", "size": 24, "style": { "marginRight": "15px" } },
        { "tag": "Aya", "style": { "font": "Arial", "size": 12, "color": "#92400e" }, "content": "Please ensure all JSON properties match the schema before executing the renderer to prevent layout collapse." }
      ]
    }
  ]
}`;

  const [jsonInput, setJsonInput] = useState(defaultJson);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [formattedHtml, setFormattedHtml] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
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

  // Helper to get SVG paths for Icons
  const getIconSvg = (name: string, color: string = "currentColor", size: number = 24): string => {
    const s = size;
    const c = color;
    switch(name.toLowerCase()) {
      case "tick":
      case "check":
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      case "cross":
      case "x":
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      case "warning":
      case "alert":
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
      case "info":
        return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
      default:
        return ""; // Fallback
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

      // Extended Layout CSS
      if (node.style.border) nodeStyle += `border: ${node.style.border}; `;
      if (node.style.borderBottom) nodeStyle += `border-bottom: ${node.style.borderBottom}; `;
      if (node.style.borderLeft) nodeStyle += `border-left: ${node.style.borderLeft}; `;
      if (node.style.backgroundColor) nodeStyle += `background-color: ${node.style.backgroundColor}; `;
      if (node.style.padding) nodeStyle += `padding: ${node.style.padding}; `;
      if (node.style.paddingBottom) nodeStyle += `padding-bottom: ${node.style.paddingBottom}; `;
      if (node.style.margin) nodeStyle += `margin: ${node.style.margin}; `;
      if (node.style.marginBottom) nodeStyle += `margin-bottom: ${node.style.marginBottom}; `;
      if (node.style.marginRight) nodeStyle += `margin-right: ${node.style.marginRight}; `;
      if (node.style.borderRadius) nodeStyle += `border-radius: ${node.style.borderRadius}; `;
      if (node.style.width) nodeStyle += `width: ${node.style.width}; `;
      if (node.style.borderCollapse) nodeStyle += `border-collapse: ${node.style.borderCollapse}; `;
      if (node.style.display) nodeStyle += `display: ${node.style.display}; `;
      if (node.style.alignItems) nodeStyle += `align-items: ${node.style.alignItems}; `;

      // Multi-column
      if (node.style.columns) nodeStyle += `column-count: ${node.style.columns}; `;
      if (node.style.columnGap) nodeStyle += `column-gap: ${node.style.columnGap}; `;
    }

    const contentHtml = node.content ? node.content.replace(/\n/g, '<br/>') : '';
    let childrenHtml = "";
    if (node.children && Array.isArray(node.children)) {
       childrenHtml = node.children.map((childNode: any) => renderASTNode(childNode)).join('');
    }

    const innerHtml = contentHtml + childrenHtml;

    switch (node.tag) {
      case "Header":
        return `<div class="doc-header" style="width: 100%; ${nodeStyle}">${innerHtml}</div>`;
      case "Columns":
        return `<div class="doc-columns" style="${nodeStyle}">${innerHtml}</div>`;
      case "Icon":
        const iconSvg = getIconSvg(node.name, node.color, node.size);
        return `<span style="display: inline-flex; align-items: center; justify-content: center; ${nodeStyle}">${iconSvg}</span>`;
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
        return `</div></div><div class="a4-page-wrapper" style="margin-top: 32px; padding: 0; background: transparent; position: relative; overflow: hidden;"><div class="html2pdf__page-break" style="page-break-before: always; height: 1px; width: 100%; margin: 0; opacity: 0;"></div><div style="padding: 96px; background: white; color: black; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); min-height: 29.7cm; position: relative;">`;
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

      // Determine if there is a watermark
      let watermarkHtml = "";
      if (ast.Metadata && ast.Metadata.Watermark) {
        watermarkHtml = `<div class="watermark" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 100px; color: rgba(0,0,0,0.05); font-weight: bold; pointer-events: none; z-index: 0; white-space: nowrap;">${ast.Metadata.Watermark}</div>`;
      }

      // Open the first A4 wrapper
      htmlOutput += `<div class="a4-page-wrapper" style="padding: 0; background: transparent; position: relative; overflow: hidden;"><div style="padding: 96px; background: white; color: black; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); min-height: 29.7cm; position: relative;">`;

      // Inject watermark on first page (for simplicity, we inject it into every newly created wrapper)
      htmlOutput += watermarkHtml;

      ast.Document_Tree.forEach((node: any) => {
         // Re-inject watermark if we just hit a page break
         const nodeHtml = renderASTNode(node);
         htmlOutput += nodeHtml;
         if (node.tag === "Page_Break") {
             htmlOutput += watermarkHtml;
         }
      });

      // Close the final A4 wrapper
      htmlOutput += `</div></div>`;
      setFormattedHtml(htmlOutput);

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
        margin:       [25.4, 25.4, 25.4, 25.4] as [number, number, number, number],
        filename:     'Advanced_Document.pdf',
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
          <h1 className="text-xl font-semibold tracking-tight text-black">Ultimate<span className="text-gray-500">Workspace</span></h1>
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

        {/* Left Panel: JSON Input */}
        {!zenMode && (
          <section className="flex-1 flex flex-col bg-[#1e1e1e] rounded-xl shadow-lg border border-gray-800 overflow-hidden shrink-0 print:hidden transition-opacity duration-300 h-[calc(100vh-120px)]">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-[#2d2d2d]">
              <div className="flex items-center gap-2">
                <Code2 size={18} className="text-blue-400" />
                <h2 className="text-sm font-semibold text-gray-200">1. Define Advanced AST Configuration</h2>
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
                 <p className="text-xs text-gray-400 mt-2 leading-relaxed">Paste your valid advanced JSON on the left and click the magic wand.</p>
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
