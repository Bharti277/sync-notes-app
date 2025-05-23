import React from "react";
import SyncStatus from "./SyncStatus";

const NoteList = ({ notes, onSelect, selectedId, onDelete }) => {
  console.log("Notes", notes);

  return (
    <ul>
      <p className="py-2 my-2 text-center text-brown-500 bg-gray-50">
        Select a Note to Edit/Update
      </p>
      {notes
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .map((note) => (
          <li
            key={note.id}
            className={`p-2 cursor-pointer rounded flex justify-between ${
              selectedId === note.id ? "bg-gray-300" : "hover:bg-gray-100"
            }`}
            onClick={() => onSelect(note.id)}
          >
            <div>
              <strong>{note.title || "TiTle here!"}</strong>

              <div>
                <SyncStatus synced={note.synced} />
              </div>
            </div>
            <div>
              <button
                onClick={() => onDelete(note.id)}
                className="ml-2 text-red-600 cursor-pointer hover:text-red-800"
                title="Delete note"
              >
                X
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default NoteList;
