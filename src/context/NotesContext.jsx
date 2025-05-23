import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../db/dexieDB";
import { v4 as uuidv4 } from "uuid";
import { createNote, updateNote, deleteNote } from "../services/api";

const NotesContext = createContext();
export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  console.log(isOnline, "isOnline in side context api");

  const loadLocalNotes = async () => {
    const allNotes = await db.notes.toArray();
    setNotes(allNotes);
    setIsLoaded(true);
  };

  useEffect(() => {
    loadLocalNotes();
    const handleOnline = () => {
      console.log("online");
      setIsOnline(true);
      syncNotes();
    };

    const handleOffline = () => {
      console.log("offline");
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (navigator.onLine) {
      handleOnline();
    } else {
      handleOffline();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const syncNotes = async () => {
    const unsynced = await db.notes.where("synced").equals(false).toArray();

    for (let note of unsynced) {
      try {
        const { id, ...noteWithoutId } = note;
        const response = await createNote(noteWithoutId);

        if (response.ok) {
          const savedNote = await response.json();

          await db.notes.delete(id);
          await db.notes.add({ ...savedNote, synced: true });
        }
      } catch (e) {
        console.error("Sync failed for", note.id, e);
      }
    }

    loadLocalNotes();
  };

  const addNote = async () => {
    const newNote = {
      id: uuidv4(),
      title: "Title",
      content: "# Spider Man",
      updatedAt: new Date().toISOString(),
      synced: isOnline ? true : false,
    };
    await db.notes.add(newNote);
    loadLocalNotes();
  };

  const editNote = async (id, updates) => {
    updates.updatedAt = new Date().toISOString();
    updates.synced = false;
    await db.notes.update(id, updates);
    loadLocalNotes();
  };

  const removeNote = async (id) => {
    await db.notes.delete(id);
    loadLocalNotes();
    try {
      await deleteNote(id);
    } catch (e) {
      console.log("Error in deleting note", e);
    }
  };

  return (
    <NotesContext.Provider
      value={{ notes, addNote, editNote, removeNote, isOnline, isLoaded }}
    >
      {children}
    </NotesContext.Provider>
  );
};
