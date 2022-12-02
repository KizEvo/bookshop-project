import FormRow from './FormRow'
import Form from 'react-bootstrap/Form'
import ProductDisplay from './ProductDisplay'
import { useAppContext } from '../context/appContext'
import { useState, useEffect } from 'react'

const ProductContainerUser = () => {
  const [searchName, setSearchName] = useState({ name: '' })
  const { getSearchProductInput, isLoading } = useAppContext()

  const handleChange = (e) => {
    setSearchName({ ...searchName, name: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const query = { name: searchName.name }
    getSearchProductInput(query)
  }

  useEffect(() => {
    const query = { name: searchName.name }
    getSearchProductInput(query)
  }, [])

  return (
    <div className='product-container-user'>
      <div className='form-background p-2'>
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
            <button className='btn btn-primary product-search-btn'>
              Search
            </button>
          </div>
        </Form>
      </div>
      <ProductDisplay />
    </div>
  )
}
export default ProductContainerUser
