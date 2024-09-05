import clsx from "clsx"
import styles from './styles.module.css'
import { Modal } from "react-bootstrap"

export default function WithdrawModal({currentBalance = 0, show = false, onClose = () => {}}) {

    const handleClose = () => {
        if(onClose) onClose()
    }

    const handleClick = () => {
        handleClose()
        alert("Please contact your operator to top-up money to your wallet.")
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header className="d-flex justify-content-center">
                <Modal.Title>Top-up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-center mb-3">
                    Please select the amount to top-up to your wallet.
                </p>
                <div className="d-flex justify-content-center">
                    <select className="form-select w-content" aria-label="Select price">
                        <option value="0" selected>2.000.000</option>
                        <option value="1">5.000.000</option>
                        <option value="2">10.000.000</option>
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <div className="btn-group m-0 w-100"  role="group">
                    <button type="button" className={clsx("m-0 btn border-end", styles.btn_footer_modal)} onClick={handleClose}>Cancel</button>
                    <button type="button" className={clsx("m-0 btn", styles.btn_footer_modal)} onClick={handleClick}>Ok</button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}