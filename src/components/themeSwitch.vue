<template>
    <div class="themeSwitch">
        <div>
            <div class="icon">
                <i :class="{ iconfont: true }" ref="sun">&#xe635;</i>
                <i :class="{ iconfont: true }" ref="moon">&#xe636;</i>
            </div>
        </div>
    </div>
</template>

<script>
import { gsap } from "gsap";

export default {
    props: ["theme"],
    data() {
        return {
            isSun: false,
            isMoon: false
        };
    },
    methods: {
        initializeTheme(theme) {
            this.isSun = theme !== 0;
            this.isMoon = theme === 0;

            this.$nextTick(() => {
                theme === 0 ? this.animateTheme("light") : this.animateTheme("dark");
            });
        },
        animateTheme(type) {
            const isLightTheme = type === "light";

            // 设置初始状态
            gsap.set(this.$refs.moon, { top: isLightTheme ? "0" : "auto", bottom: isLightTheme ? "auto" : "0", opacity: isLightTheme ? 1 : 0 });
            gsap.set(this.$refs.sun, { top: isLightTheme ? "auto" : "0", bottom: isLightTheme ? "0" : "auto", opacity: isLightTheme ? 0 : 1 });

            // 创建动画时间轴
            const tl = gsap.timeline({ delay: 0.5, defaults: { duration: 0.2 } });
            tl.to(isLightTheme ? this.$refs.moon : this.$refs.sun, {
                top: "auto",
                bottom: 0,
                opacity: 0,
                ease: "power1.out"
            });
            tl.to(isLightTheme ? this.$refs.sun : this.$refs.moon, {
                top: 0,
                opacity: 1,
                ease: "power1.out"
            });

            // 触发事件
            this.triggerThemeSwitch();
        },
        triggerThemeSwitch() {
            setTimeout(() => {
                this.$emit("cutThemeSwitch");
            }, 3000);
        }
    },
    mounted() {
        this.initializeTheme(this.theme);
    }
};
</script>

<style lang="scss" scoped>
@import url("style/components/themeSwitch.scss");
</style>
