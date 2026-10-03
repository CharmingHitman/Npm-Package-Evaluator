import './TitleAndSearch.css'
import { SearchInput } from '../../components/SearchInput';


export function TitleAndSearch({loadSearch}) {
  return (
    <div className="title-and-search-container">
      <h2 className="title">Investigate NPM Package before you install it</h2>
      <div className='text'>Bundle size, Maintenance health, Security — the case file</div>
      <SearchInput loadSearch={loadSearch} />
    </div>
  )
}