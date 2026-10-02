import searchLogo from '../assets/package-detective-icon-search.svg';
import './SearchInput.css'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { toSearchRoute } from './utils';

export function SearchInput({ loadSearch, searchResults }) {
  const Navigate = useNavigate()
  const [query, setQuery] = useState('');

  function goSearch() {
    Navigate(toSearchRoute(query));
    if (!searchResults) {
      loadSearch(query, 1)
    }
  }

  return (
    <div className='Search-container'>
      <input className="search-input" type="text" placeholder="Search for a package..." value={query}
        onChange={
          (input) => setQuery(input.target.value)
        }
        onKeyDown={(input) => {
          if (input.key === 'Enter') {
            goSearch();
          }
        }}
      />
      <button className="search-button" onClick={goSearch}>
        <img className="search-icon" src={searchLogo} alt="Search" />
      </button>
    </div>
  )
}