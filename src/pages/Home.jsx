import React, { useEffect, useState } from "react";
import NoteList from "../components/NoteList";
import NoteEditor from "../components/NoteEditor";
import SearchBar from "../components/SearchBar";
import useOnlineStatus from "../hooks/useOnlineStatus";
import { useNotes } from "../context/NotesContext";

const Home = () => {
  const { notes, addNote, removeNote, isLoaded } = useNotes();
  console.log(notes, addNote, removeNote, isLoaded, "notes");

  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (notes.length > 0 && !selectedId) {
      setSelectedId(notes[0].id);
    }
  }, [notes, selectedId]);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentNote = notes.find((n) => n.id === selectedId);

  if (!isLoaded) {
    return <div className="p-4">Loading notes...</div>;
  }

  return (
    <>
      <div
        className={`w-full p-2 text-center text-white ${
          isOnline ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {isOnline
          ? "online"
          : "offline - changes will sync when you're back online"}
      </div>
      <div className="flex flex-col h-screen md:flex-row">
        <div className="w-full p-4 overflow-y-auto border-r md:w-1/3">
          <button
            className="px-4 py-2 mb-4 text-white bg-blue-500 rounded cursor-pointer"
            onClick={addNote}
          >
            New Note
          </button>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <NoteList
            notes={filteredNotes}
            onSelect={setSelectedId}
            selectedId={selectedId}
            onDelete={removeNote}
          />
        </div>
        <div className="w-full p-4 overflow-y-auto md:w-2/3">
          {currentNote ? (
            <NoteEditor key={currentNote.id} note={currentNote} />
          ) : (
            <p>Note Editor</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
