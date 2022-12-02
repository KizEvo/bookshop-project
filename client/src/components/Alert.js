import { useAppContext } from "../context/appContext"

const Alert = () => {
  const {alertText, alertType} = useAppContext()

  return (
    <div className={`alert alert-${alertType} p-1 mt-2`}>{alertText}</div>
  )
}
export default Alert