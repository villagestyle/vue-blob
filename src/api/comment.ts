import axios from './config';

export default {
    add: (id: string, content: string) => axios({
        method: 'post',
        url: `comment/${id}`,
        data: {
            content
        }
    }),
    list: (id: string) => axios.get(`comment/all/${id}`),
    page: (data: CommentPageScreen) => axios({
        method: 'post',
        url: `comment/page`,
        data
    }),
    remove: (id: string) => axios.delete(`comment/${id}`)
}

export interface CommentPageScreen {
    rows: number;
    pageNum: number;
    articleId?: string;
}