import searchLogo from '../assets/package-detective-icon-search.svg';
import './SearchInput.css'
import { useNavigate } from 'react-router';
import { useState } from 'react';

export function SearchInput({ loadSearch,searchResults }) {
  const Navigate = useNavigate()
  const [query, setQuery] = useState('');


  return (
    <div className='Search-container'>
      <input className="search-input" type="text" placeholder="Search for a package..." value={query}
        onChange={
          (input) => setQuery(input.target.value)
        }
        onKeyDown={async (input) => {
          if (input.key === 'Enter') {
            Navigate(`/search/${query}`)
            if (!searchResults) {
              loadSearch(query, 1)
            }
          }
        }}
      />
      <button className="search-button" onClick={async () => {
        Navigate(`/search/${query}`)
        if (!searchResults) {
          loadSearch(query, 1)
        }
      }}>
        <img className="search-icon" src={searchLogo} alt="Search" />
      </button>
    </div>
  )
}