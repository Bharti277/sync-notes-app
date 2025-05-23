import Dexie from "dexie";

export const db = new Dexie("NotesDatabase");
db.version(1).stores({
  notes: "id, title, content, synced",
});
