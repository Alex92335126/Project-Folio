import { format } from 'date-fns'

export default function formatData(data) {
    let arrList = []
    const dataLength = data.c.length
    for(let i=0; i < dataLength; i++) {
        let object = {
            value: data.c[i],
            date: format(new Date(data.t[i] * 1000), "d MMM, yyyy")
        }
        arrList.push(object)
    }
    return arrList
}