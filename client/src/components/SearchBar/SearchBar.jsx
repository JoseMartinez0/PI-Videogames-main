import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterVideogames } from "../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const onSearch = () => {
    dispatch(filterVideogames(name));
    setName("");
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Search videogames..."
        className={style.searchInput}
        onKeyPress={handleKeyPress}
      />
      <button className={style.button} onClick={() => onSearch(name)}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
