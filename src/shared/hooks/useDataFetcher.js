import { useEffect, useState } from "react"

/**
 * 
 * @param {*} service - Promise function: Promise<DataResponse\<any>>
 * @returns {} { data, loading, error }
 */
const useDataFetcher = (service) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        try {
            const data = await service()
            setData(data)
        } catch(err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [service])

    return { data, loading, error }
}

export default useDataFetcher