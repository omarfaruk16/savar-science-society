"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { 
  Bold, Italic, Underline as UnderlineIcon, 
  List, ListOrdered, Image as ImageIcon, 
  Link as LinkIcon, Undo, Redo, Heading1, Heading2 
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const ToolbarButton = ({ 
  onClick, 
  isActive = false, 
  children, 
  title 
}: { 
  onClick: () => void; 
  isActive?: boolean; 
  children: React.ReactNode;
  title: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`p-2 rounded-md transition-colors ${
      isActive 
        ? 'bg-[#22c55e] text-white' 
        : 'text-[#a3b8aa] hover:bg-[#1a3028] hover:text-white'
    }`}
  >
    {children}
  </button>
);

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        allowBase64: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-green max-w-none focus:outline-none min-h-[300px] p-4 font-mono text-sm leading-relaxed',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="w-full rounded-lg border border-[#1a3028] bg-[#050d0a] overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-[#1a3028] bg-[#0a1410]">
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="Underline"
        >
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>
        
        <div className="w-[1px] h-6 bg-[#1a3028] mx-1" />
        
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        
        <div className="w-[1px] h-6 bg-[#1a3028] mx-1" />
        
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        
        <div className="w-[1px] h-6 bg-[#1a3028] mx-1" />
        
        <ToolbarButton 
          onClick={setLink}
          isActive={editor.isActive('link')}
          title="Add Link"
        >
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={addImage}
          title="Add Image"
        >
          <ImageIcon className="w-4 h-4" />
        </ToolbarButton>
        
        <div className="ml-auto flex items-center gap-1">
          <ToolbarButton 
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton 
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </ToolbarButton>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
      
      <style jsx global>{`
        .prose p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #5a7a68;
          pointer-events: none;
          height: 0;
        }
        .prose img {
          border-radius: 8px;
          border: 1px solid #1a3028;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .prose a {
          color: #22c55e;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
