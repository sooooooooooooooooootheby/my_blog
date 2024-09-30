<template>
    <div class="bottom">
        <div class="left">
            <img src="/logo_small.webp" alt="logo" />
            <a href="https://github.com/sooooooooooooooooootheby" target="_blank">
                <i class="iconfont"> &#xe64f; </i>
            </a>
        </div>
        <div class="right">
            <p>当前共 {{ userCount }} 人在线</p>
            <p>©2024 Sooooooooooooooooootheby</p>
            <div>
                <a href="https://beian.mps.gov.cn/#/query/webSearch?code=45031202000367" rel="noreferrer" target="_blank">桂公网安备45031202000367</a>
                <span>|</span>
                <a>桂ICP备2024039878</a>
            </div>
        </div>
    </div>
</template>

<script>
import { gsap } from "gsap";

export default {
    data() {
        return {
            isSocket: false,
            userCount: "?"
        };
    },
    methods: {
        showPop() {
            gsap.to(this.$refs.socketPop, {
                display: "flex",
                top: -150,
                opacity: 1,
                duration: 0.2
            });
        },
        hidePop() {
            gsap.to(this.$refs.socketPop, {
                display: "none",
                top: -130,
                opacity: 0,
                duration: 0.2
            });
        }
    },
    mounted() {
        this.$socket.on("user count", (count) => {
            this.userCount = count;
        });
        this.$socket.on("connect", () => {
            this.isSocket = true;
        });
        this.$socket.on("disconnect", () => {
            this.isSocket = false;
        });
    }
};
</script>

<style lang="scss" scoped>
@import "style/components/foot.scss";
</style>
