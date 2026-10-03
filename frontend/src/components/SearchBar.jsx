import { useState } from "react";
import { Input } from "./ui/input";
import { Search, X } from "lucide-react";

import React from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) onSearch("");
  };
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search inventory, suppliers..."
        value={query}
        onChange={handleChange}
        className="pl-9 pr-8 h-9 text-sm border bg-background/50 focus-visible:bg-background transition-colors"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
