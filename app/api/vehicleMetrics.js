import { format } from 'date-fns'
import { fetchData } from '../utils'

export const fetchDailyRoadTaken = async (id, setState) => {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - 1)

    const response = await fetchData(
        `/analyze/distance/${id}?beginDate=${format(start, 'yyyy-MM-dd')}&endDate=${format(start, 'yyyy-MM-dd')}`
    )
    console.log(response)
}
