import axios from 'axios';
const instance = axios.create({
    baseURL:'http://adbuy-backend.kion.tech/api'
    // baseURL:'https://ecom-react-43634.firebaseio.com/'
})

export default instance;