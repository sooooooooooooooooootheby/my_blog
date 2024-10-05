<template>
    <div class="article">
        <div class="track empty"></div>
        <div class="main">
            <div class="cover" v-if="isLoading">
                <img :src="handleArticle.articleData.articleCover" alt="background image" />
            </div>
            <div class="info" v-if="isLoading">
                <p class="brief">{{ handleArticle.articleData.article.brief }}</p>
                <div class="author">
                    <div class="text">
                        <p>create: {{ handleTime(handleArticle.articleData.article.create_time) }}</p>
                        <p v-if="updateTime">update: {{ handleTime(handleArticle.articleData.article.update_time) }}</p>
                    </div>
                </div>
            </div>

            <reaction :emojiListPath="'https://blog.sooooooooooooooooootheby.top/emoji.json'" :emojiRequest="'https://cos.sooooooooooooooooootheby.top/emoji/'" :id="id" :request="'https://blog.sooooooooooooooooootheby.top/api/'" />

            <div class="content" v-html="compiledMarkdown"></div>

            <div class="tag" v-if="isLoading">
                <span v-for="(tag, index) in handleTag(handleArticle.articleData.article.tag)" :key="index">
                    {{ tag }}
                </span>
            </div>
        </div>
        <div class="track">
            <div class="trackBox">
                <div class="toc" v-html="tocHtml"></div>
                <div class="schedule">
                    <div class="ring"></div>
                    <span>
                        {{ scrollProgress }}%
                        <span :class="{ back: !isTop10 }" @click="scrollToTop"> 回到顶部</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { articleStore } from "@/stores/article.js";
import axios from "axios";
import markdownIt from "markdown-it";
import markdownItHighlightjs from "markdown-it-highlightjs";
import markdownItAnchor from "markdown-it-anchor";
import markdownItTocDoneRight from "markdown-it-toc-done-right";
import mili from "markdown-it-linkify-images";
import { imgLazyload } from "@mdit/plugin-img-lazyload";
import reaction from "@/components/reaction.vue";

export default {
    components: {
        reaction
    },
    props: ["id"],
    data() {
        const article = articleStore();
        return {
            handleArticle: article,

            isLoading: false,
            compiledMarkdown: "",

            name: null,
            throttledClickMeme: null,
            inThrottle: false,
            isMemeList: false,

            updateTime: true,

            toc: [],
            tocHtml: "",
            scrollProgress: 0,
            isTop10: false
        };
    },
    methods: {
        // 请求文章数据
        async getArticle() {
            try {
                await this.handleArticle.getArticle({ id: this.id });
                this.isLoading = !this.isLoading;
                this.renderArticle(this.handleArticle.articleData.articleUrl);
            } catch (error) {
                console.error(error);
            }
        },
        // 请求文章内容并渲染
        async renderArticle(url) {
            // 创建实例并加载插件
            const md = markdownIt();
            md.use(markdownItHighlightjs);
            md.use(imgLazyload);
            md.use(markdownItAnchor, {
                permalink: false,
                permalinkBefore: false
            });
            md.use(markdownItTocDoneRight, {
                callback: (html) => {
                    this.tocHtml = html;
                }
            });
            md.use(mili, {
                target: "_blank"
            });

            // 请求文章
            try {
                const res = await axios.get(url);
                const markdownContent = res.data;
                this.compiledMarkdown = md.render(markdownContent);
            } catch (error) {
                console.error(error);
            }
        },
        handleTime(time) {
            if (time === null) {
                this.updateTime = false;
                return;
            }

            // 使用Date对象解析ISO 8601格式的时间戳
            const date = new Date(time);

            // 解析时间
            const months = date.getMonth();
            const day = date.getDate();
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, "0"); // 确保两位数
            const minutes = date.getMinutes().toString().padStart(2, "0"); // 确保两位数
            const seconds = date.getSeconds().toString().padStart(2, "0"); // 确保两位数

            // 将月份转换为缩写格式
            const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthArray[months];

            // 返回格式化的时间字符串
            return `${month} ${day}, ${year}  ${hours}:${minutes}:${seconds}`;
        },
        handleTag(tag) {
            const tagList = tag.split(",");
            for (let i = 0; i < tagList.length; i++) {
                tagList[i] = `#${tagList[i]}`;
            }
            return tagList;
        },
        handleScroll() {
            const scrollTop = window.scrollY;

            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const scrollableHeight = documentHeight - windowHeight;

            const scrollProgress = (scrollTop / scrollableHeight) * 100;

            this.scrollProgress = Math.trunc(scrollProgress);
            this.isTop10 = scrollProgress > 10 ? true : false;
        },
        scrollToTop() {
            if ("scrollBehavior" in document.documentElement.style) {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            } else {
                window.scrollTo(0, 0);
            }
        }
    },
    mounted() {
        this.getArticle();
        this.scrollToTop();
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>

<style lang="scss" scoped>
@import url("style/views/article_page_view.scss");
</style>
