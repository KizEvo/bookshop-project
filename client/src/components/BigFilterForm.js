import ScrollablePriceRange from './ScrollablePriceRange'
import BigFilterFormGenresSelectionContainer from './BigFilterFormGenresSelectionContainer'
import useDebounce from '../hooks/useDebounce'
import { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../context/appContext'

const defaultQueriesState = {
  price: 50,
  category: '',
  sort: 'newest',
}

const BigFilterForm = () => {
  const { getSearchProductInput, search, changePage } = useAppContext()
  const [queriesState, setQueriesState] = useState(defaultQueriesState)
  const refContainer = useRef(true)

  const debounceSearch = useDebounce(queriesState.price, 800)

  useEffect(() => {
    const isFirstRender = cancelTheFirstRender()
    if (isFirstRender) return

    const query = {
      price: debounceSearch,
      name: search.name,
      category: queriesState.category,
      sort: queriesState.sort,
    }

    const page = 1
    changePage(page)
    getSearchProductInput(query)
  }, [debounceSearch, queriesState.category, queriesState.sort])

  const cancelTheFirstRender = () => {
    if (refContainer.current) {
      refContainer.current = false
      return true
    } else {
      return false
    }
  }

  return (
    <div className='d-none d-md-block'>
      <div className='d-flex flex-column justify-content-start product-filter-container p-3'>
        <ScrollablePriceRange
          queriesState={queriesState}
          setQueriesState={setQueriesState}
        />
        <div>
          <hr />
          <h5 className='fw-bolder'>Genres</h5>
          <BigFilterFormGenresSelectionContainer
            queriesState={queriesState}
            setQueriesState={setQueriesState}
          />
        </div>
        <div>
          <hr />
          <h5 className='fw-bolder'>Sort</h5>
          <select
            className='border rounded-pill px-2'
            onChange={(e) => {
              setQueriesState((prevState) => {
                return { ...prevState, sort: e.target.value }
              })
            }}
          >
            <option value='newest'>Newest</option>
            <option value='oldest'>Oldest</option>
          </select>
          <hr />
          <h5>Welcome!</h5>
        </div>
      </div>
    </div>
  )
}
export default BigFilterForm
