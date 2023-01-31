import { BiCaretLeft, BiCaretRight } from 'react-icons/bi'
import { useAppContext } from '../context/appContext'

const PaginationBtnOrders = () => {
  const { pageInAdminOrderPage, numberOfPagesOrders, changePageOrder } =
    useAppContext()

  const pages = Array.from({ length: numberOfPagesOrders }, (_, index) => {
    return index + 1
  })

  const prevPage = () => {
    let newPage = pageInAdminOrderPage - 1
    if (newPage === 0) {
      newPage = numberOfPagesOrders
    }
    changePageOrder(newPage)
  }

  const nextPage = () => {
    let newPage = pageInAdminOrderPage + 1
    if (newPage > numberOfPagesOrders) {
      newPage = 1
    }
    changePageOrder(newPage)
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
                pageNumber === pageInAdminOrderPage
                  ? 'mx-1 bg-success btn btn-secondary'
                  : 'mx-1 btn btn-secondary'
              }
              onClick={() => changePageOrder(pageNumber)}
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

export default PaginationBtnOrders
