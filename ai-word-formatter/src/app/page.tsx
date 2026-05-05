"use client";

import React, { useState, useEffect } from "react";
import {
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  FileText, Sparkles, Wand2, Scissors, Copy, Clipboard,
  Image as ImageIcon, PaintBucket, Clock,
  List, ListOrdered, IndentDecrease, IndentIncrease,
  ChevronDown, HelpCircle, Save, Undo, Redo, LayoutList, GripVertical
} from "lucide-react";

type BlockType = 'Heading 1' | 'Heading 2' | 'Paragraph' | 'List Item' | 'Title';

interface DocumentBlock {
  id: string;
  type: BlockType;
  content: string;
}

export default function MSWordUI() {
  const [activeTab, setActiveTab] = useState('Home');
  const [documentBlocks, setDocumentBlocks] = useState<DocumentBlock[]>([]);
  const [inputText, setInputText] = useState("");
  const [pages, setPages] = useState<DocumentBlock[][]>([]);
  const [showDocMap, setShowDocMap] = useState(false);

  // Auto-detect is now instantly triggered by user via AI Tools, with everything auto-approved
  const handleAutoDetect = () => {
    if (!inputText.trim()) return;

    const lines = inputText.split('\n').filter(line => line.trim() !== '');
    const detectedBlocks = lines.map((line, index) => {
      let type: BlockType = 'Paragraph';
      if (index === 0 && line.length < 50) type = 'Title';
      else if (line.length < 60 && !line.includes('.') && line === line.toUpperCase()) type = 'Heading 1';
      else if (line.length < 60 && !line.includes('.')) type = 'Heading 2';
      else if (line.trim().startsWith('-') || line.match(/^\d+\./)) type = 'List Item';

      return {
        id: `block-${index}-${Date.now()}`,
        type,
        content: line
      };
    });

    setDocumentBlocks(detectedBlocks);
    setShowDocMap(true);
  };

  const changeBlockType = (id: string, newType: BlockType) => {
    setDocumentBlocks(blocks =>
      blocks.map(b => b.id === id ? { ...b, type: newType } : b)
    );
  };

  // Pagination Engine
  useEffect(() => {
    if (documentBlocks.length === 0) {
       setPages([]);
       return;
    }

    // Distribute blocks across pages (simulating visual heights)
    const BLOCKS_PER_PAGE = 7;
    const newPages: DocumentBlock[][] = [];

    for (let i = 0; i < documentBlocks.length; i += BLOCKS_PER_PAGE) {
      newPages.push(documentBlocks.slice(i, i + BLOCKS_PER_PAGE));
    }
    setPages(newPages);
  }, [documentBlocks]);

  return (
    <div className="h-screen flex flex-col bg-[#d4d8e0] font-sans overflow-hidden">

      {/* Top Window Chrome (WordPad Style) */}
      <header className="h-8 bg-white flex items-center px-2 justify-between select-none border-b border-gray-200">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 text-[#2b579a] mr-2">
            <button className="p-1 hover:bg-gray-100"><Save size={14}/></button>
            <button className="p-1 hover:bg-gray-100"><Undo size={14}/></button>
            <button className="p-1 hover:bg-gray-100"><Redo size={14}/></button>
            <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
          </div>
          <FileText size={14} className="text-gray-600" />
          <span className="text-xs text-gray-700 ml-1">Document - Mashine AI</span>
        </div>
        <div className="flex items-center gap-2">
           <HelpCircle size={14} className="text-gray-500 hover:text-blue-600 cursor-pointer"/>
        </div>
      </header>

      {/* Ribbon Tabs Row */}
      <div className="bg-white px-0 flex text-[13px] border-b border-gray-200 select-none items-end">
        <button className="bg-[#2b579a] text-white px-4 py-1 hover:bg-blue-800">File</button>
        {['Home', 'View', 'AI Tools'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 transition-colors relative border border-transparent ${activeTab === tab ? 'bg-[#f5f6f7] border-gray-200 border-b-[#f5f6f7] z-10' : 'text-gray-600 hover:bg-gray-50'}`}
            style={activeTab === tab ? { top: '1px' } : {}}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Ribbon Content Panel (WordPad accurate UI) */}
      <div className="bg-[#f5f6f7] h-28 border-b border-gray-300 flex items-start px-2 py-1 gap-2 select-none z-10 shadow-sm overflow-x-auto overflow-y-hidden">
        {activeTab === 'Home' && (
          <>
            {/* Clipboard Group */}
            <div className="flex flex-col h-full border-r border-gray-300 pr-2 pl-1">
              <div className="flex gap-1 items-start mt-1">
                <button className="flex flex-col items-center justify-center p-1 hover:bg-blue-100 rounded text-gray-700 h-[68px] w-12">
                  <Clipboard size={28} className="text-yellow-600 mb-1" />
                  <span className="text-[10px]">Paste</span>
                </button>
                <div className="flex flex-col gap-0.5">
                  <button className="flex items-center gap-1 hover:bg-blue-100 p-1 rounded text-gray-700 text-xs w-16">
                    <Scissors size={14} className="text-blue-600"/> Cut
                  </button>
                  <button className="flex items-center gap-1 hover:bg-blue-100 p-1 rounded text-gray-700 text-xs w-16">
                    <Copy size={14} className="text-blue-600"/> Copy
                  </button>
                </div>
              </div>
              <span className="text-[10px] text-gray-500 text-center w-full mt-auto mb-0.5 font-medium">Clipboard</span>
            </div>

            {/* Font Group */}
            <div className="flex flex-col h-full border-r border-gray-300 pr-2 pl-2">
              <div className="flex flex-col gap-1 mt-1">
                <div className="flex items-center gap-1">
                  <div className="flex items-center bg-white border border-gray-300 rounded px-2 py-0.5 text-xs w-32 justify-between cursor-pointer hover:border-blue-400">
                    <span>Calibri</span> <ChevronDown size={12}/>
                  </div>
                  <div className="flex items-center bg-white border border-gray-300 rounded px-2 py-0.5 text-xs w-12 justify-between cursor-pointer hover:border-blue-400">
                    <span>11</span> <ChevronDown size={12}/>
                  </div>
                  <div className="flex gap-0.5 text-[#2b579a]">
                     <button className="px-1.5 hover:bg-blue-100 rounded font-bold text-sm">A<span className="text-[10px] align-top">^</span></button>
                     <button className="px-1.5 hover:bg-blue-100 rounded font-bold text-xs">A<span className="text-[10px] align-top">v</span></button>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-700 mt-0.5">
                  <button className="p-1 hover:bg-blue-100 rounded"><Bold size={14} /></button>
                  <button className="p-1 hover:bg-blue-100 rounded"><Italic size={14} /></button>
                  <button className="p-1 hover:bg-blue-100 rounded"><Underline size={14} /></button>
                  <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                  <button className="p-1 hover:bg-blue-100 rounded font-serif italic text-xs px-1.5">ab<span className="line-through text-[10px]">c</span></button>
                  <button className="p-1 hover:bg-blue-100 rounded font-bold text-xs">x<sub className="text-[9px]">2</sub></button>
                  <button className="p-1 hover:bg-blue-100 rounded font-bold text-xs">x<sup className="text-[9px]">2</sup></button>
                  <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                  <button className="p-1 hover:bg-blue-100 rounded text-red-600 font-bold underline decoration-red-600">A</button>
                </div>
              </div>
              <span className="text-[10px] text-gray-500 text-center w-full mt-auto mb-0.5 font-medium">Font</span>
            </div>

            {/* Paragraph Group */}
            <div className="flex flex-col h-full border-r border-gray-300 pr-2 pl-2">
              <div className="flex flex-col gap-1 mt-1">
                 <div className="flex items-center gap-1 text-gray-700">
                   <button className="p-1 hover:bg-blue-100 rounded"><IndentDecrease size={14} /></button>
                   <button className="p-1 hover:bg-blue-100 rounded"><IndentIncrease size={14} /></button>
                   <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                   <button className="p-1 hover:bg-blue-100 rounded"><List size={14} /></button>
                   <button className="p-1 hover:bg-blue-100 rounded"><ListOrdered size={14} /></button>
                 </div>
                 <div className="flex items-center gap-1 text-gray-700 mt-0.5">
                  <button className="p-1 bg-blue-100 rounded border border-blue-200"><AlignLeft size={14} /></button>
                  <button className="p-1 hover:bg-blue-100 rounded"><AlignCenter size={14} /></button>
                  <button className="p-1 hover:bg-blue-100 rounded"><AlignRight size={14} /></button>
                  <button className="p-1 hover:bg-blue-100 rounded"><AlignJustify size={14} /></button>
                </div>
              </div>
              <span className="text-[10px] text-gray-500 text-center w-full mt-auto mb-0.5 font-medium">Paragraph</span>
            </div>

            {/* Insert Group */}
            <div className="flex flex-col h-full border-r border-gray-300 pr-2 pl-2">
               <div className="flex gap-2 items-start mt-1">
                 <button className="flex flex-col items-center justify-center p-1 hover:bg-blue-100 rounded text-gray-700 h-[68px]">
                  <ImageIcon size={24} className="text-green-600 mb-1" />
                  <span className="text-[10px]">Picture</span>
                 </button>
                 <button className="flex flex-col items-center justify-center p-1 hover:bg-blue-100 rounded text-gray-700 h-[68px]">
                  <PaintBucket size={24} className="text-blue-500 mb-1" />
                  <span className="text-[10px]">Paint</span>
                 </button>
                 <button className="flex flex-col items-center justify-center p-1 hover:bg-blue-100 rounded text-gray-700 h-[68px]">
                  <Clock size={24} className="text-gray-500 mb-1" />
                  <span className="text-[10px]">Date/Time</span>
                 </button>
               </div>
               <span className="text-[10px] text-gray-500 text-center w-full mt-auto mb-0.5 font-medium">Insert</span>
            </div>

            {/* View Map Toggle */}
             <div className="flex flex-col h-full pr-2 pl-2 justify-center">
                 <button
                   onClick={() => setShowDocMap(!showDocMap)}
                   className={`flex flex-col items-center justify-center p-2 rounded text-gray-700 border ${showDocMap ? 'bg-blue-100 border-blue-300' : 'hover:bg-blue-50 border-transparent'}`}
                 >
                  <LayoutList size={24} className="text-[#2b579a] mb-1" />
                  <span className="text-[10px] font-semibold text-[#2b579a]">Nav Map</span>
                 </button>
            </div>
          </>
        )}

        {activeTab === 'AI Tools' && (
           <div className="flex h-full py-1 gap-2">
             <div className="flex flex-col h-full border-r border-gray-300 pr-4 pl-2">
                 <button
                   onClick={handleAutoDetect}
                   className="flex flex-col items-center justify-center px-4 py-1 hover:bg-blue-100 text-blue-800 rounded border border-transparent hover:border-blue-200 h-[68px]"
                 >
                   <Sparkles size={28} className="mb-1 text-purple-600" />
                   <span className="text-xs font-semibold">Organize & Map Doc</span>
                 </button>
                 <span className="text-[10px] text-gray-500 text-center w-full mt-auto mb-0.5 font-medium">Structure</span>
             </div>
             <div className="flex flex-col h-full border-r border-gray-300 pr-4 pl-2">
                 <div className="flex gap-2 h-[68px] items-center">
                   <button className="flex flex-col items-center justify-center p-2 hover:bg-blue-100 text-blue-800 rounded">
                     <Wand2 size={24} className="mb-1 text-blue-600" />
                     <span className="text-xs">Clone Style</span>
                   </button>
                   <button className="flex flex-col items-center justify-center p-2 hover:bg-blue-100 text-blue-800 rounded">
                     <FileText size={24} className="mb-1 text-green-600" />
                     <span className="text-xs">Chat w/ Pdfs</span>
                   </button>
                 </div>
                 <span className="text-[10px] text-gray-500 text-center w-full mt-auto mb-0.5 font-medium">Magic Agents</span>
             </div>
           </div>
        )}
      </div>

      {/* Main Workspace Area (Breathable Layout) */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* Left Side: Passive Navigation Map (No forced clicking required) */}
        {showDocMap && documentBlocks.length > 0 && (
          <aside className="w-64 bg-[#fbfbfb] border-r border-gray-300 shadow-sm z-10 flex flex-col">
            <div className="p-2 border-b border-gray-200 bg-white">
               <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Navigation</h3>
               <p className="text-[10px] text-gray-500">Document mapped successfully.</p>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {documentBlocks.map((block) => (
                <div key={block.id} className="group relative flex items-start gap-2 p-1.5 hover:bg-gray-100 rounded border border-transparent hover:border-gray-200">
                  <div className="mt-0.5 cursor-grab opacity-30 group-hover:opacity-100"><GripVertical size={12}/></div>
                  <div className="flex-1 min-w-0">
                     <p className={`text-[11px] truncate ${block.type === 'Title' ? 'font-bold text-black' : block.type.includes('Heading') ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>
                       {block.content}
                     </p>

                     {/* Hover to reveal block type adjustments (Passive verification) */}
                     <div className="hidden group-hover:flex items-center gap-1 mt-1">
                        <span className="text-[9px] bg-blue-50 text-blue-700 px-1 rounded border border-blue-100">{block.type}</span>
                        <select
                          className="text-[9px] border-none bg-transparent outline-none text-gray-500 cursor-pointer"
                          value={block.type}
                          onChange={(e) => changeBlockType(block.id, e.target.value as BlockType)}
                        >
                          <option>Title</option>
                          <option>Heading 1</option>
                          <option>Heading 2</option>
                          <option>Paragraph</option>
                          <option>List Item</option>
                        </select>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* Center: Breathable A4 Layout Area */}
        <main className="flex-1 bg-[#d4d8e0] overflow-y-auto flex flex-col items-center">

          {documentBlocks.length === 0 ? (
             <div className="mt-8 mb-8 w-[816px] min-h-[1056px] bg-white shadow-sm border border-gray-300 flex flex-col shrink-0 outline-none p-[1in]">
                <textarea
                  className="w-full flex-1 resize-none outline-none text-[11pt] font-sans text-black leading-relaxed"
                  placeholder="Paste your raw text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  style={{ fontFamily: 'Calibri, Arial, sans-serif' }}
                />
             </div>
          ) : (
             <div className="py-8 flex flex-col gap-6">
               {/* Render mapped A4 pages */}
               {pages.map((pageBlocks, pageIndex) => (
                  <div key={`page-${pageIndex}`} className="w-[816px] min-h-[1056px] bg-white shadow-sm border border-gray-300 flex flex-col shrink-0 relative px-[1in] py-[1in] font-sans text-black">

                     {/* Subtle print margins indicator (optional) */}
                     <div className="absolute top-0 left-[1in] w-[1px] h-4 bg-gray-200"></div>
                     <div className="absolute top-0 right-[1in] w-[1px] h-4 bg-gray-200"></div>

                     {pageBlocks.map((block) => {
                       switch(block.type) {
                         case 'Title':
                           return <h1 key={block.id} className="text-3xl font-bold mb-6 text-black">{block.content}</h1>;
                         case 'Heading 1':
                           return <h2 key={block.id} className="text-[16pt] font-bold mt-6 mb-2 text-[#2b579a]">{block.content}</h2>;
                         case 'Heading 2':
                           return <h3 key={block.id} className="text-[14pt] font-semibold mt-4 mb-2 text-[#2b579a]">{block.content}</h3>;
                         case 'List Item':
                           return <div key={block.id} className="flex mb-1 text-[11pt] leading-snug"><span className="mr-2 text-black">•</span><span className="text-black">{block.content.replace(/^[-1-9.]+\s*/, '')}</span></div>;
                         case 'Paragraph':
                         default:
                           return <p key={block.id} className="mb-3 text-[11pt] leading-snug text-black">{block.content}</p>;
                       }
                     })}
                  </div>
               ))}
             </div>
          )}

        </main>

      </div>

      {/* Bottom Status Bar */}
      <footer className="h-6 bg-[#f5f6f7] border-t border-gray-300 text-gray-600 text-[11px] flex items-center justify-between px-4 select-none z-20">
        <div className="flex items-center gap-4">
          <span>Page {pages.length > 0 ? 1 : 0} of {pages.length}</span>
          <span className="px-2 border-l border-r border-gray-300">{documentBlocks.length} Blocks Mapped</span>
        </div>
        <div className="flex items-center gap-4">
          <span>100%</span>
        </div>
      </footer>

    </div>
  );
}
