<template>
    <div class="target">
        <p class="title">近期目标</p>

        <ul class="list">
            <li>
                <div class="left">
                    <div class="container">
                        <input type="checkbox" id="cbx" class="cbx" style="display: none" disabled />
                        <label for="cbx" class="check">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>
                        </label>
                    </div>
                    <span>通过英语B级能力测验</span>
                </div>
                <div class="right">
                    <span class="time">Dec15 2024</span>
                </div>
            </li>
            <li>
                <div class="left">
                    <div class="container">
                        <input type="checkbox" id="cbx" class="cbx" style="display: none" disabled />
                        <label for="cbx" class="check">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>
                        </label>
                    </div>
                    <span>通过计算机二级C语言程序和设计</span>
                </div>
                <div class="right">
                    <span class="time"></span>
                </div>
            </li>
            <li>
                <div class="left">
                    <div class="container">
                        <input type="checkbox" id="cbx" class="cbx" style="display: none" disabled />
                        <label for="cbx" class="check">
                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>
                        </label>
                    </div>
                    <span>通过专升本考试</span>
                </div>
                <div class="right">
                    <span class="time">May 2025</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
@import url("style/views/target_view.scss");
</style>
