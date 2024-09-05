import { IoStarHalf } from 'react-icons/io5'
import ReactStars from 'react-rating-stars-component'

function roundValue(value) {
  const fractionalPart = value % 1
  if (fractionalPart > 0.25 && fractionalPart < 0.75) {
    return Math.floor(value) + 0.5
  }
  return Math.round(value)
}

function StarRating({ value, size }) {
  const roundedValue = roundValue(value)

  return (
    <ReactStars
      count={5}
      value={roundedValue}
      size={size}
      isHalf={true}
      halfIcon={<IoStarHalf />}
      activeColor="#ffd700"
      edit={false}
    />
  )
}

export default StarRating
