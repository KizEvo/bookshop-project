import { genresOptions } from '../utils/genres'
const SmallFilterFormGenresSelectionContainer = (props) => {
  const { queriesState, setQueriesState } = props

  const handleChangeGenre = (e) => {
    if (e.target.checked) {
      const genreLabelId = e.target.id
      const genreName = genreLabelId.split('_')[3]
      setQueriesState({ ...queriesState, category: genreName })
    }
  }

  return (
    <>
      <h6>
        Genres
        <div>
          You selected :
          {queriesState.category === '' ? ' none' : ` ${queriesState.category}`}
        </div>
      </h6>
      <div className='filter-form-genres-selection-small-width'>
        {genresOptions.map((item) => {
          const { id, genre } = item
          return (
            <div key={id}>
              <input
                type='radio'
                name='genre'
                onChange={handleChangeGenre}
                id={`small_genre_label_${genre}`}
                className='mx-1'
              ></input>
              <label htmlFor={`small_genre_label_${genre}`}>{genre}</label>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default SmallFilterFormGenresSelectionContainer
