import React, { useState } from 'react';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import { getInitialData } from '../utils/index';

const App = () => {
  const [notes, setNotes] = useState(getInitialData());
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, { ...newNote, id: +new Date() }]);
  };

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleArchiveNote = (id) => {
    setNotes((prevNotes) => prevNotes.map((note) => (note.id === id ? { ...note, archived: true } : note)));
  };

  const handleRestoreNote = (id) => {
    setNotes((prevNotes) => prevNotes.map((note) => (note.id === id ? { ...note, archived: false } : note)));
  };

  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchKeyword.toLowerCase()));

  const archivedNotes = filteredNotes.filter((note) => note.archived);
  const activeNotes = filteredNotes.filter((note) => !note.archived);

  return (
    <div className="p-8 max-w-screen-md mx-auto rounded shadow-md grid gap-4 place-content-center bg-card">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-300">My Notes App</h1>
      <NoteForm onAddNote={handleAddNote} />
      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-semibold text-gray-100 mb-1">
          Cari Catatan:
        </label>
        <input
          type="text"
          id="search"
          placeholder="Cari..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300"
        />
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-2 text-white">Catatan Aktif</h2>
          {activeNotes.length > 0 ? <NoteList notes={activeNotes} onDeleteNote={handleDeleteNote} onArchiveNote={handleArchiveNote} onRestoreNote={handleRestoreNote} /> : <p className="text-gray-100 text-center">Tidak ada catatan</p>}
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2 text-white">Catatan Diarsipkan</h2>
          {archivedNotes.length > 0 ? <NoteList notes={archivedNotes} onDeleteNote={handleDeleteNote} onRestoreNote={handleRestoreNote} /> : <p className="text-gray-100 text-center">Tidak ada catatan diarsipkan</p>}
        </div>
      </div>
    </div>
  );
};

export default App;
