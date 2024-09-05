export default function LoadingState({content = ''}) {

    return (
        <div className="h-100 d-flex justify-content-center align-items-center py-5 text-secondary">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            {content}
        </div>
    )
}