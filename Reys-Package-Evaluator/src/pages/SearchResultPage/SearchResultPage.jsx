import './SearchResultPage.css';
import { SearchInput } from '../../components/SearchInput';
import { PageNumbers } from './PageNumbers';
import { Link } from 'react-router';


export function SearchResultPage({isLoading,searchResults,loadSearch,setCurrentPage,currentPage, total}) {
  return (
    <>
      <Link to={"/"} className='back-button'>&lt; Back</Link>
      <SearchInput loadSearch={loadSearch} />
      <div className='result-count'>
        {isLoading ? 'Searching…' : `${total} results`}
      </div>
      <div className="search-results-container">
        {searchResults.map((result, index) => (
          <div className="search-result" key={result.name}>

            <div className='search-result-left-section'>
              <h3 className='result-package-name'>{result.name}</h3>
              <p className='result-package-description'>{result.description}</p>
            </div>

            <div className='search-result-right-section'>
              <div className={result.vulns.length ? 'security-label-vulnerable' : 'security-label-clean'}>
                {result.vulns.length ? `${result.vulns.length} issue${result.vulns.length > 1 ? 'flagged' : ''}` : 'Clean'}
              </div>
              <div className='result-size'>{result.size.kb} kB</div>
              <Link className='result-button' to={`/package/${index}/${result.name}/`}>&gt;</Link>
            </div>

          </div>
        ))}
      </div>

      <PageNumbers setCurrentPage={setCurrentPage} currentPage={currentPage} isLoading={isLoading} total ={total} />
    </>
  )
}