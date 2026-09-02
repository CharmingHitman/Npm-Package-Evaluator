import './TitleAndSearch.css'
import searchLogo from '../../assets/package-detective-icon-search.svg';

export function TitleAndSearch() {
  return (
    <div className="title-and-search-container">
      <h2 className="title">Investigate NPM Package before you install it</h2>
      <div className='text'>Bundle size, Maintenance health, Security — the case file</div>
      <div className='Search-container'>
        <input className="search-input" type="text" placeholder="Search for a package..." />
        <button className="search-button">
          <img className="search-icon" src={searchLogo} alt="Search" />
        </button>
      </div>
    </div>
  )
}