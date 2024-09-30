<template>
    <div class="article">
        <div class="loader" v-if="loader"></div>
        <div class="main" v-else>
            <div class="list">
                <ul class="articleList">
                    <li v-for="(item, index) in handleArticle.articleList" :key="index" :ref="`list${index}`">
                        <div>
                            <router-link :to="`/article/${item.id}`">
                                <div class="title">
                                    <span class="titleText">{{ item.title }}</span>
                                </div>
                                <div class="info">
                                    <div class="tagList">
                                        <span v-for="(tag, index) in handleTag(item.tag)" :key="index" class="tag">
                                            {{ tag }}
                                        </span>
                                    </div>
                                    <span class="time">{{ handleTime(item.create_time) }}</span>
                                </div>
                            </router-link>
                        </div>
                    </li>
                </ul>
                <ul class="paging" ref="paging">
                    <li v-for="item in page" :key="item" @click="redirect(item)" :class="{ isThis: item === currentPage }">
                        {{ item }}
                    </li>
                </ul>
            </div>
            <div class="overview">
                <p class="articleCount">
                    <span>{{ handleArticle.total }}</span> 篇文章.
                </p>
                <div class="classes">
                    <li class="title"><span>C</span>lasses</li>
                    <li class="item" v-for="(item, index) in handleArticle.articleClass" :key="index" @click="throttleSelectClass(item.class)">
                        {{ item.class }}
                    </li>
                    <li class="item" @click="getArticleList(this.start, this.currentPage)">all</li>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { articleStore } from "@/stores/article.js";
import { gsap } from "gsap";

export default {
    data() {
        const article = articleStore();
        return {
            handleArticle: article,
            loader: true,

            page: [],
            start: 0,
            currentPage: "1",

            throttledLikes: null,
            classname: null
        };
    },
    methods: {
        // 处理标签
        handleTag(tag) {
            const tagList = tag.split(",");
            for (let i = 0; i < tagList.length; i++) {
                tagList[i] = `#${tagList[i]}`;
            }
            return tagList;
        },
        // 处理时间
        handleTime(time) {
            // 使用Date对象解析ISO 8601格式的时间戳
            const date = new Date(time);

            // 获取月日年
            const months = date.getMonth();
            const day = date.getDate();
            const year = date.getFullYear();

            // 将月份转换为缩写格式
            const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthArray[months];

            return `${month}${day} ${year}`;
        },
        // 右边的动画
        listAnimation() {
            const timeline = gsap.timeline({ delay: 1 });
            const friendListElements = Object.values(this.$refs);
            friendListElements.forEach((item, index) => {
                const listItem = this.$refs[`list${index}`];
                timeline.to(
                    listItem,
                    {
                        opacity: 1,
                        y: -100,
                        duration: 1,
                        ease: "back.out(2.5)"
                    },
                    "-=0.8"
                );
            });
            timeline.to(this.$refs.paging, {
                opacity: 1
            })
        },
        // 请求文章列表
        getArticleList(start, page) {
            this.handleArticle.getArticleList({ start, count: 5 }, () => {
                // 修改loader的状态
                this.loader = false;
                // 动画
                this.$nextTick(() => {
                    this.listAnimation();
                });
                // 处理分页
                const totalPages = Math.ceil(this.handleArticle.total / 5);
                this.page = Array.from({ length: totalPages }, (v, i) => (i + 1).toString());
                this.currentPage = page;
            });
        },
        // 点击分页
        redirect(page) {
            this.start = (page - 1) * 5;
            this.currentPage = page;
            this.getArticleList(this.start, page);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
        // 请求指定分类文章
        // 节流函数
        throttle(func, limit) {
            let inThrottle;
            return function () {
                const context = this;
                const args = arguments;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => (inThrottle = false), limit);
                }
            };
        },
        // 暴露接口
        throttleSelectClass(classname) {
            this.classname = classname;
            this.throttledLikes();
        },
        // 请求对应分类的文章
        selectClass() {
            this.page = [];
            this.start = 0;
            this.handleArticle.getArticleClassList({
                classname: this.classname,
                start: this.start,
                count: 5
            });
        }
    },
    mounted() {
        // 请求所有文章
        this.getArticleList(this.start, this.currentPage);
        // 请求所有的分类
        this.handleArticle.getArticleClass();
        // 请求指定分类文章的节流函数
        this.throttledLikes = this.throttle(this.selectClass, 1000);
    },
};
</script>

<style lang="scss" scoped>
@import url("style/views/article_view.scss");
</style>
