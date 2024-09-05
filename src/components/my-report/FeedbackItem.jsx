import { formatDateTime } from "../../shared/utils"
import StarRating from "../StarRating"
import placeHolderImg from "../../assets/placeholder.png"

export default function FeedbackItem({feedback}) {

    return (
        <div className="card mb-3 p-4">
            <div className="row align-items-center">
                <div className="col-10">
                    <div className="d-flex align-items-center gap-4 mb-3">
                        <img
                        style={{
                            height: '60px',
                            width: '60px',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            borderRadius: '50%'
                        }}
                        src={feedback?.avatar || placeHolderImg}
                        />
                        <span>{feedback?.username}</span>
                    </div>
                    <p>{feedback?.content}</p>
                </div>
                <div className="col-2 d-flex flex-column align-items-center">
                    <StarRating value={feedback?.rating} size={28} />
                    <p>{formatDateTime(feedback?.createdAt)}</p>
                </div>
            </div>
            <div className="d-flex mt-4">
                <div>
                    <img
                        src={feedback?.carImage?.[0] ?? img}
                        alt={feedback?.carName}
                        style={{
                        height: '180px',
                        width: '180px',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        borderRadius: '8px'
                        }}
                    />
                </div>
                <div className="ms-5">
                    <h4 className="card-title">{feedback?.carName}</h4>
                    <ul>
                        <li>From: {formatDateTime(feedback?.startDateTime)}</li>
                        <li>To: {formatDateTime(feedback?.endDateTime)}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}