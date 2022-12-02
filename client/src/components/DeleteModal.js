import { useAppContext } from '../context/appContext'
import Alert from './Alert'
const DeleteModal = () => {
  const { product, isLoading, deleteProduct, showAlert, closeModal } =
    useAppContext()

  return (
    <div className='modal-container'>
      <div className='modal-content form-background flex-column justify-content-evenly align-items-center p-4'>
        <h3>Product : {product.name}</h3>
        {showAlert && <Alert />}
        <h4>Are you sure you want to delete this product?</h4>
        <div className='mt-5'>
          <button
            className='btn btn-danger px-4 mx-5'
            disabled={isLoading}
            onClick={() => deleteProduct()}
          >
            Confirm
          </button>
          <button
            className='btn btn-primary px-4 mx-5'
            disabled={isLoading}
            onClick={() => closeModal()}
          >
            Return
          </button>
        </div>
      </div>
    </div>
  )
}
export default DeleteModal
