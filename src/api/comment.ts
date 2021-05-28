import axios from './config';

export default {
    add: (id: string, content: string) => axios({
        method: 'post',
        url: `comment/${id}`,
        data: {
            content
        }
    }),
    list: (id: string) => axios.get(`comment/all/${id}`)
}