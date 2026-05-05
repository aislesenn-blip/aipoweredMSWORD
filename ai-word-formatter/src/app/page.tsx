"use client";

import { useState, useRef } from "react";
import { Code2, Wand2, Download, AlertCircle, CheckCircle2, FileJson, Loader2, Maximize2, Printer } from "lucide-react";

export default function Home() {
  const defaultJson = `{
  "Metadata": {
    "Type": "UDOM Research Proposal",
    "Engine": "Ultimate AST Parser v6.0",
    "Margins": "1 inch",
    "Watermark": "UDOM RESEARCH 2026",
    "Pagination": {
      "show": true,
      "position": "bottom-center",
      "format": "roman"
    }
  },
  "Document_Tree": [
    {
      "tag": "TitlePage",
      "style": { "align": "center", "margin": "80px 0" },
      "children": [
        {
          "tag": "Kichwa_Kuu",
          "style": { "font": "Arial", "size": 20, "bold": true, "margin": "0 0 40px 0" },
          "content": "THE UNIVERSITY OF DODOMA (UDOM)\\nCOLLEGE OF NATURAL AND MATHEMATICAL SCIENCES"
        },
        {
          "tag": "Icon",
          "name": "info",
          "color": "#1e3a8a",
          "size": 60,
          "style": { "marginBottom": "40px" }
        },
        {
          "tag": "Kichwa_Kuu",
          "style": { "font": "Times New Roman", "size": 16, "bold": true, "margin": "0 0 50px 0", "spacing": 1.5 },
          "content": "ASSESSMENT OF THE INFLUENCE OF HABITAT CONDITION ON GROUND SPIDER ABUNDANCE AND DIVERSITY ACROSS DISTURBED AND UNDISTURBED AREAS AT UDOM"
        },
        {
          "tag": "Aya",
          "style": { "font": "Times New Roman", "size": 12, "spacing": 2, "margin": "40px 0" },
          "content": "A Research Proposal Submitted by:\\nCHIEF ENGINEER\\nReg No: UDOM/2026/001"
        },
        {
          "tag": "Aya",
          "style": { "font": "Times New Roman", "size": 12, "margin": "100px 0 0 0" },
          "content": "Dodoma, Tanzania\\nOctober 2026"
        }
      ]
    },
    { "tag": "Page_Break" },
    {
      "tag": "Kichwa_Kuu",
      "style": { "font": "Times New Roman", "size": 14, "bold": true, "align": "center", "marginBottom": "20px" },
      "content": "TABLE OF CONTENTS"
    },
    {
      "tag": "List",
      "style": { "font": "Arial", "size": 11, "spacing": 2, "listStyleType": "none" },
      "children": [
        { "tag": "ListItem", "content": "DECLARATION ........................................................................................ ii" },
        { "tag": "ListItem", "content": "ABSTRACT ............................................................................................. iii" },
        { "tag": "ListItem", "content": "CHAPTER ONE: INTRODUCTION ..................................................... 1" },
        { "tag": "ListItem", "content": "    1.1 Background of the Study ........................................................... 1" },
        { "tag": "ListItem", "content": "    1.2 Statement of the Problem .......................................................... 2" },
        { "tag": "ListItem", "content": "    1.3 Objectives of the Study ............................................................. 3" },
        { "tag": "ListItem", "content": "CHAPTER TWO: LITERATURE REVIEW .......................................... 4" },
        { "tag": "ListItem", "content": "CHAPTER THREE: METHODOLOGY ............................................... 7" }
      ]
    },
    { "tag": "Page_Break" },
    {
      "tag": "Kichwa_Kuu",
      "style": { "font": "Times New Roman", "size": 14, "bold": true, "align": "center", "marginBottom": "20px" },
      "content": "CHAPTER ONE: INTRODUCTION"
    },
    {
      "tag": "Kichwa_Dogo",
      "style": { "font": "Times New Roman", "size": 12, "bold": true, "marginBottom": "10px" },
      "content": "1.1 Background of the Study"
    },
    {
      "tag": "Columns",
      "style": { "columns": "2", "columnGap": "40px" },
      "children": [
        {
          "tag": "Aya",
          "style": { "font": "Times New Roman", "size": 12, "spacing": 1.5, "align": "justify", "textIndent": "0.5in" },
          "content": "Ground spiders are considered excellent ecological indicators due to their high sensitivity to habitat alteration, microclimate changes, and human disturbances. The University of Dodoma (UDOM), located in the semi-arid region of central Tanzania, features a unique landscape characterized by both highly disturbed construction zones and relatively pristine, undisturbed savanna woodlands."
        },
        {
          "tag": "Aya",
          "style": { "font": "Times New Roman", "size": 12, "spacing": 1.5, "align": "justify", "textIndent": "0.5in" },
          "content": "Understanding the abundance and diversity of ground-dwelling spiders (such as those from families Lycosidae, Gnaphosidae, and Salticidae) in these contrasting habitats provides critical insights into the ecological health of the university campus. Disturbed habitats typically experience soil compaction, vegetation clearing, and chemical run-offs which directly impact arachnid survival rates."
        }
      ]
    },
    {
      "tag": "Blockquote",
      "style": { "font": "Times New Roman", "size": 11, "italic": true, "margin": "20px 40px", "padding": "10px 20px", "borderLeft": "3px solid #1e3a8a", "backgroundColor": "#f8fafc" },
      "content": "Spiders act as an indispensable predatory force in terrestrial ecosystems. Any anthropogenic disturbance that alters their microhabitat architecture significantly reduces their species richness, ultimately leading to a collapse in local insect population control mechanisms. (Nyffeler & Birkhofer, 2017)."
    },
    {
      "tag": "Kichwa_Dogo",
      "style": { "font": "Times New Roman", "size": 12, "bold": true, "marginTop": "20px", "marginBottom": "10px" },
      "content": "1.2 Objectives of the Study"
    },
    {
      "tag": "Box",
      "style": { "border": "1px solid #cbd5e1", "padding": "20px", "borderRadius": "8px", "backgroundColor": "#f1f5f9" },
      "children": [
        {
          "tag": "Kichwa_Dogo",
          "style": { "font": "Arial", "size": 12, "bold": true, "marginBottom": "10px", "color": "#0f172a" },
          "content": "Specific Objectives Tracker (Project Management)"
        },
        {
          "tag": "Table",
          "style": { "width": "100%", "borderCollapse": "collapse", "font": "Arial", "size": 11 },
          "children": [
            {
              "tag": "TableRow",
              "style": { "backgroundColor": "#e2e8f0", "bold": true },
              "children": [
                { "tag": "TableCell", "style": { "padding": "10px", "border": "1px solid #94a3b8" }, "content": "Status" },
                { "tag": "TableCell", "style": { "padding": "10px", "border": "1px solid #94a3b8" }, "content": "Specific Objective" },
                { "tag": "TableCell", "style": { "padding": "10px", "border": "1px solid #94a3b8" }, "content": "Target Habitat" }
              ]
            },
            {
              "tag": "TableRow",
              "children": [
                { "tag": "TableCell", "style": { "padding": "10px", "border": "1px solid #94a3b8", "align": "center" }, "children": [{ "tag": "Icon", "name": "tick", "color": "#16a34a", "size": 20 }] },
                { "tag": "TableCell", "style": { "padding": "10px", "border": "1px solid #94a3b8" }, "content": "Determine ground spider species richness." },
                { "tag": "TableCell", "style": { "padding": "10px", "border": "1px solid #94a3b8" }, "content": "All Areas" }
              ]
            },
            {
              "tag": "TableRow",
              "children": [
                { "tag": "TableCell", "style": { "padding": "10px", "border": "1px solid #94a3b8", "align": "center" }, "children": [{ "tag": "Icon", "name": "tick", "color": "#16a34a", "size": 20 }] },
                { "tag": "TableCell", "style": { "padding": "10px", "border": "1px solid #94a3b8" }, "content": "Compare abundance between disturbed & undisturbed." },
                { "tag": "TableCell", "style": { "padding": "10px", "border": "1px solid #94a3b8" }, "content": "CNMS & CIVE bushes" }
              ]
            },
            {
              "tag": "TableRow",
              "children": [
                { "tag": "TableCell", "style": { "padding": "10px", "border": "1px solid #94a3b8", "align": "center" }, "children": [{ "tag": "Icon", "name": "cross", "color": "#dc2626", "size": 20 }] },
                { "tag": "TableCell", "style": { "padding": "10px", "border": "1px solid #94a3b8" }, "content": "Analyze soil pH impact on web-building spiders." },
                { "tag": "TableCell", "style": { "padding": "10px", "border": "1px solid #94a3b8" }, "content": "Pending Lab Data" }
              ]
            }
          ]
        }
      ]
    },
    { "tag": "Page_Break" },
    {
      "tag": "Kichwa_Kuu",
      "style": { "font": "Times New Roman", "size": 14, "bold": true, "align": "center", "marginBottom": "20px" },
      "content": "CHAPTER THREE: METHODOLOGY"
    },
    {
      "tag": "Box",
      "style": { "borderLeft": "4px solid #f59e0b", "padding": "15px", "backgroundColor": "#fffbeb", "display": "flex", "alignItems": "center", "marginBottom": "20px" },
      "children": [
        { "tag": "Icon", "name": "warning", "color": "#f59e0b", "size": 24, "style": { "marginRight": "15px" } },
        { "tag": "Aya", "style": { "font": "Arial", "size": 12, "color": "#92400e" }, "content": "Safety Protocol: Some species in the Dodoma region may be highly venomous. Proper PPE and handling forceps must be used during pitfall trap collections." }
      ]
    },
    {
      "tag": "Kichwa_Dogo",
      "style": { "font": "Times New Roman", "size": 12, "bold": true, "marginBottom": "10px" },
      "content": "3.1 Study Area"
    },
    {
      "tag": "Aya",
      "style": { "font": "Times New Roman", "size": 12, "spacing": 2, "align": "justify", "textIndent": "0.5in" },
      "content": "The study will be conducted at the University of Dodoma (UDOM) main campus. Disturbed areas will include sites near the College of Informatics and Virtual Education (CIVE) where active construction and human trampling are severe. Undisturbed areas will be selected from the protected thickets behind the College of Earth Sciences (COES)."
    },
    {
      "tag": "Kichwa_Dogo",
      "style": { "font": "Times New Roman", "size": 12, "bold": true, "marginTop": "20px", "marginBottom": "10px" },
      "content": "3.2 Sampling Techniques"
    },
    {
      "tag": "Aya",
      "style": { "font": "Times New Roman", "size": 12, "spacing": 2, "align": "justify", "textIndent": "0.5in", "marginBottom": "20px" },
      "content": "Pitfall trapping and active searching will be the primary methods. Traps will be left active for 48 hours. Captured specimens will be preserved in 70% ethanol and identified using stereomicroscopes at the CNMS Biology Laboratory."
    },
    {
      "tag": "Footnote",
      "style": { "font": "Times New Roman", "size": 10, "spacing": 1, "align": "left", "borderTop": "1px solid black", "paddingTop": "10px", "marginTop": "40px" },
      "content": "2. Sampling methodologies adopted from the African Arachnological Society Standard Operating Procedures (2025)."
    }
  ]
}`;

  const [jsonInput, setJsonInput] = useState(defaultJson);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [formattedHtml, setFormattedHtml] = useState<string | null>(null);
  const [dynamicCss, setDynamicCss] = useState<string>("");
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
        return "";
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
      if (node.style.borderBottom) nodeStyle += `border-bottom: ${node.style.borderBottom}; `;
      if (node.style.borderLeft) nodeStyle += `border-left: ${node.style.borderLeft}; `;
      if (node.style.borderStyle) nodeStyle += `border-style: ${node.style.borderStyle}; `;
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
      if (node.style.pageBreakInside) nodeStyle += `break-inside: ${node.style.pageBreakInside}; page-break-inside: ${node.style.pageBreakInside}; `;

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
        return `<div class="title-page" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; break-after: page; page-break-after: always; ${nodeStyle}">${innerHtml}</div>`;
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
        // Close current page container and open a new one with page counter increment
        // Also enforce standard 1-inch (96px) margins directly on the page container
        return `</div><div class="a4-page-container native-page-break" style="position: relative; padding: 96px; background: white; color: black; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); min-height: 29.7cm; width: 21cm; margin-bottom: 32px;">`;
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

      // --- DYNAMIC PAGINATION CSS GENERATION ---
      let customPaginationCss = "";
      if (ast.Metadata && ast.Metadata.Pagination) {
        const pConf = ast.Metadata.Pagination;
        if (pConf.show === false) {
           customPaginationCss += `.a4-page-container::after { display: none !important; }`;
        } else {
           // Format (roman, decimal, etc)
           const format = pConf.format === "roman" ? "lower-roman" : (pConf.format === "roman-upper" ? "upper-roman" : "decimal");
           customPaginationCss += `.a4-page-container::after { content: counter(page, ${format}); }`;

           // Placement
           if (pConf.position) {
              if (pConf.position.includes("top")) {
                 customPaginationCss += `.a4-page-container::after { top: 40px; bottom: auto; }`;
                 customPaginationCss += `@media print { .a4-page-container::after { top: -40px; bottom: auto; } }`;
              } else {
                 customPaginationCss += `.a4-page-container::after { bottom: 40px; top: auto; }`;
                 customPaginationCss += `@media print { .a4-page-container::after { bottom: -40px; top: auto; } }`;
              }

              if (pConf.position.includes("left")) {
                 customPaginationCss += `.a4-page-container::after { text-align: left; left: 60px; width: auto; }`;
              } else if (pConf.position.includes("right")) {
                 customPaginationCss += `.a4-page-container::after { text-align: right; right: 60px; left: auto; width: auto; }`;
              } else {
                 customPaginationCss += `.a4-page-container::after { text-align: center; left: 0; width: 100%; }`;
              }
           }
        }
      }
      setDynamicCss(customPaginationCss);

      let htmlOutput = "";

      let watermarkHtml = "";
      if (ast.Metadata && ast.Metadata.Watermark) {
        watermarkHtml = `<div class="watermark print-watermark" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 100px; color: rgba(0,0,0,0.05); font-weight: bold; pointer-events: none; z-index: 1; white-space: nowrap;">${ast.Metadata.Watermark}</div>`;
      }

      htmlOutput += `<div class="document-flow" style="counter-reset: page;">`;
      htmlOutput += watermarkHtml;

      // Open the very first page container with standard 1-inch (96px) padding
      htmlOutput += `<div class="a4-page-container" style="position: relative; padding: 96px; background: white; color: black; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); min-height: 29.7cm; width: 21cm; margin-bottom: 32px;">`;

      ast.Document_Tree.forEach((node: any) => {
         htmlOutput += renderASTNode(node);
      });

      // Close the final page container
      htmlOutput += `</div>`;

      htmlOutput += `</div>`;
      setFormattedHtml(htmlOutput);

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
          <h1 className="text-xl font-semibold tracking-tight text-black">Native<span className="text-gray-500">PDF Engine</span></h1>
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
            className={`text-sm font-medium px-5 py-2 rounded-md transition-colors flex items-center gap-2 ${formattedHtml ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
             <Download size={16} />
             Export to PDF (Native)
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

          <div className={`flex-1 ${zenMode ? 'w-full flex flex-col items-center' : 'overflow-y-auto px-6 pb-6 flex flex-col items-center'} print:overflow-visible print:p-0 print:block`}>
             {formattedHtml ? (
               <div
                 ref={printRef}
                 className="w-full text-black print-container print:shadow-none print:m-0 print:w-full flex flex-col items-center"
                 dangerouslySetInnerHTML={{ __html: formattedHtml }}
               />
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

      {/* Global Native CSS for Print Media and Pagination */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Base Pagination Setup for visual preview */
        .a4-page-container {
          counter-increment: page;
        }

        .a4-page-container::after {
          content: counter(page);
          position: absolute;
          bottom: 40px; /* Default Footer margin */
          left: 0;
          width: 100%;
          text-align: center;
          font-family: Arial, sans-serif;
          font-size: 11pt;
          color: #666;
        }

        /* Inject Dynamic JSON Customizations (Roman numerals, top/right alignment, etc.) */
        ${dynamicCss}

        @media print {
          @page {
            size: A4 portrait;
            /* We use physical page margins for printing so header/footers map correctly natively */
            margin: 1in;
          }
          body {
            background-color: white !important;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print-container, .a4-page-container {
            box-shadow: none !important;
            margin: 0 !important;
            /* Removing physical padding on the container during print because @page margin handles it */
            padding: 0 !important;
            width: 100% !important;
            min-height: auto !important;
          }
          .native-page-break {
             break-before: page;
             page-break-before: always;
          }
          .print-watermark {
             position: fixed !important;
             top: 50% !important;
             left: 50% !important;
          }
          /* Hide the pseudo-element counter during native print to let @page handle it, or leave it if @page bottom isn't set */
          .a4-page-container::after {
             bottom: -40px;
          }
        }
      `}} />
    </div>
  );
}
