import Offcanvas from 'react-bootstrap/Offcanvas'
import Form from 'react-bootstrap/Form'
import SmallFilterFormPriceInput from './SmallFilterFormPriceInput'
import { BiFilterAlt } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react'

const defaultFilterOptions = {
  maxPrice: 0,
}

const SmallFilterForm = () => {
  const [show, setShow] = useState(false)
  const [filterOptions, setFilterOptions] = useState(defaultFilterOptions)
  const handleCloseOffcanvas = () => setShow(false)
  const toggleShowOffcanvas = () => setShow(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(filterOptions)
  }

  const handleMaxPriceChange = (e) => {
    setFilterOptions({ ...filterOptions, [e.target.name]: e.target.value })
  }

  return (
    <div className='d-md-none'>
      <div className='text-end m-2 fs-3 icon' onClick={toggleShowOffcanvas}>
        <span className='fs-6 fw-bold'>Filter</span>
        <BiFilterAlt />
      </div>
      <Offcanvas show={show} onHide={handleCloseOffcanvas} responsive='md'>
        <Offcanvas.Header>
          <Offcanvas.Title>Filter options</Offcanvas.Title>
          <AiOutlineClose className='icon' onClick={handleCloseOffcanvas} />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <SmallFilterFormPriceInput
              maxPrice={filterOptions.maxPrice}
              handleMaxPriceChange={handleMaxPriceChange}
            />
            <button>Click</button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
export default SmallFilterForm
