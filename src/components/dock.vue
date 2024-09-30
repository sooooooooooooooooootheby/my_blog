<template>
    <div class="dock">
        <!-- 站点信息 -->
        <div class="siteInfo">
            <img src="/logo_small.webp" alt="" class="siteInfoLogo" />
            <i class="iconfont" @click="isDockMenu = !isDockMenu">&#xe64e;</i>
        </div>
        <!-- 处于文章页时的文章信息 -->
        <div class="articleInfo" v-if="handleArticle.articleData && isArticlePage">
            <p class="breadcrumb">{{ handleArticle.articleData.article.class }} / {{ handleArticle.articleData.article.tag }}</p>
            <p class="title">{{ handleArticle.articleData.article.title }}</p>
        </div>
        <!-- 导航 -->
        <div :class="{dockMenu: true, showDockMenu: isDockMenu}" ref="dockMenu">
            <ul class="dockMainMenu">
                <li :class="{ dockMenuItem: true, tintText: isMore }" v-for="(item, index) in menuItem" :key="index" @click="pageJump(item.text)" @mouseover="isMore = false">
                    <i class="iconfont" v-html="item.icon"></i>
                    <span>{{ item.text }}</span>
                </li>
                <div class="dockMenuItem dockMenuItemMore" @mouseover="isMore = true">
                    <i class="iconfont">&#xe648;</i>
                </div>
            </ul>
            <div :class="{ dockSubmenu: true, showDockSubmenu: isMore }">
                <div class="dockSubmenuContent">
                    <ul class="dockSubmenuItemList">
                        <li class="dockSubmenuItemListItem" @click="pageJump('wish')">
                            <img src="/card1.webp" alt="card" />
                            <span>my wish</span>
                        </li>
                        <li class="dockSubmenuItemListItem" @click="pageJump('target')">
                            <img src="/card2.webp" alt="card" />
                            <span>my target</span>
                        </li>
                        <li class="dockSubmenuItemListItem" @click="pageJump('target')">
                            <a href="https://github.com/sooooooooooooooooootheby/sooooooooooooooooootheby/issues/new" target="_blank">
                                <img src="/card3.webp" alt="card" />
                                <span>message board</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="dockSubmenuBackground" @mouseover="isMore = false"></div>
            </div>
        </div>
        <!-- 控件 -->
        <div class="dockControl">
            <!-- 开往 -->
            <div class="control_item">
                <a href="https://www.travellings.cn/go.html" target="_blank" rel="noopener" title="开往-友链接力">
                    <i class="iconfont">&#xe646;</i>
                </a>
            </div>
            <!-- 主题切换 -->
            <div class="control_item theme">
                <div class="button" @click="cutTheme">
                    <i class="iconfont" v-if="isTheme === 0">&#xe635;</i>
                    <i class="iconfont" v-else-if="isTheme === 1">&#xe636;</i>
                    <i class="iconfont" v-else-if="isTheme === 2">&#xe637;</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { articleStore } from "@/stores/article.js";
import router from "@/router";
import { gsap } from "gsap";

export default {
    data() {
        const article = articleStore();
        return {
            handleArticle: article,
            menuItem: [
                {
                    text: "about",
                    icon: "&#xe64d;"
                },
                {
                    text: "article",
                    icon: "&#xe64a;"
                },
                {
                    text: "friend",
                    icon: "&#xe64c;"
                }
            ],
            isMore: false,
            isTheme: 0,
            isDockMenu: false,
        };
    },
    methods: {
        // 跳转
        pageJump(to) {
            if (to === "about") {
                router.push("/");
                return;
            }
            router.push("/" + to);
        },
        // 切换主题
        cutTheme() {
            // 切换 `isTheme` 的值
            this.isTheme = (this.isTheme + 1) % 3;
            // 根据 `isTheme` 的值选择一个主题
            let theme = ["light", "dark", "auto"][this.isTheme];

            // 如果选择的是 "auto" 模式
            if (theme === "auto") {
                // 使用 `window.matchMedia` 检查系统的配色方案是亮色还是暗色并设置主题
                const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
                theme = systemTheme.matches ? "dark" : "light";
            }

            // 设置主题
            window.document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("data-theme", theme);
        },
        readLocalTheme() {
            const theme = localStorage.getItem("data-theme");
            if (theme !== null) {
                window.document.documentElement.setAttribute("data-theme", theme);
            }
        }
    },
    computed: {
        isArticlePage() {
            return this.$route.path.startsWith("/article/");
        }
    },
    watch: {
        $route(to, from) {
            this.isDockMenu = false;
        }
    }
};
</script>

<style lang="scss" scoped>
@import url("style/components/dock.scss");
</style>
