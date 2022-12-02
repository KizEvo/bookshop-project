import { useEffect } from 'react'
import {
  Loading,
  ProductStatsContainer,
  ChartContainer,
} from '../../components'
import { useAppContext } from '../../context/appContext'
const Dashboard = () => {
  const { isLoading, showStats, monthlyUser, totalUser } = useAppContext()

  useEffect(() => {
    const abortController = new AbortController()
    showStats(abortController)
    return () => {
      abortController.abort()
    }
  }, [])

  if (isLoading) {
    return <Loading pageLoading={isLoading} />
  }
  return (
    <div>
      <ProductStatsContainer />
      <ChartContainer />
    </div>
  )
}
export default Dashboard
