import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { Alert, FormRow, Product } from '../../components'
import { useAppContext } from '../../context/appContext'

const cursorPointerStyle = { cursor: 'pointer' }

const CreateProduct = () => {
  const {
    showAlert,
    alertType,
    product,
    handleChangeProductGlobal,
    displayAlert,
    isLoading,
    createProduct,
  } = useAppContext()
  const { categories, category, name, price, author, description } = product
  const [fileImage, setFileImage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !price || !description || !author || !category || !fileImage) {
      displayAlert()
      return
    }
    const formData = new FormData()
    formData.append('image', fileImage)
    formData.append('name', name)
    formData.append('price', price)
    formData.append('description', description)
    formData.append('author', author)
    formData.append('category', category)
    createProduct(formData)
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChangeProductGlobal(name, value)
  }

  return (
    <>
      <section className='container form-background p-3'>
        <Form onSubmit={handleSubmit}>
          <div className='text-center'>{showAlert && <Alert />}</div>
          <h3>Create Product</h3>
          <div className='d-flex flex-md-row flex-column justify-content-center gap-3'>
            <FormRow
              type='text'
              name='name'
              value={name}
              handleChange={handleChange}
              placeholder='Name'
            ></FormRow>
            <FormRow
              type='text'
              name='price'
              value={price}
              handleChange={handleChange}
              placeholder='Price ($)'
            ></FormRow>
            <FormRow
              type='text'
              name='author'
              value={author}
              handleChange={handleChange}
              placeholder='Author'
            ></FormRow>
            <div className='py-2 align-self-center'>
              <div className='d-flex flex-column gap-2'>
                <label htmlFor='categoryOption'>Category</label>
                <select
                  name='category'
                  value={category}
                  className='form-control'
                  onChange={handleChange}
                >
                  {categories.map((categoryOption, index) => {
                    return (
                      <option key={index} value={categoryOption}>
                        {categoryOption}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className='d-flex flex-column'>
            <label className='btn btn-success align-self-center mt-3'>
              <input
                type='file'
                accept='.png,.jpg'
                onChange={(e) => setFileImage(e.target.files[0])}
                style={cursorPointerStyle}
              />
            </label>
            <FormRow
              type='text'
              name='description'
              value={description}
              handleChange={handleChange}
              placeholder='Description'
            ></FormRow>
            <button
              className='btn btn-primary align-self-center mt-3'
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </Form>
      </section>
      <div className='d-flex justify-content-center'>
        {showAlert && alertType !== 'danger' && <Product {...product} />}
      </div>
    </>
  )
}
export default CreateProduct
