import { useState } from 'react'
import { useAppContext } from '../context/appContext'
import Form from 'react-bootstrap/Form'
import FormRow from './FormRow'

const initialState = {
  name: '',
  author: '',
  sort: 'newest',
  sorts: ['newest', 'oldest'],
  category: 'all',
  price: 0,
  categories: [
    'all',
    'adventure',
    'classic',
    'mystery',
    'fantasy',
    'historical',
    'horror',
    'sci-fi',
  ],
}

const SearchFormAllProductsAdmin = () => {
  const { getSearchProductInput, isLoading } = useAppContext()
  const [values, setValues] = useState(initialState)

  const handleSubmit = (e) => {
    e.preventDefault()
    const query = {
      name: values.name,
      author: values.author,
      category: values.category,
      sort: values.sort,
      price: values.price,
    }
    getSearchProductInput(query)
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <section className='container form-background p-3'>
      <Form onSubmit={handleSubmit}>
        <h3>Search Form</h3>
        <div className='d-flex flex-md-row flex-column justify-content-center gap-3'>
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
            placeholder='Name'
          ></FormRow>
          <FormRow
            type='text'
            name='author'
            value={values.author}
            handleChange={handleChange}
            placeholder='Author'
          ></FormRow>
          <div className='d-flex flex-column gap-2 mt-2'>
            <label htmlFor='category-select'>Category</label>
            <select
              name='category'
              value={values.category}
              className='form-control'
              id='category-select'
              onChange={handleChange}
            >
              {initialState.categories.map((categoryOption, index) => {
                return (
                  <option key={index} value={categoryOption}>
                    {categoryOption}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='d-flex flex-column gap-2 mt-2'>
            <label htmlFor='sort-select'>Sort</label>
            <select
              name='sort'
              value={values.sort}
              className='form-control'
              onChange={handleChange}
              id='sort-select'
            >
              {initialState.sorts.map((option, index) => {
                return (
                  <option key={index} value={option}>
                    {option}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
        <div className='container mt-2'>
          <label htmlFor='custom-range' className='form-label'>
            Price Range:
          </label>
          <div className='d-flex gap-5 align-items-center mx-5 px-5'>
            <h4>0</h4>
            <input
              type='range'
              name='price'
              className='form-range'
              defaultValue='0'
              min='0'
              max='100'
              id='custom-range'
              onChange={handleChange}
            ></input>
            <h4>100</h4>
          </div>
        </div>
        <div className='d-flex flex-column m-2 mt-4'>
          <button
            className='btn btn-primary align-self-center'
            disabled={isLoading}
          >
            Search Product
          </button>
        </div>
      </Form>
    </section>
  )
}
export default SearchFormAllProductsAdmin
