import moment from 'moment';
const formatMessage = (userName, text) => {
    return {
        userName,
        text,
        time : moment().format('h:mm a'),
    }
}   

export {formatMessage};