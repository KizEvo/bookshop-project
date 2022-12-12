import { genresOptions } from '../utils/genres'

const BigFilterFormGenresSelectionContainer = (props) => {
  const { setQueriesState, queriesState } = props

  const searchbyProductCategory = (e) => {
    if (e.target.checked) {
      const categoryLabelId = e.target.id
      const categoryName = categoryLabelId.split('_')[2]
      setQueriesState({ ...queriesState, category: categoryName })
    }
  }

  return (
    <div className='d-flex align-items-start'>
      {genresOptions.map((item) => {
        const { id, genre } = item
        return (
          <div key={id} className='flex-row gap-2 my-1 text-capitalize'>
            <input
              type='radio'
              name='genre'
              onChange={searchbyProductCategory}
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
