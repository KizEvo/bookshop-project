import Offcanvas from 'react-bootstrap/Offcanvas'
import ScrollablePriceRange from './ScrollablePriceRange'
import { BiFilterAlt } from 'react-icons/bi'
import { useState } from 'react'

const SmallFilterForm = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const toggleShow = () => setShow(true)

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
          <ScrollablePriceRange />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
export default SmallFilterForm
