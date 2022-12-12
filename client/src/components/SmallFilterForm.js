import Offcanvas from 'react-bootstrap/Offcanvas'
import Form from 'react-bootstrap/Form'
import SmallFilterFormGenresSelectionContainer from './SmallFilterFormGenresSelectionContainer'
import SmallFilterFormPriceInput from './SmallFilterFormPriceInput'
import { BiFilterAlt } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react'
import { useAppContext } from '../context/appContext'

const defaultQueriesState = {
  price: 0,
  category: '',
}

const SmallFilterForm = () => {
  const { getSearchProductInput, search, changePage } = useAppContext()

  const [successMessage, setSuccessMessage] = useState(false)
  
  const [queriesState, setQueriesState] = useState(defaultQueriesState)
  
  const [showOffcanvas, setShowOffcanvas] = useState(false)
  const handleCloseOffcanvas = () => setShowOffcanvas(false)
  const toggleShowOffcanvas = () => setShowOffcanvas(true)


  const handleSubmit = (e) => {
    e.preventDefault()
    const query = {
      price: queriesState.price,
      category: queriesState.category,
      name: search.name,
    }

    const page = 1
    changePage(page)
    getSearchProductInput(query)
    
    displaySuccessMessage()
    removeSuccessMessageAfterMillisSec(3000)
  }

  const displaySuccessMessage = () => {
    setSuccessMessage(true)
  }

  const removeSuccessMessageAfterMillisSec = (timeout) => {
    setTimeout(() => {
      setSuccessMessage(false)
    }, timeout)
  }

  return (
    <div className='d-md-none'>
      <div className='text-end m-2 fs-3 icon' onClick={toggleShowOffcanvas}>
        <span className='fs-6 fw-bold'>Filter</span>
        <BiFilterAlt />
      </div>
      <Offcanvas
        show={showOffcanvas}
        onHide={handleCloseOffcanvas}
        responsive='md'
        scroll={true}
      >
        <Offcanvas.Header>
          <Offcanvas.Title>Filter options</Offcanvas.Title>
          <AiOutlineClose className='icon' onClick={handleCloseOffcanvas} />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <SmallFilterFormPriceInput
              queriesState={queriesState}
              setQueriesState={setQueriesState}
            />
            <hr />
            <SmallFilterFormGenresSelectionContainer
              queriesState={queriesState}
              setQueriesState={setQueriesState}
            />
            <div className='d-flex flex-column m-4'>
              <button className='btn btn-primary'>Search</button>
              {successMessage && (
                <p className='fw-bold text-success align-self-center m-4'>
                  Success!
                </p>
              )}
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
export default SmallFilterForm
