const StatItem = ({ category, count, icon, color }) => {
  return (
    <div
      className='container form-background mt-1'
      style={{ borderTop: `5px solid ${color}` }}
    >
      <div className='d-flex justify-content-between align-items-center'>
        <h2>{count}</h2>
        <div className='text-end fw-bold'>
          <div className='icon-category'>{icon}</div>
          <div className='fs-4'>{category}</div>
        </div>
      </div>
    </div>
  )
}
export default StatItem
