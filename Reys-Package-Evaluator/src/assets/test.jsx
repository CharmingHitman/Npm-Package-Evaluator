import { useState, useEffect } from 'react';
import { searchPackages, enrichResults } from '../../services/npmRegistry';
import { SearchInput } from '../components/SearchInput';

const PAGE_SIZE = 20;

function getPageNumbers(current, total) {
  const delta = 2;
  const range = [];
  const withDots = [];
  let last;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    }
  }

  range.forEach((i) => {
    if (last) {
      if (i - last === 2) {
        withDots.push(last + 1); // fill a 1-page gap instead of using dots for it
      } else if (i - last > 1) {
        withDots.push('...');
      }
    }
    withDots.push(i);
    last = i;
  });

  return withDots;
}

export function SearchResultPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      const { results, total: resultTotal } = await searchPackages('axios', {
        size: PAGE_SIZE,
        from: (page - 1) * PAGE_SIZE,
      });
      const enriched = await enrichResults(results);
      setSearchResults(enriched);
      setTotal(resultTotal);
      setIsLoading(false);
    };

    fetchSearchResults();
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <>
      <SearchInput />
      <div className='result-count'>
        {isLoading ? 'Searching…' : `${total.toLocaleString()} results`}
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
                {result.vulns.length ? `${result.vulns.length} issue${result.vulns.length > 1 ? 's' : ''}` : 'Clean'}
              </div>
              <div className='result-size'>{result.size.kb} kB</div>
              <button className='result-button'>&gt;</button>
            </div>

          </div>
        ))}
      </div>

      <div className='pagination'>
        <button
          className='pagination-button'
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1 || isLoading}
        >
          Prev
        </button>

        {getPageNumbers(page, totalPages).map((item, index) =>
          item === '...' ? (
            <span key={`dots-${index}`} className='pagination-dots'>…</span>
          ) : (
            <button
              key={item}
              className={item === page ? 'pagination-number pagination-number-active' : 'pagination-number'}
              onClick={() => setPage(item)}
              disabled={isLoading}
            >
              {item}
            </button>
          )
        )}

        <button
          className='pagination-button'
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages || isLoading}
        >
          Next
        </button>
      </div>
    </>
  )
}