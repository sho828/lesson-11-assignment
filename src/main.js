import { createApp } from "vue";
import App from "./App.vue";
import VueRouter from "./router/index"; // 追加

import "bootstrap/dist/css/bootstrap.min.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3xTLi6Cpsx6EOV-QWsgl-4l7LZWGxLy0",
  authDomain: "vite-project-7a99d.firebaseapp.com",
  projectId: "vite-project-7a99d",
  storageBucket: "vite-project-7a99d.appspot.com",
  messagingSenderId: "683352008463",
  appId: "1:683352008463:web:6579ca62056cd479c2407a"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig); ここだけ少し変更しています
initializeApp(firebaseConfig);

createApp(App).use(VueRouter).mount("#app");
