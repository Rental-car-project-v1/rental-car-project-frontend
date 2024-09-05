export default function EmptyState({content = "There is no data to display."}) {

    return (
        <div className="h-100 d-flex justify-content-center align-items-center py-5 text-secondary">
            {content}
        </div>
    )
}