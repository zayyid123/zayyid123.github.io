import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css'

const QuillEditor = ({ setText, text }) => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
      ],
      [{ 'align': [] }],
      ['link'],
      ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
  }
  /*
  * Quill editor formats
  * See https://quilljs.com/docs/formats/
  */
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'align',
  ]

  return (
    <div>
      <ReactQuill 
        modules={modules} 
        formats={formats} 
        value={text} 
        onChange={setText}
      />
    </div>
  );
};


export default QuillEditor;