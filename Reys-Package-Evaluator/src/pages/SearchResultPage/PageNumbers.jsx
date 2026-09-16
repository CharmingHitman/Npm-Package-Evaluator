function getPageNumbers(current, total) {
  const delta = 3;
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

export function PageNumbers(setCurrentPage,currentPage,isLoading,total) {

  let totalPages = Math.ceil(total/20);
  return (
    <>
      <div className='pagination'>
        <button
          className='pagination-button'
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1 || isLoading}
        >
          Prev
        </button>

        {getPageNumbers(currentPage, totalPages).map((item, index) =>
          item === '...' ? (
            <span key={`dots-${index}`} className='pagination-dots'>…</span>
          ) : (
            <button
              key={item}
              className={item === currentPage ? 'pagination-number pagination-number-active' : 'pagination-number'}
              onClick={() => setCurrentPage(item)}
              disabled={isLoading}
            >
              {item}
            </button>
          )
        )}

        <button
          className='pagination-button'
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage >= total || isLoading}
        >
          Next
        </button>
      </div>
    </>
  );
}


