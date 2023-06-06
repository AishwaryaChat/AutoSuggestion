import { useCallback, useEffect, useState } from "react";
import "./suggestion.css";

const AutoSuggestion = ({
  suggestions = [],
  onSuggestionClick,
  onInputChange,
  highLightedItemClassName = "highlighted",
  listItemClassName = "",
  listClassName = "",
  inputClassName = "",
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeElement, setActiveElement] = useState();
  useEffect(() => {
    if (value !== "") {
      const newSuggestions = suggestions.filter((suggestion) =>
        suggestion.value.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredSuggestions(newSuggestions);
    }
  }, [value, suggestions]);

  useEffect(() => {
    if (filteredSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  }, [filteredSuggestions]);

  const handleSuggestionClick = useCallback(
    (element) => {
      if (onSuggestionClick) {
        onSuggestionClick(element);
      }
      setValue(element.value);
      setFilteredSuggestions([]);
    },
    [onSuggestionClick]
  );

  const handleValueChange = (e) => {
    if (onInputChange) {
      onInputChange(e.target.value);
    }
    setValue(e.target.value);
    setActiveElement(-1);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrorwUp":
        setActiveElement((prevIndex) =>
          prevIndex <= 0 ? filteredSuggestions.length - 1 : prevIndex - 1
        );
        return;

      case "ArrowDown":
        setActiveElement((prevIndex) =>
          prevIndex === filteredSuggestions.length - 1 ? 0 : prevIndex + 1
        );
        return;
      case "Enter":
        if (activeElement !== -1) {
          handleSuggestionClick(filteredSuggestions[activeElement]);
        }
        return;
      default:
        return;
    }
  };

  return (
    <div className="auto-suggestion-container">
      <input
        type="text"
        value={value}
        onChange={handleValueChange}
        onKeyDown={handleKeyDown}
        className={`auto-suggestion-input ${inputClassName}`}
      />
      {showSuggestions && (
        <ul className={`auto-suggestion-list ${listClassName}`}>
          {filteredSuggestions.map((element, index) => {
            const { id, label } = element;
            return (
              <li
                key={id}
                onClick={() => handleSuggestionClick(element)}
                className={`${listItemClassName} ${
                  activeElement === index ? highLightedItemClassName : ""
                }`}
              >
                {label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AutoSuggestion;
