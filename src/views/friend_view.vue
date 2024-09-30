<template>
    <div class="friend">
        <div class="loader" v-if="loader"></div>
        <div class="main" v-else>
            <div class="friendListBox">
                <div class="friendList" v-for="item in handleFriend.friendList" :key="item.id" :ref="`${item.id}`">
                    <img class="avatar" :src="item.avatar" alt="avatar" />
                    <div class="info">
                        <span class="name">{{ item.name }}</span>
                        <span class="username">@{{ item.username }}</span>
                        <p class="bio">{{ item.bio }}</p>
                    </div>
                    <div class="link">
                        <a :href="item.Github" target="_blank">Github</a>
                        <a :href="item.Blog" target="_blank">Blog</a>
                    </div>
                </div>
            </div>
            <div class="indicate">
                <i class="iconfont">&#xe645;</i>
            </div>
            <div class="requestFriend">
                <div class="explain">
                    <ul>
                        <li class="title">申请说明:</li>
                        <li>申请友链前请务必确保贵站有我站的友链, 若审核通过后移除本站链接, 本站也将移除友链, 并加入黑名单.</li>
                        <li>若站点长时间无法访问, 我会删除您的友链, 恢复后可再次申请.</li>
                        <li>确保您的网站不存在政治敏感问题及违法内容。没有过多的广告、无恶意软件、脚本。且转载文章须注明出处.</li>
                        <li>确保站点全局启用 HTTPS .</li>
                        <li>您需要有自己的独立域名, 暂且不同意公有子域名或免费域名的友链申请 (如 github.io, vercel.app, eu.org, js.cool, .tk, .ml, .cf 等).</li>
                        <li>暂时不同意商业及非个人的网站的友链申请.</li>
                    </ul>
                    <ul>
                        <li class="title">本站站点信息:</li>
                        <li><span>站点名称: </span>River of star Dreams</li>
                        <li><span>站点描述: </span>去码头整点薯条</li>
                        <li><span>站点头像: </span><a href="/logo.webp" download="Sooooooooooooooooootheby.webp">点击下载</a></li>
                        <li><span>站长名字: </span>Sooooooooooooooooootheby</li>
                    </ul>
                </div>
                <form @submit.prevent="handleSubmit">
                    <label for="name">
                        <span>name</span>
                        <input type="text" id="name" v-model="newFriend.name" placeholder="名字, 在25个字符内" />
                    </label>
                    <label for="username">
                        <span>username</span>
                        <input type="text" id="username" v-model="newFriend.username" placeholder="用户名, 在25个字符内, 限制英文和下划线" />
                    </label>
                    <label for="bio">
                        <span>bio</span>
                        <input type="text" id="bio" v-model="newFriend.bio" placeholder="简介" />
                    </label>
                    <label for="Github">
                        <span>Github</span>
                        <input type="text" id="Github" v-model="newFriend.github" placeholder="Github地址" />
                    </label>
                    <label for="Blog">
                        <span>Blog</span>
                        <input type="text" id="Blog" v-model="newFriend.blog" placeholder="Blog地址" />
                    </label>
                    <label for="avatar">
                        <span>avatar</span>
                        <input type="text" id="avatar" v-model="newFriend.avatar" placeholder="你的头像" />
                    </label>
                    <label for="email">
                        <span>email</span>
                        <input type="text" id="email" v-model="newFriend.email" placeholder="你的邮箱, 用于通知和重复验证." />
                    </label>
                    <button type="submit">提交!</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { friendStore } from "@/stores/friend.js";
import { gsap } from "gsap";
import { nextTick } from "vue";
import autolog from "autolog.js";

export default {
    data() {
        const friend = friendStore();
        return {
            handleFriend: friend,

            loader: true,

            newFriend: {
                name: "",
                username: null,
                bio: null,
                github: null,
                blog: null,
                avatar: null,
                email: null
            }
        };
    },
    methods: {
        loadAnimation() {
            const friendListElements = Object.values(this.$refs);
            const tl = gsap.timeline();

            friendListElements.forEach((item, index) => {
                tl.to(
                    item,
                    {
                        opacity: 1,
                        y: -100,
                        duration: 1,
                        ease: "back.out(2.5)"
                    },
                    "-=0.4"
                );
            });
        },
        formatVerification(callback) {
            const { name, username, bio, github, blog, avatar, email } = this.newFriend;

            if (!/^[\s\S]{1,25}$/.test(name)) {
                return autolog.log("名字应在25个字符以内", "error", 3000);
            }

            if (!/^[a-zA-Z_]{1,25}$/.test(username)) {
                return autolog.log("用户名应在25个字符以内, 仅允许英文字符和下划线", "error", 3000);
            }

            if (!bio) {
                return autolog.log("简介不能为空", "error", 3000);
            }

            // 验证 Github 地址 (简单验证 URL 格式)
            const urlRegex = /^(https?:\/\/)?(www\.)?github\.com\/[A-z0-9-_]+\/?$/;
            if (!urlRegex.test(github)) {
                return autolog.log("请输入有效的 Github 地址", "error", 3000);
            }

            // 验证 Blog 地址 (简单验证 URL 格式)
            if (!/^(https?:\/\/)?[A-z0-9-_]+\.[A-z]+(\/[A-z0-9-_]+)*\/?$/.test(blog)) {
                return autolog.log("请输入有效的 Blog 地址", "error", 3000);
            }

            // 验证头像地址（这里也可以使用 URL 格式）
            if (!/^(https?:\/\/)?[A-z0-9-_]+\.[A-z]+(\/[A-z0-9-_]+)*\/?.*\.(jpg|jpeg|png|gif|svg)$/.test(avatar)) {
                return autolog.log("请输入有效的头像地址", "error", 3000);
            }

            // 验证邮箱格式
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return autolog.log("请输入有效的邮箱地址", "error", 3000);
            }

            callback();
        },
        handleSubmit() {
            this.formatVerification(() => {
                this.handleFriend.requestFriend(this.newFriend);
            });
        }
    },
    mounted() {
        this.handleFriend.getFriendList(() => {
            this.$nextTick(() => {
                this.loader = false;
                nextTick(() => {
                    this.loadAnimation();
                });
            });
        });
    }
};
</script>

<style lang="scss" scoped>
@import "style/views/friend_view.scss";
</style>
