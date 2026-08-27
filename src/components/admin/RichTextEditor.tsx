'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Eye,
  Undo,
  Redo,
  Sparkles,
  CheckSquare
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write detailed content here...',
  minHeight = '250px'
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isCodeView, setIsCodeView] = useState(false);
  const [htmlContent, setHtmlContent] = useState(value || '');

  useEffect(() => {
    if (editorRef.current && !isCodeView) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
    setHtmlContent(value || '');
  }, [value, isCodeView]);

  const executeCommand = (command: string, arg: string | undefined = undefined) => {
    if (isCodeView) return;
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      const newHtml = editorRef.current.innerHTML;
      setHtmlContent(newHtml);
      onChange(newHtml);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const newHtml = editorRef.current.innerHTML;
      setHtmlContent(newHtml);
      onChange(newHtml);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setHtmlContent(val);
    onChange(val);
  };

  const insertLink = () => {
    const url = prompt('Enter website link URL:', 'https://');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const insertCallout = () => {
    const calloutHtml = `
      <div style="background-color: #f0fdfa; border-left: 4px solid #0d9488; padding: 14px 18px; border-radius: 10px; margin: 16px 0; color: #134e4a;">
        <strong>Important Notice:</strong> Enter highlighted key points here...
      </div>
    `;
    executeCommand('insertHTML', calloutHtml);
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden shadow-inner flex flex-col focus-within:border-teal-500 transition-colors">
      
      {/* Editor Toolbar */}
      <div className="bg-slate-950 px-3 py-2 border-b border-slate-800 flex flex-wrap items-center gap-1">
        
        {/* Undo / Redo */}
        <button
          type="button"
          onClick={() => executeCommand('undo')}
          title="Undo"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('redo')}
          title="Redo"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <Redo className="w-4 h-4" />
        </button>

        <span className="w-px h-5 bg-slate-800 mx-1" />

        {/* Headings */}
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<h2>')}
          title="Heading 2"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<h3>')}
          title="Heading 3"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<p>')}
          title="Paragraph"
          className="px-2 py-1 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          P
        </button>

        <span className="w-px h-5 bg-slate-800 mx-1" />

        {/* Basic Formatting */}
        <button
          type="button"
          onClick={() => executeCommand('bold')}
          title="Bold (Ctrl+B)"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('italic')}
          title="Italic (Ctrl+I)"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('underline')}
          title="Underline (Ctrl+U)"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <Underline className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('strikeThrough')}
          title="Strikethrough"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <span className="w-px h-5 bg-slate-800 mx-1" />

        {/* Lists & Alignment */}
        <button
          type="button"
          onClick={() => executeCommand('insertUnorderedList')}
          title="Bullet List"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('insertOrderedList')}
          title="Numbered List"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('justifyLeft')}
          title="Align Left"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('justifyCenter')}
          title="Align Center"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <AlignCenter className="w-4 h-4" />
        </button>

        <span className="w-px h-5 bg-slate-800 mx-1" />

        {/* Inserts: Link, Quote, Highlight Box */}
        <button
          type="button"
          onClick={insertLink}
          title="Insert Link"
          className="p-1.5 rounded-lg text-slate-400 hover:text-teal-400 hover:bg-slate-800 transition"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<blockquote>')}
          title="Blockquote"
          className="p-1.5 rounded-lg text-slate-400 hover:text-teal-400 hover:bg-slate-800 transition"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={insertCallout}
          title="Insert Highlight Callout Box"
          className="px-2 py-1 rounded-lg text-xs font-semibold bg-teal-950 text-teal-300 border border-teal-800/80 hover:bg-teal-900 transition flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3 text-yellow-300" />
          <span>Callout Box</span>
        </button>

        {/* HTML / Code View Toggle */}
        <button
          type="button"
          onClick={() => setIsCodeView(!isCodeView)}
          title={isCodeView ? 'Switch to Visual Editor' : 'Switch to HTML Code View'}
          className={`ml-auto px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
            isCodeView
              ? 'bg-teal-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          {isCodeView ? (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Visual Editor</span>
            </>
          ) : (
            <>
              <Code className="w-3.5 h-3.5" />
              <span>HTML Source</span>
            </>
          )}
        </button>
      </div>

      {/* Editor Content Area */}
      {isCodeView ? (
        <textarea
          value={htmlContent}
          onChange={handleCodeChange}
          placeholder="Type or paste raw HTML here..."
          className="w-full p-4 bg-slate-950 font-mono text-xs text-teal-300 focus:outline-none resize-y"
          style={{ minHeight }}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onBlur={handleInput}
          dangerouslySetInnerHTML={{ __html: value || '' }}
          className="p-4 sm:p-5 text-slate-100 text-sm focus:outline-none overflow-y-auto leading-relaxed prose prose-invert max-w-none prose-p:my-2 prose-headings:text-white prose-a:text-teal-400 prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-slate-950 prose-blockquote:p-3 prose-blockquote:rounded-r-xl"
          style={{ minHeight }}
        />
      )}

      {/* Bottom Info Bar */}
      <div className="bg-slate-950/80 px-3 py-1.5 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Rich Text WYSIWYG Mode</span>
        <span>Supports Headings, Links, Bullets & Styled Callouts</span>
      </div>
    </div>
  );
}
