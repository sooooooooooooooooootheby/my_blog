<template>
	<div class="reaction" ref="reaction">
		<button class="reaction_menu">
			<svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="isMenu = !isMenu"><path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z" fill="#0D0D0D" /></svg>
			<ul :class="{ reaction_menu_emoji_list: true, reaction_menu_emoji_list_show: isMenu }">
				<li v-for="(item, index) in emojiList" :key="index" class="reaction_menu_emoji_list_item" @click="clickEmoji(item)">
					<img :src="`${emojiRequest}${item}.png`" :alt="item" />
				</li>
			</ul>
		</button>
		<ul class="reaction_list">
			<li :class="{ reaction_list_item: true, userClick: judgeUserClick(item.emoji) }" v-for="(item, index) in reactionList" :key="index" @click="clickEmoji(item)">
				<img :src="`${emojiRequest}${item.emoji}.png`" :alt="item" />
				<span>{{ item.emoji_count }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
import axios from "axios";

export default {
	props: ["emojiListPath", "emojiRequest", "id", "request"],
	data() {
		return {
			// 所有emoji
			emojiList: [],
			// 哪些emoji被激活了
			reactionList: [],
			// 用户激活的emoji
			userClick: null,

			// 显示所有的emoji
			isMenu: false,
		};
	},
	methods: {
		// 获取所有的emoji
		async getEmojiList() {
			try {
				const res = await axios.get(this.emojiListPath);
				this.emojiList = res.data;
			} catch (error) {
				console.error("获取Emoji列表出错" + error);
			}
		},
		// 获取被激活的emoji
		async getReaction() {
			try {
				const res = await axios.get(`${this.request}/reaction/getReaction`, {
					params: {
						id: this.id,
					},
				});
				this.reactionList = res.data.reaction;
				if (res.data.userClick.length != 0) {
					this.userClick = res.data.userClick[0].user_click;
				}
			} catch (error) {
				console.error("获取文章emoji列表出错:" + error);
			}
		},
		// 判断当前emoji是否为用户选择的
		judgeUserClick(emoji) {
			return this.userClick === emoji ? true : false;
		},
		// 关闭emoji菜单
		closeEmojiMenu(event) {
			// 检查点击的元素是否在弹窗内
			if (this.$refs.reaction && !this.$refs.reaction.contains(event.target) && this.isMenu) {
				this.isMenu = false;
			}
		},
		// 点击emoji
		async clickEmoji(emoji) {
			let userClickEmoji;
			if (typeof emoji === "object") {
				// 如果是对象, 说明点击的是reaction列表的, 需要提取emoji
				userClickEmoji = emoji.emoji;
			} else {
				// 如果不是对象, 说明点击的是emoji菜单的;
				userClickEmoji = emoji;
			}

			let type;
			if (userClickEmoji === this.userClick) {
				type = "del";
			} else {
				type = "add";
			}

			try {
				const res = await axios.post(`${this.request}/reaction/userClickEmoji`, {
					id: this.id,
					emoji: userClickEmoji,
					type: type,
				});
				this.userClick = this.userClickEmoji;
				this.getReaction();
			} catch (error) {
				console.error(error);
			}
			this.isMenu = false;
		},
	},
	mounted() {
		this.getEmojiList();
		this.getReaction();
		window.addEventListener("click", this.closeEmojiMenu);
	},
	beforeDestroy() {
		window.removeEventListener("click", this.closeEmojiMenu);
	},
};
</script>

<style scoped>
.reaction {
	width: 500px;
	display: flex;
}

.reaction button {
	margin: 0;
	padding: 0;
	border: none;
	outline: none;
	background-color: transparent;
}

.reaction .reaction_menu {
	width: calc(19px + 12px);
	height: calc(19px + 12px);
	margin-right: 6px;
	padding: 6px;
	background-color: rgba(252, 252, 253, 0.75);
	border: 1px solid #dcdfe6;
	border-radius: 8px;
	position: relative;
	cursor: pointer;
}

.reaction .reaction_menu .reaction_menu_emoji_list {
	width: 448px;
	padding: 12px;
	position: absolute;
	top: 0;
	left: 0;
	opacity: 0;
	pointer-events: none;
	display: flex;
	flex-wrap: wrap;
	background-color: rgba(252, 252, 253, 0.75);
	border: 1px solid #dcdfe6;
	border-radius: 8px;
	transition: 0.4s;
}

.reaction .reaction_menu .reaction_menu_emoji_list .reaction_menu_emoji_list_item {
	list-style: none;
	margin: 4px;
}

.reaction .reaction_menu .reaction_menu_emoji_list .reaction_menu_emoji_list_item img {
	width: 48px;
	height: 48px;
}

.reaction .reaction_menu .reaction_menu_emoji_list_show {
	top: 36px;
	opacity: 1;
	pointer-events: auto;
}

.reaction .reaction_list {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
}

.reaction .reaction_list .reaction_list_item {
	list-style: none;
	width: auto;
	height: 18px;
	margin-right: 6px;
	margin-bottom: 6px;
	padding: 6px;
	background-color: rgba(252, 252, 253, 0.75);
	border: 1px solid #dcdfe6;
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
}

.reaction .reaction_list .reaction_list_item img {
	width: 18px;
	height: 18px;
}

.reaction .reaction_list .reaction_list_item span {
	margin-left: 6px;
}

.reaction .reaction_list .userClick {
	background-color: #94a486;
}

@media screen and (max-width: 992px) {
	.reaction {
		width: calc(100vw - 40px);
		margin: 0 auto;
	}
	.reaction .reaction_menu .reaction_menu_emoji_list {
		width: calc(100vw - 70px);
	}
	.reaction .reaction_list {
		width: 100%;
	}
}
</style>
