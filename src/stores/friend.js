import { defineStore } from "pinia";
import axios from "axios";
import autolog from "autolog.js";

export const friendStore = defineStore({
    id: "friend",
    store: () => {
        return {
            // 友链列表
            friendList: []
        };
    },
    actions: {
        // 获取友链列表
        async getFriendList(callback) {
            try {
                const res = await axios.get(`/friend/getFriendList`);
                this.friendList = res.data;
                callback();
            } catch (error) {
                console.error(error);
                autolog.log(error.response.data.message, "error", 3000);
            }
        },
        // 申请友链
        async requestFriend(newFriend) {
            try {
                const res = await axios.post("/friend/requestFriend", {
                    newFriend
                });
                autolog.log(res.data.message, "success", 3000);
            } catch (error) {
                console.error(error);
                autolog.log(error.response.data.message, "error", 3000);
            }
        }
    }
});
