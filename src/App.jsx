import { useEffect } from "react";
import { Gallery, SearchForm, ToggleTheme } from "./components";

function App() {
  return (
    <main>
      <div className="curtain"></div>
      <ToggleTheme />
      <SearchForm />
      <Gallery />
    </main>
  );
}

export default App;
