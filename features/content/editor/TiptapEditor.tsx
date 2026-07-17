'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, List, ListOrdered, Heading2 } from 'lucide-react'

interface TiptapEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content,
    onUpdate: ({ editor }: { editor: any }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[100px] border border-input bg-background px-3 py-2 rounded-md ring-offset-background',
      },
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1 border border-input bg-muted/50 p-1 rounded-md">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-sm hover:bg-background transition-colors ${editor.isActive('bold') ? 'bg-background shadow-sm' : ''}`}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-sm hover:bg-background transition-colors ${editor.isActive('italic') ? 'bg-background shadow-sm' : ''}`}
        >
          <Italic className="w-4 h-4" />
        </button>
        <div className="w-px bg-border my-1 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-sm hover:bg-background transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-background shadow-sm' : ''}`}
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <div className="w-px bg-border my-1 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-sm hover:bg-background transition-colors ${editor.isActive('bulletList') ? 'bg-background shadow-sm' : ''}`}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-sm hover:bg-background transition-colors ${editor.isActive('orderedList') ? 'bg-background shadow-sm' : ''}`}
        >
          <ListOrdered className="w-4 h-4" />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
