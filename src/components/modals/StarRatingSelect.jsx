import clsx from 'clsx'
import PropTypes from 'prop-types'

const StarRatingSelect = ({ ratings, value = 'ALL', onSelected }) => {
  //const totalCount = ratings.reduce((total, rating) => total + rating.count, 0)

  const changeRating = (value) => {
    if(onSelected) onSelected(value)
  }

  return (
    <div className="d-flex justify-content-between align-items-center my-3">
      <div className="mb-2">
        <button
          type="button"
          className={clsx("btn d-flex flex-column align-items-center",
            value == 'ALL' ? "btn-primary" : "btn-outline-primary"
          )}
          style={{ minWidth: '120px' }}
          onClick={() => changeRating('ALL')}
        >
          All
          {/* <span className="ms-2">({totalCount})</span> */}
        </button>
      </div>
      {ratings.map((rating, index) => (
        <div key={index} className="d-flex align-items-center mb-2">
          <button
            type="button"
            className={clsx("btn d-flex flex-column align-items-center",
              value == rating.stars ? "btn-primary" : "btn-outline-primary"
            )}
            style={{ minWidth: '120px' }}
            onClick={() => changeRating(rating.stars)}
          >
            {rating.stars} Stars
            {/* <span className="ms-2">({rating.count})</span> */}
          </button>
        </div>
      ))}
    </div>
  )
}

StarRatingSelect.propTypes = {
  ratings: PropTypes.arrayOf(
    PropTypes.shape({
      stars: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired
}

export default StarRatingSelect
