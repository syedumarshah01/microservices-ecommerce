import {format} from 'date-fns'

const logger = (req, res, next) => {
    console.log(`${req.method} ${format(new Date(), 'dd/MM/yy hh:mm:ss')}`)
    next()
}


export default logger

