import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface EditorProps {
  value: string;
  setValue: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, setValue }) => {
  const handleChange = (content: string) => {
    setValue(content);
  };

  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        className='h-50'
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }],
            ['link', 'image'],
            ['clean'],
          ],
        }}
        formats={[
          'header',
          'bold', 'italic', 'underline', 'strike', 'blockquote',
          'list', 'bullet',
          'link', 'image',
        ]}
      />
    </>
  );
};

export default Editor;
