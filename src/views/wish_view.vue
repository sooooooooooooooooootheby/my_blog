<template>
    <div class="wish">
        <p class="title">愿望清单</p>
        <p>这里是我想要的东西, 正在慢慢攒钱, 希望有朝一日能够全部收入囊中.</p>

        <ul class="list">
            <li>
                <div class="container">
                    <input type="checkbox" id="cbx" class="cbx" style="display: none" disabled />
                    <label for="cbx" class="check">
                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                            <path
                                d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"
                            ></path>
                            <polyline points="1 9 7 14 15 4"></polyline>
                        </svg>
                    </label>
                </div>
                <span>一台 カメラ 📷</span>
            </li>
            <li>
                <div class="container">
                    <input type="checkbox" id="cbx1" class="cbx" style="display: none" disabled />
                    <label for="cbx1" class="check">
                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                            <path
                                d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"
                            ></path>
                            <polyline points="1 9 7 14 15 4"></polyline>
                        </svg>
                    </label>
                </div>
                <span>一台 Macbook 💻</span>
            </li>
        </ul>

        <p class="title">帮助我完成愿望!</p>
        <p>如果我写的文章或者做的开源项目对你有帮助, 欢迎你资助我一些, 帮助我完成我的愿望.</p>
        <ul class="sponsor">
            <li>
                <span class="li_title">BTC:</span>
                <span class="li_url">bitcoin:bc1qusnfu3qlve5n52z9cgddz7kzjappvzt9399kmr</span>
            </li>
            <li>
                <span class="li_title">微信:</span>
                <img src="/Wechat sponsorship.webp" alt="Wechat sponsorship" />
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
@import url("style/views/wish_view.scss");
</style>
