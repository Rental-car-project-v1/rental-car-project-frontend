import AuthForm from './AuthForm/AuthForm'

function AuthModal({ show, onClose }) {
  if (!show) return null

  return (
    <div className="modal" style={modalStyles}>
      <div className="modal-content" style={modalContentStyles}>
        <button onClick={onClose} style={closeButtonStyles}>
          &times;
        </button>
        <AuthForm onClose={onClose} />
      </div>
    </div>
  )
}

const modalStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const modalContentStyles = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '80vw',
  maxHeight: '90vh',
  overflowY: 'auto'
}

const closeButtonStyles = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  position: 'absolute',
  top: '8px',
  right: '16px',
  fontSize: '1.5rem',
  color: 'red'
}

export default AuthModal
