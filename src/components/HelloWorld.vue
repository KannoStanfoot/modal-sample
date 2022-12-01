<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="openModal">モーダルを開く</button>
    <TheModal :isVisible="modalVisivle" @close="closeModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TheModal from "@/components/TheModal.vue";

export default defineComponent({
  name: "HelloWorld",
  components: { TheModal },
  props: {
    msg: String,
  },
  setup() {
    const modalVisivle = ref(false);

    const openModal = () => {
      console.log("モーダルを開くボタンをクリックしました");
      modalVisivle.value = true;
    };
    const closeModal = () => {
      modalVisivle.value = false;
    };

    return {
      modalVisivle,
      openModal,
      closeModal,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
