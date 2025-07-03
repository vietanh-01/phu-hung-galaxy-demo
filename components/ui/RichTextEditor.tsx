'use client';

import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import React from 'react';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const setLink = React.useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const buttons = [
    { id: 'bold', action: () => editor.chain().focus().toggleBold().run() },
    { id: 'italic', action: () => editor.chain().focus().toggleItalic().run() },
    { id: 'strike', action: () => editor.chain().focus().toggleStrike().run() },
    { id: 'bulletList', action: () => editor.chain().focus().toggleBulletList().run(), label: 'List' },
    { id: 'link', action: setLink },
  ];

  return (
    <div className="border border-gray-300 rounded-t-lg p-2 flex flex-wrap gap-2 bg-gray-50">
      {buttons.map(btn => (
        <button
          key={btn.id}
          type="button"
          onClick={btn.action}
          className={`px-3 py-1 border rounded-md text-sm capitalize hover:bg-gray-200 ${
            editor.isActive(btn.id) ? 'bg-gray-300' : 'bg-white'
          }`}
        >
          {btn.label || btn.id}
        </button>
      ))}
    </div>
  );
};

interface RichTextEditorProps {
  content: string;
  onChange: (richText: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none p-4 focus:outline-none',
      },
    },
  });

  return (
    <div className="rounded-lg border border-gray-300">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="bg-white min-h-[200px] rounded-b-lg" />
    </div>
  );
} 