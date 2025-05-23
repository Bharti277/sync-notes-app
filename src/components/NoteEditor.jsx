import React, { useCallback, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { debounce } from "../utils/debounce";
import { useNotes } from "../context/NotesContext";

const NoteEditor = ({ note }) => {
  const { editNote } = useNotes();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const debouncedEdit = useCallback(
    debounce((field, value) => {
      editNote(note.id, { [field]: value });
    }, 500),
    []
  );

  const handleChange = (field, value) => {
    if (field === "title") setTitle(value);
    if (field === "content") setContent(value);
    debouncedEdit(field, value);
  };

  return (
    <div className="space-y-4">
      <input
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="Title"
      />
      <MDEditor
        value={content}
        onChange={(value) => handleChange("content", value)}
        height={500}
      />
    </div>
  );
};

export default NoteEditor;
