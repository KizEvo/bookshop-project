import { useAppContext } from "../context/appContext"
import AreaChartComponent from "./AreaChart"
const ChartContainer = () => {
  const {monthlyUser, totalUser} = useAppContext()
  return (
    <div className="container mt-2 text-center">
      <h3 className="fw-bold">Monthly Verified Users</h3>
      <p>Area Chart</p>
      <AreaChartComponent monthlyUser={monthlyUser}/>
    </div>
  )
}
export default ChartContainer