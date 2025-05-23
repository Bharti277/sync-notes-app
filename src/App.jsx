import "./App.css";
import { NotesProvider } from "./context/NotesContext";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <NotesProvider>
        <Home />
      </NotesProvider>
    </>
  );
}

export default App;
