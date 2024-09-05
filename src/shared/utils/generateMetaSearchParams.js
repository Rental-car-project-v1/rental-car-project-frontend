/**
 * @param page Number - current page
 * @param size Number - Number of items per page
 * @param sortType String - id:desc
 */
const generateMetaSearchParams = (page, size, sortType) => {

    const searchQueries = {
        currentPage: 1,
        pageSize: 5,
        sortField: 'id',
        sortDir: 'desc'
      }
    
      if (page) searchQueries.currentPage = page <= 0 ? 0 : page - 1
    
      if (size) searchQueries.pageSize = size
    
      const [sortField, sortDir] = sortType.split(':')
    
      if(sortField) searchQueries.sortField = sortField
    
      if(sortDir) searchQueries.sortDir = sortDir
    
      const searchParams = new URLSearchParams(searchQueries).toString()

      return searchParams
}

export default generateMetaSearchParams