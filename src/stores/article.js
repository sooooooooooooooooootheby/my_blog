import { defineStore } from "pinia";
import axios from "axios";

export const articleStore = defineStore({
    id: "article",
    store: () => {
        return {
            // 文章分类
            articleClass: [],
            // 文章列表
            articleList: [],
            // 文章总数
            total: 0,
            // 文章数据
            articleData: "",
            // 表情列表
            memeList: [],
            // 文章表情列表
            memeCountList: []
        };
    },
    actions: {
        // 获取文章分类
        async getArticleClass() {
            try {
                const res = await axios.get(`/article/getArticleClass`);
                this.articleClass = res.data;
            } catch (error) {
                console.error(error);
            }
        },
        // 获取文章列表
        async getArticleList(params, callback) {
            try {
                const res = await axios.get(`/article/getArticleList`, { params });
                this.articleList = res.data.articles;
                this.total = res.data.total;
                callback();
            } catch (error) {
                console.error(error);
            }
        },
        // 获取指定分类的文章列表
        async getArticleClassList({ classname, start, count }) {
            try {
                const res = await axios.get(`/article/getArticleClassList`, {
                    params: {
                        classname,
                        start,
                        count
                    }
                });
                this.articleList = res.data.articles;
                this.total = res.data.total;
            } catch (error) {
                console.error(error);
            }
        },
        // 获取文章
        async getArticle({ id }) {
            try {
                const res = await axios.get(`/article/getArticle`, {
                    params: {
                        id
                    }
                });
                this.articleData = res.data;
            } catch (error) {
                console.error(error);
            }
        },
        // 获取文章表情
        async getArticleMeme() {
            try {
                const res = await axios.get(`/article/getArticleMeme`);
                this.memeList = res.data;
            } catch (error) {
                console.error(error);
            }
        },
        // 查询文章的表情
        async getArticleMemeCount({ id }) {
            try {
                const res = await axios.get(`/article/getArticleMemeCount`, {
                    params: {
                        id
                    }
                });
                this.memeCountList = res.data;
            } catch (error) {
                console.error(error);
            }
        },
        // 点表情
        async clickMeme(meme, id) {
            try {
                const res = await axios.post(`/article/clickMeme`, { meme, id });
                this.memeCountList = res.data;
            } catch (error) {
                console.error(error);
            }
        }
    }
});
