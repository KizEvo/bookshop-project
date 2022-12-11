import ScrollablePriceRange from './ScrollablePriceRange'
import BigFilterFormGenresSelectionContainer from './BigFilterFormGenresSelectionContainer'
import useDebounce from '../hooks/useDebounce'
import { useState, useEffect } from 'react'
import { useAppContext } from '../context/appContext'

const defaultQueriesState = {
  price: 50,
  category: '',
}

const BigFilterForm = () => {
  const { getSearchProductInput } = useAppContext()
  const [queriesState, setQueriesState] = useState(defaultQueriesState)

  const debounceSearch = useDebounce(queriesState.price, 700)

  useEffect(() => {
    const query = {
      price: debounceSearch,
      category: queriesState.category
    }
    getSearchProductInput(query)
  }, [debounceSearch, queriesState.category])

  return (
    <div className='d-none d-md-block'>
      <div className='d-flex flex-column justify-content-between product-filter-container'>
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
          <h5 className='fw-bolder'>Welcome,</h5>
          <p>*user here*</p>
        </div>
      </div>
    </div>
  )
}
export default BigFilterForm
