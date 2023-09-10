import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCMCLMcNQF0yJhX2PY3T9Soyentw0Xdrwo",
  authDomain: "felipediniz-6c3da.firebaseapp.com",
  projectId: "felipediniz-6c3da",
  storageBucket: "felipediniz-6c3da.appspot.com",
  messagingSenderId: "172251034038",
  appId: "1:172251034038:web:92046038eb5849e8f05117",
};
initializeApp(firebaseConfig);
const app = createApp(App);
app.use(router);

app.mount("#app");
