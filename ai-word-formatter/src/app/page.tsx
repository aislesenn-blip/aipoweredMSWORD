"use client";

import React, { useState, useEffect } from "react";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, FileText, Sparkles, Settings2, CheckCircle2, ChevronDown, Wand } from "lucide-react";

type BlockType = 'Heading 1' | 'Heading 2' | 'Paragraph' | 'List Item' | 'Title';

interface DocumentBlock {
  id: string;
  type: BlockType;
  content: string;
  verified: boolean;
}

export default function MSWordHybridEditor() {
  const [activeTab, setActiveTab] = useState('Home');
  const [documentBlocks, setDocumentBlocks] = useState<DocumentBlock[]>([]);
  const [isVerificationMode, setIsVerificationMode] = useState(false);
  const [inputText, setInputText] = useState("");
  const [pages, setPages] = useState<DocumentBlock[][]>([]);

  const handleAutoDetect = () => {
    const lines = inputText.split('\n').filter(line => line.trim() !== '');
    const detectedBlocks = lines.map((line, index) => {
      let type: BlockType = 'Paragraph';
      if (index === 0 && line.length < 50) type = 'Title';
      else if (line.length < 60 && !line.includes('.')) type = 'Heading 1';
      else if (line.startsWith('-') || line.match(/^\d+\./)) type = 'List Item';

      return {
        id: `block-${index}`,
        type,
        content: line,
        verified: false
      };
    });

    setDocumentBlocks(detectedBlocks);
    setIsVerificationMode(true);
  };

  const verifyBlock = (id: string) => {
    setDocumentBlocks(blocks =>
      blocks.map(b => b.id === id ? { ...b, verified: true } : b)
    );
  };

  const changeBlockType = (id: string, newType: BlockType) => {
    setDocumentBlocks(blocks =>
      blocks.map(b => b.id === id ? { ...b, type: newType, verified: true } : b)
    );
  };

  // Pagination Engine (Simulated Logic)
  useEffect(() => {
    if (documentBlocks.length === 0 || isVerificationMode) {
       setPages([]);
       return;
    }

    // Very basic pagination: distribute blocks across pages
    // (Assuming ~6 blocks fit on a standard A4 page for this prototype)
    const BLOCKS_PER_PAGE = 6;
    const newPages: DocumentBlock[][] = [];

    for (let i = 0; i < documentBlocks.length; i += BLOCKS_PER_PAGE) {
      newPages.push(documentBlocks.slice(i, i + BLOCKS_PER_PAGE));
    }

    // Ensure there's always at least one page
    if (newPages.length === 0) {
      newPages.push([]);
    }
    setPages(newPages);

  }, [documentBlocks, isVerificationMode]);

  return (
    <div className="h-screen flex flex-col bg-[#f3f2f1] font-sans overflow-hidden">

      {/* Top Header / Title Bar */}
      <header className="h-10 bg-[#2b579a] text-white flex items-center px-4 justify-between select-none">
        <div className="flex items-center gap-3">
          <FileText size={18} />
          <span className="text-sm font-medium">Document1 - AI Word Processor</span>
        </div>
        <div className="flex items-center bg-[#1e3b70] px-3 py-1 rounded text-xs gap-2 cursor-pointer hover:bg-[#152951]">
          <Sparkles size={14} className="text-blue-300" />
          Ask AI Copilot
        </div>
      </header>

      {/* Ribbon Tabs */}
      <div className="bg-white border-b border-gray-200 px-2 flex text-sm z-20 relative shadow-sm">
        {['File', 'Home', 'Insert', 'Layout', 'References', 'Review', 'View', 'AI Assistant'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 border-b-2 transition-colors ${activeTab === tab ? 'border-[#2b579a] text-[#2b579a] font-medium' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Ribbon Content */}
      <div className="bg-[#f3f2f1] h-24 border-b border-gray-300 flex items-center px-4 gap-6 select-none z-10 relative">
        {activeTab === 'Home' && (
          <>
            <div className="flex flex-col gap-1 border-r border-gray-300 pr-4">
              <div className="flex items-center gap-1">
                <select className="border border-gray-300 rounded px-2 py-1 text-sm bg-white outline-none w-32"><option>Calibri</option><option>Arial</option></select>
                <select className="border border-gray-300 rounded px-2 py-1 text-sm bg-white outline-none"><option>11</option><option>12</option></select>
              </div>
              <div className="flex items-center gap-1 text-gray-700">
                <button className="p-1 hover:bg-gray-200 rounded"><Bold size={16} /></button>
                <button className="p-1 hover:bg-gray-200 rounded"><Italic size={16} /></button>
                <button className="p-1 hover:bg-gray-200 rounded"><Underline size={16} /></button>
              </div>
              <span className="text-[10px] text-gray-500 text-center w-full mt-1">Font</span>
            </div>
            <div className="flex flex-col gap-1 border-r border-gray-300 pr-4">
               <div className="flex items-center gap-1 text-gray-700">
                <button className="p-1 hover:bg-gray-200 rounded"><AlignLeft size={16} /></button>
                <button className="p-1 hover:bg-gray-200 rounded"><AlignCenter size={16} /></button>
                <button className="p-1 hover:bg-gray-200 rounded"><AlignRight size={16} /></button>
              </div>
              <span className="text-[10px] text-gray-500 text-center w-full mt-auto mb-1">Paragraph</span>
            </div>
          </>
        )}
        {activeTab === 'AI Assistant' && (
           <div className="flex gap-4">
             <button className="flex flex-col items-center justify-center p-2 hover:bg-blue-100 text-blue-800 rounded">
               <Wand size={24} className="mb-1" />
               <span className="text-xs">Clone Format</span>
             </button>
             <button className="flex flex-col items-center justify-center p-2 hover:bg-purple-100 text-purple-800 rounded">
               <FileText size={24} className="mb-1" />
               <span className="text-xs">Chat w/ Docs</span>
             </button>
           </div>
        )}
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left Side: Verification Panel (Document Map) */}
        {isVerificationMode && (
          <aside className="w-80 bg-white border-r border-gray-300 shadow-xl z-20 flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-4 border-b border-gray-200 bg-blue-50 flex items-start gap-3">
               <div className="bg-blue-600 rounded-full p-1.5 text-white mt-1"><Wand size={16}/></div>
               <div>
                 <h3 className="text-sm font-semibold text-blue-900">I've organized your document!</h3>
                 <p className="text-xs text-blue-700 mt-1">Please review the structure below. Click ✓ if correct, or ⚙ to adjust.</p>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {documentBlocks.map((block) => (
                <div key={block.id} className={`p-3 rounded-lg border text-sm transition-colors ${block.verified ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-blue-300 shadow-sm'}`}>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`block-type-badge text-[10px] uppercase font-bold px-2 py-0.5 rounded ${block.verified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {block.type}
                      </span>
                    </div>

                    {!block.verified && (
                      <div className="flex items-center gap-1">
                        <button onClick={() => verifyBlock(block.id)} className="p-1 text-green-600 hover:bg-green-100 rounded" title="Looks Good">
                          <CheckCircle2 size={18} />
                        </button>
                        <div className="relative group">
                           <button className="p-1 text-gray-500 hover:bg-gray-100 rounded flex items-center" title="Adjust">
                             <Settings2 size={16} /> <ChevronDown size={12}/>
                           </button>
                           {/* Simple dropdown simulation */}
                           <div className="hidden group-hover:block absolute right-0 top-full mt-1 bg-white border rounded shadow-lg z-50 w-32 py-1">
                             {(['Title', 'Heading 1', 'Heading 2', 'Paragraph', 'List Item'] as BlockType[]).map(t => (
                               <div key={t} onClick={() => changeBlockType(block.id, t)} className="px-3 py-1.5 hover:bg-blue-50 cursor-pointer text-xs text-gray-700">{t}</div>
                             ))}
                           </div>
                        </div>
                      </div>
                    )}
                    {block.verified && <CheckCircle2 size={16} className="text-green-500" />}
                  </div>

                  <p className="text-gray-600 line-clamp-2 text-xs italic">"{block.content}"</p>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
               <button
                 disabled={!documentBlocks.every(b => b.verified)}
                 onClick={() => setIsVerificationMode(false)}
                 className={`w-full py-2 rounded font-medium text-sm transition-colors ${documentBlocks.every(b => b.verified) ? 'bg-[#2b579a] text-white hover:bg-blue-800 shadow-md' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
               >
                 Done! Build My Document
               </button>
            </div>
          </aside>
        )}

        {/* Center: A4 Pages Area (Continuous Scroll) */}
        <main className="flex-1 bg-[#e1e1e1] overflow-y-auto p-8 flex flex-col items-center gap-8 shadow-inner">

          {documentBlocks.length === 0 && !isVerificationMode ? (
             <div className="bg-white w-[21cm] min-h-[29.7cm] shadow-md p-24 flex flex-col relative shrink-0">
                <h1 className="text-2xl text-gray-300 font-light mb-8 border-b pb-4">Paste your raw text here to begin...</h1>
                <textarea
                  className="w-full flex-1 resize-none outline-none text-gray-700 text-lg leading-relaxed bg-transparent"
                  placeholder="The Behavior of Tanzanian Spiders&#10;&#10;Introduction&#10;Spiders are very interesting creatures...&#10;- Eight legs&#10;- Produce venom&#10;&#10;Methodology&#10;We tracked 40 spiders."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <button
                  onClick={handleAutoDetect}
                  disabled={inputText.length < 5}
                  className="mt-8 self-end bg-[#2b579a] text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-800 disabled:opacity-50 flex items-center gap-2"
                >
                  <Sparkles size={18}/> Auto-Detect Structure
                </button>
             </div>
          ) : (
             <>
               {!isVerificationMode && documentBlocks.every(b => b.verified) && (
                 <div className="fixed top-36 right-8 bg-green-100 border border-green-300 text-green-800 text-sm px-4 py-2 rounded-md flex items-center gap-2 font-medium shadow-lg z-50 animate-in fade-in zoom-in">
                   <CheckCircle2 size={18}/> Perfect AST Document Map Synchronized
                 </div>
               )}

               {/* Render actual physical A4 pages separated by gaps */}
               {pages.map((pageBlocks, pageIndex) => (
                  <div key={`page-${pageIndex}`} className="bg-white w-[21cm] h-[29.7cm] shadow-lg p-24 flex flex-col relative shrink-0">
                     {/* Visual Page Break Indicator */}
                     {pageIndex > 0 && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 font-semibold uppercase tracking-widest bg-[#e1e1e1] px-2">Page Break</div>
                     )}

                     {pageBlocks.map((block) => {
                       switch(block.type) {
                         case 'Title':
                           return <h1 key={block.id} className="text-4xl font-bold mb-8 text-center text-[#2b579a]">{block.content}</h1>;
                         case 'Heading 1':
                           return <h2 key={block.id} className="text-2xl font-bold mt-8 mb-4 border-b border-gray-200 pb-2 text-gray-800">{block.content}</h2>;
                         case 'Heading 2':
                           return <h3 key={block.id} className="text-xl font-semibold mt-6 mb-3 text-gray-700">{block.content}</h3>;
                         case 'List Item':
                           return <li key={block.id} className="ml-6 mb-2 text-gray-800 text-lg">{block.content.replace(/^[-1-9.]+\s*/, '')}</li>;
                         case 'Paragraph':
                         default:
                           return <p key={block.id} className="mb-4 text-gray-800 text-lg leading-relaxed">{block.content}</p>;
                       }
                     })}
                  </div>
               ))}
             </>
          )}

        </main>

      </div>

      {/* Bottom Status Bar */}
      <footer className="h-6 bg-[#2b579a] text-white text-[11px] flex items-center justify-between px-4 select-none z-20 relative">
        <div className="flex items-center gap-4">
          <span>Page {pages.length > 0 ? 1 : 0} of {pages.length}</span>
          <span>{documentBlocks.length} Blocks</span>
          <span className="flex items-center gap-1"><CheckCircle2 size={12}/> Map Sync</span>
        </div>
        <div className="flex items-center gap-4">
          <span>100%</span>
        </div>
      </footer>

    </div>
  );
}
