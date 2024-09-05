import clsx from 'clsx'
import { Modal } from 'react-bootstrap'
import styles from './styles.module.css'

export default function ConfirmModal({
  show = false,
  onClose = () => {},
  onConfirm = () => {},
  message = 'Are you sure?',
  title = 'Confirm',
  booking = null,
  setBooking = () => {},
  nextStatus = '',
  car = null,
  setCar = () => {}
}) {
  const handleClose = () => {
    if (onClose) onClose()
  }

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    if (booking) setBooking({ ...booking, status: nextStatus })
    if (car) {
      if (!car.isStopped) setCar({ ...car, isStopped: true })
      else setCar({ ...car, isStopped: false })
    }
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center">{message}</p>
      </Modal.Body>
      <Modal.Footer className="p-0">
        <div className="btn-group m-0 w-100" role="group">
          <button
            type="button"
            className={clsx('m-0 btn border-end', styles.btn_footer_modal)}
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={clsx('m-0 btn', styles.btn_footer_modal)}
            onClick={handleConfirm}
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
