import { useRef } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const inputRef = useRef(null);
  const { setSearchTerm } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = inputRef.current.value;
    if (!searchValue) return;
    setSearchTerm(searchValue);
  };
  return (
    <section>
      <h1 className="title">Unplash Images</h1>
      <form onSubmit={handleSubmit} className="search_form">
        <input
          ref={inputRef}
          placeholder="cat"
          type="text"
          className="search_input"
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
