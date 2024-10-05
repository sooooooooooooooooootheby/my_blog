<template>
    <div class="about">
        <div class="info">
            <div class="info_main">
                <div class="info_main_introduce">
                    <p class="info_main_introduce_title1" ref="title1">{{ hello }}.👋</p>
                    <p class="info_main_introduce_title2" ref="title2">I'm</p>
                    <p ref="p1">我是一名大学生, 专业是计算机网络技术, 目前正在备考25年专升本考试, 主学的是前端开发(Vue.js), 偶尔还会研究网络攻防.🚀</p>
                    <p ref="p2">关于我的名字, 来自于我喜欢的游戏角色, 《重返未来:1999》中的苏芙比. 至于为什么会有这么多o, 那是因为<a href="https://elgoog.hk/goooooooooooooooooogle/">谷歌弹簧</a>(笑.🌈</p>
                </div>
                <div class="info_main_avatar">
                    <div class="info_main_avatar_bg" ref="avatarBg"></div>
                    <img src="/logo.webp" alt="logo" />
                </div>
            </div>
            <div class="info_indicate" ref="indicate">
                <i class="iconfont">&#xe645;</i>
            </div>
        </div>
        <div class="aboutme">
            <span class="aboutme_title" ref="aboutMeTitle">About me</span>
            <ul class="aboutme_ul aboutme_link" ref="aboutMeUl0">
                <li class="aboutme_ul_title">contact</li>
                <li class="aboutme_ul_li">
                    <a href="https://github.com/sooooooooooooooooootheby" target="_blank">Github</a>
                </li>
                <li class="aboutme_ul_li" @click="this.$copyText('sooooooooooooooooootheby@gmail.com')">Gmail</li>
            </ul>
            <ul v-for="(item, index) in aboutme" :key="index" class="aboutme_ul" ref="aboutMeUl1">
                <li class="aboutme_ul_title">
                    {{ item.title }}
                </li>
                <li v-for="(item, index) in item.list" :key="index" class="aboutme_ul_li">
                    {{ item }}
                </li>
            </ul>
            <ul class="aboutme_ul" ref="aboutMeUl2">
                <li class="aboutme_ul_title">Github Chart</li>
                <li class="aboutme_ul_card">
                    <img src="https://ghchart.rshah.org/849476/sooooooooooooooooootheby" alt="sooooooooooooooooootheby's Github chart" class="aboutme_ul_card_Github_chart" />
                </li>
            </ul>
            <ul class="aboutme_ul" ref="aboutMeUl3">
                <li class="aboutme_ul_title">Education</li>
                <li class="aboutme_ul_card">
                    <p class="aboutme_ul_card_Education_name">广西机电职业技术学院</p>
                    <p class="aboutme_ul_card_Education_major">计算机网络技术</p>
                    <p class="aboutme_ul_card_Education_time">2022 ~ now</p>
                    <img src="/gxcme.webp" alt="school badge" class="aboutme_ul_card_Education_school_badge" />
                </li>
            </ul>
        </div>
        <div class="reaction">
            <span class="reaction_title">What do you think of my website?</span>
            <reaction :emojiListPath="'https://blog.sooooooooooooooooootheby.top/emoji.json'" :emojiRequest="'https://cos.sooooooooooooooooootheby.top/emoji/'" :id="0" :request="'https://blog.sooooooooooooooooootheby.top/api/'" />
        </div>
    </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import reaction from "@/components/reaction.vue";

export default {
    components: {
        reaction
    },
    data() {
        return {
            hello: "hello",
            title: ["你好", "안녕하세요", "Bonjour", "Hallo", "Привет", "こんにちは", "ciallo", "hello"],
            link: [
                {
                    a: "https://github.com/sooooooooooooooooootheby",
                    title: "Github"
                },
                {
                    a: "sooooooooooooooooootheby@gmail.com",
                    title: "Gmail"
                }
            ],
            aboutme: [
                {
                    title: "Web",
                    list: ["HTML", "CSS", "JavaScript", "Vue.js", "Sass", "GSAP", "Node.js"]
                },
                {
                    title: "Programming",
                    list: ["C", "Kotlin", "MySql"]
                },
                {
                    title: "Tool",
                    list: ["VSCode", "Navicat", "Photoshop"]
                }
            ]
        };
    },
    methods: {
        // 动画
        titleAnimation() {
            const timeline = gsap.timeline({ repeat: -1 });

            this.title.forEach((text) => {
                timeline
                    .to(this.$refs.title1, {
                        duration: 1,
                        opacity: 0,
                        onComplete: () => {
                            this.hello = text;
                        }
                    })
                    .to(this.$refs.title1, {
                        duration: 1,
                        opacity: 1
                    })
                    .to({}, { duration: 6 });
            });
        },
        entranceAnimation() {
            const elements = [this.$refs.title1, this.$refs.title2, this.$refs.p1, this.$refs.p2];

            const timeline = gsap.timeline();

            elements.forEach((el) => {
                timeline.to(el, {
                    y: -200,
                    opacity: 1,
                    duration: 1,
                    ease: "back.out(2.5)"
                });
            });

            timeline.to(this.$refs.avatarBg, {
                width: 250,
                height: 250
            });
        },
        scrollTriggerAnimation() {
            const elements = [this.$refs.aboutMeTitle, this.$refs.aboutMeUl0, this.$refs.aboutMeUl1, this.$refs.aboutMeUl2, this.$refs.aboutMeUl3];

            const timeline = gsap.timeline();
            const aboutmeUl = this.$refs.indicate;

            elements.forEach((el) => {
                timeline.to(el, {
                    scrollTrigger: {
                        trigger: aboutmeUl,
                        start: "top center",
                        scrub: true
                    },
                    y: -200,
                    opacity: 1,
                    duration: 1
                });
            });
        }
    },
    mounted() {
        this.entranceAnimation();
        setTimeout(() => {
            this.titleAnimation();
        }, 4000);
        this.scrollTriggerAnimation();
        // 禁用 console.warn
        const originalWarn = console.warn;
        console.warn = () => {};
    }
};
</script>

<style lang="scss" scoped>
@import url("style/views/about_view.scss");
</style>
