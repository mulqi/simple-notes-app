import React from 'react';
import { motion } from 'framer-motion';
import { showFormattedDate } from '../utils/index';

const NoteList = ({ notes, onDeleteNote, onArchiveNote, onRestoreNote }) => {
  return (
    <div>
      {notes.map((note) => (
        <motion.div key={note.id} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }} className="mb-4 p-4 border rounded bg-white">
          <div className="mb-2">
            <h3 className="text-xl font-semibold">{note.title}</h3>
            <span className="text-gray-500 text-sm">
              {showFormattedDate(note.createdAt)} {/* Tampilkan tanggal dan waktu */}
            </span>
          </div>
          <p className="text-gray-600 mb-2">{note.body}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {!note.archived && (
                <button onClick={() => onArchiveNote(note.id)} className="text-blue-500 hover:text-blue-700 focus:outline-none">
                  Archive
                </button>
              )}
              {note.archived && (
                <button onClick={() => onRestoreNote(note.id)} className="text-green-500 hover:text-green-700 focus:outline-none">
                  Restore
                </button>
              )}
            </div>
            <button onClick={() => onDeleteNote(note.id)} className="text-red-500 hover:text-red-700 focus:outline-none">
              Delete
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default NoteList;
