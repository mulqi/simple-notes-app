import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NoteForm = ({ onAddNote }) => {
  const [note, setNote] = useState({ title: '', body: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleAddNote = () => {
    if (note.title.trim() !== '' && note.body.trim() !== '') {
      onAddNote({
        title: note.title,
        body: note.body,
        archived: false,
        createdAt: new Date().toISOString(),
      });
      setNote({ title: '', body: '' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }} className="mb-4 flex flex-col items-end">
      <div className="mb-2 w-full">
        <label htmlFor="title" className="block text-sm font-semibold text-gray-600 mb-1">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter a title..."
          value={note.title}
          onChange={handleChange}
          className="p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300"
        />
      </div>
      <div className="mb-2 w-full">
        <label htmlFor="body" className="block text-sm font-semibold text-gray-600 mb-1">
          Body:
        </label>
        <textarea id="body" name="body" placeholder="Add a note..." value={note.body} onChange={handleChange} className="p-2 border rounded w-full h-20 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300" />
      </div>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: '#3B82F6', color: 'white' }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddNote}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all duration-300 focus:outline-none"
      >
        Add Note
      </motion.button>
    </motion.div>
  );
};

export default NoteForm;
