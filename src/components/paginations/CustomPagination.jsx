import { Pagination } from "react-bootstrap";


export default function CustomPagination({ currentPage = 1, totalPages = 1, onPageChange }) {

    const handlePageClick = (page) => {
        if (page !== currentPage && page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    }

    const renderPageNumbers = () => {
        const pages = []
        const pageNeighbors = 1

        const startPage = Math.max(2, currentPage - pageNeighbors)
        const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors)

        pages.push(
            <Pagination.Item key={1} active={currentPage === 1} onClick={() => handlePageClick(1)}>
                {1}
            </Pagination.Item>
        );

        if(totalPages > 1) {
            if (startPage > 2) {
                pages.push(<Pagination.Ellipsis key="start-ellipsis" />)
            }
    
            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <Pagination.Item key={i} active={currentPage === i} onClick={() => handlePageClick(i)}>
                        {i}
                    </Pagination.Item>
                );
            }
    
            if (endPage < totalPages - 1) {
                pages.push(<Pagination.Ellipsis key="end-ellipsis" />)
            }
    
            pages.push(
                <Pagination.Item key={totalPages} active={currentPage === totalPages} onClick={() => handlePageClick(totalPages)}>
                    {totalPages}
                </Pagination.Item>
            );
        }


        return pages;
    }

    return (
        <Pagination>
            <Pagination.First onClick={() => handlePageClick(1)}/>
            <Pagination.Prev onClick={() => handlePageClick(currentPage - 1)}/>
            {renderPageNumbers()}
            <Pagination.Next onClick={() => handlePageClick(currentPage + 1)}/>
            <Pagination.Last onClick={() => handlePageClick(totalPages)}/>
        </Pagination>
    )
}