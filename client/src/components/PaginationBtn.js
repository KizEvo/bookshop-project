import { BiCaretLeft, BiCaretRight } from 'react-icons/bi'
import { useAppContext } from '../context/appContext'

const PaginationBtn = () => {
  const { numberOfPages, page, changePage } = useAppContext()
  const pages = Array.from({ length: numberOfPages }, (_, index) => {
    return index + 1
  })

  const prevPage = () => {
    let newPage = page - 1
    if (newPage === 0) {
      newPage = numberOfPages
    }
    changePage(newPage)
  }

  const nextPage = () => {
    let newPage = page + 1
    if (newPage > numberOfPages) {
      newPage = 1
    }
    changePage(newPage)
  }
  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-end align-items-center'>
        <BiCaretLeft className='icon-pagination' onClick={() => prevPage()} />
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              key={pageNumber}
              className={
                pageNumber === page
                  ? 'mx-1 bg-success btn btn-secondary'
                  : 'mx-1 btn btn-secondary'
              }
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        })}
        <BiCaretRight className='icon-pagination' onClick={() => nextPage()} />
      </div>
    </div>
  )
}
export default PaginationBtn
