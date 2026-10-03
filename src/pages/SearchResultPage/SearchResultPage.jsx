import './SearchResultPage.css';
import { SearchInput } from '../../components/SearchInput';
import { PageNumbers } from './PageNumbers';
import { Link, useSearchParams } from 'react-router';
import { toPackageRoute } from '../../components/utils';
import { useEffect } from 'react';



export function SearchResultPage({isLoading,searchResults,loadSearch,setCurrentPage,currentPage, total}) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  useEffect(()=> {
    async function fetchPackage() {
      loadSearch(query,currentPage);
    }
    fetchPackage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <>
      <Link to={"/"} className='back-button'>&lt; Back</Link>
      <SearchInput loadSearch={loadSearch} searchResult={searchResults} />
      <div className='result-count'>
        {isLoading ? 'Searching…' : `${total} results`}
      </div>
      <div className="search-results-container">
        {searchResults.map((result) => (
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
              <Link className='result-button' to={toPackageRoute(result.name)}>&gt;</Link>
            </div>

          </div>
        ))}
      </div>

      <PageNumbers loadSearch={loadSearch} setCurrentPage={setCurrentPage} currentPage={currentPage} isLoading={isLoading} total ={total} query={query} />
    </>
  )
}