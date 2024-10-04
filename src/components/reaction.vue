<template>
    <div class="reaction">
        <ul class="reactionList">
            <li class="reactionSwitch">
                <label for="reactionSwitch">
                    <img
                        data-v-ce9c30e6=""
                        src="https://cos.sooooooooooooooooootheby.top/emoji/SothebyTehe.png"
                        class="emojiSwitch"
                        alt="emojiSwitch"
                    />
                    <input type="checkbox" id="reactionSwitch" @click="isMenu = !isMenu" />
                </label>
            </li>
            <li
                :class="{ reactionItem: true, userClick: judgeUserClick(item.emoji) }"
                v-for="(item, index) in articleList"
                :key="index"
                @click="throttledClickEmoji({ emoji: item.emoji })"
            >
                <img
                    :src="'https://cos.sooooooooooooooooootheby.top/emoji/' + item.emoji + '.png'"
                    :alt="item.emoji"
                />
                <span>{{ item.emoji_count }}</span>
            </li>
        </ul>
        <div :class="{ reactionMenu: true, showMenu: !isMenu, hideMenu: isMenu }">
            <div
                class="emojiSlot"
                v-for="(item, index) in emojiList"
                :key="index"
                @click="throttledClickEmoji({ file: item.file })"
            >
                <img :src="item.url" :alt="item.file" class="emojiItem" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props: ["emojiListPath", "articleID", "request"],
    data() {
        return {
            emojiList: [],
            articleList: [],
            userClick: [],
            isMenu: false,
            throttledClickEmoji: null
        };
    },
    methods: {
        // 获取文章的emoji
        async getArticleEmoji() {
            try {
                const res = await axios.get(`/article/getArticleEmoji`, {
                    params: {
                        id: this.articleID
                    }
                });
                this.articleList = res.data.articleEmoji;
                if (res.data.userClick.length != 0) {
                    this.userClick = res.data.userClick[0].user_click;
                }
            } catch (error) {
                console.error("获取文章emoji列表出错:" + error);
            }
        },
        // 读取emoji列表
        async readEmojiList() {
            try {
                const res = await axios.get(this.emojiListPath);
                this.emojiList = res.data;
            } catch (error) {
                console.error("获取emoji列表出错:" + error);
            }
        },
        // 判断当前emoji是否为用户选择的
        judgeUserClick(emoji) {
            return this.userClick === emoji ? true : false;
        },
        // 节流函数
        throttle(func, limit) {
            return function () {
                const context = this;
                const args = arguments;
                if (!this.inThrottle) {
                    func.apply(context, args);
                    this.inThrottle = true;
                    setTimeout(() => (this.inThrottle = false), limit);
                }
            };
        },
        // 用户点击emoji
        async userClickEmoji({ emoji, file }) {
            if (file) {
                emoji = file.split("/")[1].split(".")[0];
            }

            const action = this.judgeUserClick(emoji) ? "del" : "add";

            try {
                const res = await axios.post(`/article/userClickEmoji`, {
                    id: this.articleID,
                    type: action,
                    emoji: emoji
                });
                this.getArticleEmoji();
            } catch (error) {
                console.error("操作出错:" + error);
            }
        }
    },
    mounted() {
        this.getArticleEmoji();
        this.readEmojiList();
        this.throttledClickEmoji = this.throttle(this.userClickEmoji, 1000);
    }
};
</script>

<style scoped>
.reaction {
    width: 600px;
    position: relative;
    user-select: none;
}

.reactionList {
    display: flex;
    flex-wrap: wrap;
}

.reaction li {
    margin-right: 6px;
    margin-bottom: 6px;
    padding: 4px 6px;
    list-style: none;
    background-color: #ebebebbf;
    border-radius: 12px;
}

.reactionSwitch {
    width: 32px;
    height: 32px;
    padding: none;
}
.reactionSwitch label {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.reactionSwitch label .emojiSwitch {
    width: 24px;
    height: 24px;
    border-radius: 12px;
}

.reactionSwitch label input {
    display: none;
}

.reactionItem {
    display: flex;
    justify-content: center;
    align-items: center;
}

.userClick {
    background-color: #839476 !important;
}

.reactionItem img {
    width: 20px;
    height: 20px;
    margin: 0 4px;
}
.reactionItem span {
    margin: 0 4px;
}

.reactionMenu {
    padding: 12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #ebebebbf;
    border-radius: 12px;
    position: absolute;
    top: 48px;
    transition: 0.3s ease;
    overflow: hidden;
}

.showMenu {
    height: 0;
    opacity: 0;
}

.hideMenu {
    height: auto;
    opacity: 1;
}

.emojiSlot {
    width: 48px;
    height: 48px;
    margin: 4px;
}

.emojiItem {
    width: 100%;
    height: 100%;
}

@media screen and (max-width: 450px) {
    .reaction {
        width: 80vw;
    }
    .reactionMenu {
        width: calc(80vw - 24px);
    }
}
</style>
