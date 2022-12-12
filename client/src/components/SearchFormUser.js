import FormRow from './FormRow'
import Form from 'react-bootstrap/Form'
import { useAppContext } from '../context/appContext'
import { useState } from 'react'

const SearchFormUser = () => {
  const [searchName, setSearchName] = useState({ name: '' })
  const { getSearchProductInput, search, changePage } = useAppContext()

  const handleChange = (e) => {
    setSearchName({ ...searchName, name: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const query = {
      price: search.price || 50,
      category: search.category || 'all',
      name: searchName.name,
    }

    const page = 1
    changePage(page)
    getSearchProductInput(query)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className='d-flex align-items-center'>
        <div className='flex-fill'>
          <FormRow
            type='text'
            name='name'
            value={searchName.name}
            handleChange={handleChange}
            placeholder='Search for your favorite books!'
          />
        </div>
        <button className='btn btn-primary product-search-btn'>Search</button>
      </div>
    </Form>
  )
}
export default SearchFormUser
