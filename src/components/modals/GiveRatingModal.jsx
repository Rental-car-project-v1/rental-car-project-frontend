import { toast } from 'react-toastify'
import { addFeedbackApi } from '../../shared/apis/feedbackApi'
import styles from './styles.module.css'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import clsx from 'clsx'
import ReactStars from 'react-rating-stars-component'

export default function GiveRatingsModal({bookingId, show = false, onClose = () => {} }) {

    const [star, setStar] = useState(0)
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)

    const handleClose = () => {
        if(onClose) onClose()
    }

    const handleSendReview = () => {
        if(star === 0) {
            toast.error('Please select number of stars!')
            return
        }

        if(!content) {
            toast.error('Please enter review content!')
            return
        }

        setLoading(true)
        addFeedbackApi(bookingId, {rating: star, content}).then((data) => {
            toast.success(data?.message ?? 'Thank you for your feedback!')
            handleClose()
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header className="d-flex justify-content-center">
                <Modal.Title>Rate your trip</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-center mb-1">Do you enjoy your trip, please let us know what you think.</p>
                <div className="row">
                    <div className="col-12 mb-2">
                        <div className="d-flex justify-content-center">
                            <ReactStars
                                value={star}
                                count={5}
                                onChange={value => setStar(value)}
                                size={28}
                                activeColor="#ffd700"
                            />
                        </div>
                    </div>
                    <div className="col-12 mb-2">
                        <div className="d-flex justify-content-center">
                            <textarea
                                name=""
                                className="form-control"
                                id=""
                                rows={5}
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                                placeholder="Enter your review for the trip."
                            ></textarea>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="p-0">
                <div
                    className="btn-group m-0 w-100"
                    role="group"
                >
                    <button
                        type="button"
                        className={clsx('m-0 btn border-end',
                            styles.btn_footer_modal,
                            loading ? 'disabled' : ''
                        )}
                        onClick={handleClose}
                    >
                        Skip
                    </button>
                    <button
                        type="button"
                        className={clsx('m-0 btn',
                            styles.btn_footer_modal,
                            loading ? 'disabled' : ''
                        )}
                        onClick={handleSendReview}
                    >
                        Send Review
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}