export const formatDate = (date) =>
  new Date(date).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

export const formatDateTime = (date) =>
  new Date(date).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
    // second: '2-digit'
  })

export const formatDateValueForInput = (timestamp) => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Thêm 1 vì getMonth() trả về giá trị từ 0-11
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}
