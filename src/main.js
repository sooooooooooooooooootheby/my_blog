import "@/assets/style/main.scss";
import "highlightjs/styles/atom-one-dark.css";

import { createApp } from "vue";

import App from "./App.vue";

const app = createApp(App);

// pinia
import { createPinia } from "pinia";
app.use(createPinia());

// router
import router from "./router";
app.use(router);

// socket
import { io } from "socket.io-client";
const socketUrl = import.meta.env.VITE_SOCKET_URL;
const socketPath = import.meta.env.VITE_SOCKET_PATH;
const userIdentity = localStorage.getItem("userIdentity");
const socket = socketUrl
    ? io(socketUrl, {
          auth: {
              userIdentity
          }
      })
    : io({
          path: socketPath,
          auth: {
              userIdentity
          }
      });
app.config.globalProperties.$socket = socket;

// axios
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = apiUrl;

// 剪贴板
import VueClipboard from "vue-clipboard2";
app.use(VueClipboard);

app.mount("#app");
