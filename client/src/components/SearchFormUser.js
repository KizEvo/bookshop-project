import FormRow from './FormRow'
import Form from 'react-bootstrap/Form'
import useDebounce from '../hooks/useDebounce'
import { useAppContext } from '../context/appContext'
import { useEffect, useState, useRef } from 'react'

const SearchFormUser = () => {
  const [searchName, setSearchName] = useState({ name: '' })
  const refContainer = useRef(true)
  const { getSearchProductInput, changePage, search } = useAppContext()

  const handleChange = (e) => {
    setSearchName({ ...searchName, name: e.target.value })
  }

  const debounceSearch = useDebounce(searchName.name, 800)

  useEffect(() => {
    const isFirstRender = cancelTheFirstRender()
    if (isFirstRender) return

    const query = {
      name: debounceSearch,
      price: search.price,
      category: search.category,
    }

    console.log(query)
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
          value={searchName.name}
          handleChange={handleChange}
          placeholder='Search here!'
        />
      </div>
    </div>
  )
}
export default SearchFormUser
