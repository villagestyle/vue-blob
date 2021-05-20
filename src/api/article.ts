import axios from './config';

export default {
    /** 新增文章 */
    add: (data: ArticleEdit) => axios({
        method: 'post',
        url: `article`,
        data
    }),
    /** 修改文章 */
    edit: (id: string, data: ArticleEdit) => axios({
        method: 'put',
        url: `article/${id}`,
        data
    }),
    /** 分页获取文章 */
    page: (data: ArticleScreen) => axios({
        method: 'post',
        url: `article/page`,
        data
    }),
    /** 获取文章 */
    info: (id: string) => axios.get(`article/${id}`),
    /** 删除文章 */
    remove: (id: string) => axios.delete(`article/${id}`)
}

export interface ArticleEdit {
    action: 0 | 1,
    title: string;
    content: string;
}

export interface ArticleScreen {
    action?: 0 | 1,
    name?: string;
    creUserId?: string;
    pageNum: number;
    rows: number;
}