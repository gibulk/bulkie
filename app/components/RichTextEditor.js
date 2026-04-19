'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import {
  FiBold,
  FiItalic,
  FiList,
  FiLink,
  FiImage,
  FiCode,
  FiCornerUpLeft,
  FiCornerUpRight
} from 'react-icons/fi'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }
  
  const addImage = () => {
    const url = window.prompt('Masukkan URL gambar:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }
  
  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('Masukkan URL:', previousUrl)
    
    if (url === null) {
      return
    }
    
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }
  
  return (
    <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive('bold') ? 'bg-gray-200' : ''
        }`}
        title="Bold"
        type="button"
      >
        <FiBold />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive('italic') ? 'bg-gray-200' : ''
        }`}
        title="Italic"
        type="button"
      >
        <FiItalic />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''
        }`}
        title="Heading 2"
        type="button"
      >
        H2
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''
        }`}
        title="Heading 3"
        type="button"
      >
        H3
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive('bulletList') ? 'bg-gray-200' : ''
        }`}
        title="Bullet List"
        type="button"
      >
        <FiList />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive('orderedList') ? 'bg-gray-200' : ''
        }`}
        title="Numbered List"
        type="button"
      >
        1.
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive('codeBlock') ? 'bg-gray-200' : ''
        }`}
        title="Code Block"
        type="button"
      >
        <FiCode />
      </button>
      
      <button
        onClick={setLink}
        className={`p-2 rounded hover:bg-gray-100 ${
          editor.isActive('link') ? 'bg-gray-200' : ''
        }`}
        title="Add Link"
        type="button"
      >
        <FiLink />
      </button>
      
      <button
        onClick={addImage}
        className="p-2 rounded hover:bg-gray-100"
        title="Add Image"
        type="button"
      >
        <FiImage />
      </button>
      
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-2 rounded hover:bg-gray-100"
        title="Undo"
        type="button"
      >
        <FiCornerUpLeft />
      </button>
      
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-2 rounded hover:bg-gray-100"
        title="Redo"
        type="button"
      >
        <FiCornerUpRight />
      </button>
    </div>
  )
}

export default function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Placeholder.configure({
        placeholder: 'Tulis konten artikel Anda di sini...',
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })
  
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
      <MenuBar editor={editor} />
      <EditorContent 
        editor={editor} 
        className="prose prose-lg max-w-none p-4 min-h-[400px] focus:outline-none"
      />
    </div>
  )
}
