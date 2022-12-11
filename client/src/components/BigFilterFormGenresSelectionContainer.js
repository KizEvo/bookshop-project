const genresOptions = [
  { id: 1, genre: 'adventure' },
  { id: 2, genre: 'classic' },
  { id: 3, genre: 'mystery' },
  { id: 4, genre: 'fantasy' },
  { id: 5, genre: 'historical' },
  { id: 6, genre: 'horror' },
  { id: 7, genre: 'sci-fi' },
]

const BigFilterFormGenresSelectionContainer = (props) => {
  const { searchByProductCategory } = props
  return (
    <div className='d-flex align-items-start'>
      {genresOptions.map((item) => {
        const { id, genre } = item
        return (
          <div key={id} className='flex-row gap-2 my-1'>
            <input
              type='radio'
              name='genre'
              onChange={searchByProductCategory}
              id={`genre_label_${genre}`}
            ></input>
            <label htmlFor={`genre_label_${genre}`}>{genre}</label>
          </div>
        )
      })}
    </div>
  )
}
export default BigFilterFormGenresSelectionContainer
