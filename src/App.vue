<template>
    <dock />
    <div class="main">
        <!-- <router-view /> -->
    </div>
    <foot />
</template>

<script>
import foot from "@/components/foot.vue";
import dock from "@/components/dock.vue";

export default {
    components: {
        dock,
        foot
    },
    data() {
        return {};
    }
};
</script>

<style scoped>
.main {
    min-height: 100vh;
}
</style>
