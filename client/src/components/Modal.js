import { useAppContext } from '../context/appContext'
import { IoCloseSharp } from 'react-icons/io5'
import EditProduct from './EditProduct'
const Modal = () => {
  const { closeModal } = useAppContext()
  return (
    <div className='modal-container'>
      <div className='modal-content form-background'>
        <EditProduct />
        <IoCloseSharp className='close-btn' onClick={() => closeModal()} />
      </div>
    </div>
  )
}
export default Modal
