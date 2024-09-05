import FeedbackItem from "./FeedbackItem"

export default function FeedbackList({feedbacks = []}) {

    return (
        <>
            {feedbacks.map((item, index) => 
                  <FeedbackItem feedback={item} key={index}/>
            )}
        </>
    )
}