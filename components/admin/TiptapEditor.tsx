'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { useEffect, useCallback } from 'react'
import {
  Bold, Italic, Strikethrough, Code, Link as LinkIcon, Unlink,
  Heading1, Heading2, Heading3, List, ListOrdered,
  Quote, Minus, Undo, Redo, Code2
} from 'lucide-react'

interface TiptapEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  minHeight?: number
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded-lg text-sm transition-colors ${
        active
          ? 'bg-black text-white'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      } disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <span className="w-px h-5 bg-gray-200 mx-0.5 shrink-0" />
}

export default function TiptapEditor({
  value,
  onChange,
  placeholder = 'Makale içeriğinizi buraya yazın...',
  minHeight = 380,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: { languageClassPrefix: 'language-' },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-amber-600 underline underline-offset-2 hover:text-amber-700',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Placeholder.configure({ placeholder }),
      CharacterCount,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  // Sync external value changes (e.g. when editing an existing post)
  useEffect(() => {
    if (!editor) return
    const current = editor.getHTML()
    if (value !== current) {
      editor.commands.setContent(value, false)
    }
  }, [value, editor])

  const handleSetLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('Link URL:', prev ?? 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }, [editor])

  if (!editor) return null

  const wordCount = editor.storage.characterCount?.words?.() ?? 0
  const charCount = editor.storage.characterCount?.characters?.() ?? 0

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-black transition-shadow">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-gray-200 bg-gray-50">
        {/* History */}
        <ToolbarButton title="Geri Al" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="İleri Al" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo className="size-4" />
        </ToolbarButton>

        <Divider />

        {/* Headings */}
        <ToolbarButton title="Başlık 1" active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <Heading1 className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Başlık 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Başlık 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="size-4" />
        </ToolbarButton>

        <Divider />

        {/* Inline marks */}
        <ToolbarButton title="Kalın" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="İtalik" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Üstü Çizili" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Satır İçi Kod" active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()}>
          <Code className="size-4" />
        </ToolbarButton>

        <Divider />

        {/* Lists */}
        <ToolbarButton title="Madde Listesi" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Numaralı Liste" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="size-4" />
        </ToolbarButton>

        <Divider />

        {/* Block */}
        <ToolbarButton title="Alıntı" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Kod Bloğu" active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <Code2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton title="Yatay Çizgi" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="size-4" />
        </ToolbarButton>

        <Divider />

        {/* Link */}
        <ToolbarButton title="Link Ekle" active={editor.isActive('link')} onClick={handleSetLink}>
          <LinkIcon className="size-4" />
        </ToolbarButton>
        {editor.isActive('link') && (
          <ToolbarButton title="Linki Kaldır" onClick={() => editor.chain().focus().unsetLink().run()}>
            <Unlink className="size-4" />
          </ToolbarButton>
        )}
      </div>

      {/* Content area */}
      <EditorContent
        editor={editor}
        style={{ minHeight }}
        className={`
          px-5 py-4 text-sm text-gray-800 leading-relaxed cursor-text
          [&_.tiptap_p]:my-2
          [&_.tiptap_h1]:text-2xl [&_.tiptap_h1]:font-bold [&_.tiptap_h1]:mt-5 [&_.tiptap_h1]:mb-2
          [&_.tiptap_h2]:text-xl [&_.tiptap_h2]:font-bold [&_.tiptap_h2]:mt-4 [&_.tiptap_h2]:mb-1.5
          [&_.tiptap_h3]:text-base [&_.tiptap_h3]:font-bold [&_.tiptap_h3]:mt-3 [&_.tiptap_h3]:mb-1
          [&_.tiptap_ul]:list-disc [&_.tiptap_ul]:pl-5 [&_.tiptap_ul]:my-2
          [&_.tiptap_ol]:list-decimal [&_.tiptap_ol]:pl-5 [&_.tiptap_ol]:my-2
          [&_.tiptap_li]:my-0.5
          [&_.tiptap_blockquote]:border-l-4 [&_.tiptap_blockquote]:border-amber-400 [&_.tiptap_blockquote]:pl-4 [&_.tiptap_blockquote]:text-gray-600 [&_.tiptap_blockquote]:italic [&_.tiptap_blockquote]:my-3
          [&_.tiptap_pre]:bg-gray-900 [&_.tiptap_pre]:text-gray-100 [&_.tiptap_pre]:rounded-lg [&_.tiptap_pre]:p-4 [&_.tiptap_pre]:my-3 [&_.tiptap_pre]:text-xs [&_.tiptap_pre]:overflow-x-auto
          [&_.tiptap_code]:bg-gray-100 [&_.tiptap_code]:text-amber-700 [&_.tiptap_code]:px-1 [&_.tiptap_code]:rounded [&_.tiptap_code]:text-xs
          [&_.tiptap_hr]:border-gray-200 [&_.tiptap_hr]:my-4
          [&_.tiptap_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.tiptap_.is-editor-empty:first-child::before]:text-gray-400 [&_.tiptap_.is-editor-empty:first-child::before]:float-left [&_.tiptap_.is-editor-empty:first-child::before]:pointer-events-none [&_.tiptap_.is-editor-empty:first-child::before]:h-0
        `}
      />

      {/* Footer: word/char count */}
      <div className="flex items-center justify-end gap-4 px-4 py-1.5 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-400 select-none">
        <span>{wordCount} kelime</span>
        <span>{charCount} karakter</span>
      </div>
    </div>
  )
}
