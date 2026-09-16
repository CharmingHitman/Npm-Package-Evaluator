import { HomePage } from "./pages/HomePage/HomePage"
import { SearchResultPage } from "./pages/SearchResultPage/SearchResultPage"
import { Routes, Route } from 'react-router'
import { searchPackages, enrichResults } from '../public/npmRegistry';
import { useState } from "react";
import { PackageDetailPage } from "./pages/PackageDetailPage/PackageDetailPage";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState([1]);
  const [total, setTotal] = useState([0]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadSearch(query, currentPage) {
    setIsLoading(true);
    const { results, total: resultTotal } = await searchPackages(query, {
      size: 10,
      from: (currentPage - 1) * 10,
    });
    const enriched = await enrichResults(results);
    setSearchResults(enriched);
    setTotal(resultTotal);
    setIsLoading(false);
  }

  /*useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSearch(currentPage);
  }, [currentPage])*/
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage loadSearch={loadSearch} />} />
        <Route path="/search" element={<SearchResultPage setCurrentPage={setCurrentPage} currentPage={currentPage} isLoading={isLoading} searchResults={searchResults} loadSearch={loadSearch} total={total} />} />
        <Route path="/package/:arrayNumber/:packageName" element={<PackageDetailPage loadSearch={loadSearch} searchResults={searchResults} />} />
      </Routes>
    </>
  )
}
export default App
