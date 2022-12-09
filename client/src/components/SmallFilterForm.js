import Offcanvas from 'react-bootstrap/Offcanvas'
import Form from 'react-bootstrap/Form'
import SmallFilterFormPriceInput from './SmallFilterFormPriceInput'
import { BiFilterAlt } from 'react-icons/bi'
import { useState } from 'react'

const defaultFilterOptions = {
  maxPrice: 0,
}

const SmallFilterForm = () => {
  const [show, setShow] = useState(false)
  const [filterOptions, setFilterOptions] = useState(defaultFilterOptions)
  const handleClose = () => setShow(false)
  const toggleShow = () => setShow(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(filterOptions)
  }

  const handleMaxPriceChange = (e) => {
    setFilterOptions({ ...filterOptions, [e.target.name]: e.target.value })
  }

  return (
    <div className='d-md-none'>
      <div className='text-end m-2 fs-3 icon' onClick={toggleShow}>
        <span className='fs-6 fw-bold'>Filter</span>
        <BiFilterAlt variant='primary' />
      </div>
      <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter options</Offcanvas.Title>
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
