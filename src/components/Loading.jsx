import { Spinner } from 'react-bootstrap'

function Loading() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '80vh' }}
    >
      <Spinner animation="border" variant="primary" />
    </div>
  )
}

export default Loading
