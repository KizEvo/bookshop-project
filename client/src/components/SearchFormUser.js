import FormRow from './FormRow'
import useDebounce from '../hooks/useDebounce'
import { useAppContext } from '../context/appContext'
import { useEffect, useState, useRef } from 'react'

const SearchFormUser = () => {
  const { getSearchProductInput, changePage, search } = useAppContext()
  const [searchName, setSearchName] = useState(search.name)
  const refContainer = useRef(true)

  const handleChange = (e) => {
    setSearchName(e.target.value)
  }

  const debounceSearch = useDebounce(searchName, 800)

  useEffect(() => {
    const isFirstRender = cancelTheFirstRender()
    if (isFirstRender) return

    const query = {
      name: debounceSearch,
      price: search.price,
      category: search.category,
    }

    const page = 1
    changePage(page)
    getSearchProductInput(query)
  }, [debounceSearch])

  const cancelTheFirstRender = () => {
    if (refContainer.current) {
      refContainer.current = false
      return true
    } else {
      return false
    }
  }

  return (
    <div className='d-flex align-items-center'>
      <div className='flex-fill'>
        <FormRow
          type='text'
          name='name'
          value={searchName}
          handleChange={handleChange}
          placeholder='Search here!'
        />
      </div>
    </div>
  )
}
export default SearchFormUser
