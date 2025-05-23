const API = "http://localhost:4000/notes";

export const createNote = async (note) => {
  return fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
};

export const updateNote = async (note) => {
  return fetch(`${API}/${note.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
};

export const deleteNote = async (id) => {
  return fetch(`${API}/${id}`, { method: "DELETE" });
};
