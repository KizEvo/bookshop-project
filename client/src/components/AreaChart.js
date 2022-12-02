import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const AreaChartComponent = ({ monthlyUser }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={monthlyUser} margin={{ top: 20 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type='monotone' dataKey='count' stroke='#18bc9c' fill='#70ffe7' />
      </AreaChart>
    </ResponsiveContainer>
  )
}
export default AreaChartComponent
