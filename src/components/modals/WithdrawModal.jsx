import clsx from "clsx"
import { currencyFormat } from "../../shared/utils"
import styles from './styles.module.css'
import { Modal } from "react-bootstrap"
import { MULTIPLIED_AMOUNT } from '../../shared/constants'

export default function WithdrawModal({currentBalance = 0, show = false, onClose = () => {}}) {

    const handleClose = () => {
        if(onClose) onClose()
    }

    const handleClick = () => {
        handleClose()
        alert("Please contact your operator to withdraw money from your wallet.")
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header className="d-flex justify-content-center">
                <Modal.Title>Withdraw</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-center mb-3">
                    Your current balance is {currencyFormat(currentBalance * MULTIPLIED_AMOUNT, 'VND', false)} VND. Please
                    select the amount to withdraw from your wallet.
                </p>
                <div className="d-flex justify-content-center">
                    <select className="form-select w-content" aria-label="Select price">
                        <option value="0" selected>2.000.000</option>
                        <option value="1">5.000.000</option>
                        <option value="2">10.000.000</option>
                        <option value="3">All balance</option>
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