import { useAppContext } from '../context/appContext'

const Alert = () => {
  const { alertText, alertType } = useAppContext()

  return (
    <div className={`alert alert-${alertType} p-2 mt-2 text-center`}>
      {alertText}
    </div>
  )
}
export default Alert
