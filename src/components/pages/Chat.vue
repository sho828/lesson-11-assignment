<script>
import { getDatabase, ref, push, onValue } from "firebase/database";
import { defineComponent, reactive } from "vue";
import View from "../chat/View.vue";
import Send from "../chat/Send.vue";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import DisplayName from "../chat/DisplayName.vue";
import Header from "../header/Header.vue";

export default defineComponent({
  components: {
    View,
    Send,
    DisplayName,
    Header, // 追加
  },

  setup() {
    const data = reactive({
      user: {},
      chat: [],
      input: "",
      displayName: "",
    });

    data.user = getAuth().currentUser;
    data.displayName = data.user.displayName ?? "自分さん"; // 追加
    const refMessage = ref(getDatabase(), "chat"); // 追加

    onValue(refMessage, (snapshot) => {
      const data = snapshot.val();
      updateChat(data);
    });

    const pushMessage = (chatData) => {
      chatData.uid = data.user.uid;
      chatData.displayName = data.displayName; // 追加
      const db = getDatabase();
      push(ref(db, "chat"), chatData);
    };

    const updateChat = (snap) => {
      data.chat = [];
      for (const key in snap) {
        data.chat.push({
          message: snap[key].message,
          uid: snap[key].uid,
          displayName: snap[key].displayName,
        });
      }
    };

    const updateDisplayName = (name) => {
      updateProfile(data.user, {
        displayName: name,
      });
      data.displayName = name;
    };

    return {
      data,
      pushMessage, // 末尾に , を追加
      updateDisplayName, //追加
    };
  },
  beforeRouteEnter: (to, from, next) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next();
      } else {
        next("/login");
      }
    });
  },
});
</script>

<template>
  <div>
    <!-- Headerを追加時にエラーが出てたのでdivで囲みました -->
    <Header />
    <div class="container">
      <DisplayName v-model="data.displayName" @update="updateDisplayName" />
      <View :data="data" />
      <Send @sendMessage="pushMessage" />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; 削除 */
}
</style>
