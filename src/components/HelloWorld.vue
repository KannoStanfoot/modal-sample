<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="openModal">モーダルを開く</button>
    <TheModal :isVisible="modalVisivle" @close="closeModal" />

    <p>
      <button @click="vum_showModal">Show modal</button>
    </p>
    <!-- If the option changed modal component the name
  <MyModal>
  -->
    <Modal v-model="vum_isShow" :close="vum_closeModal">
      <div class="vum_modal">
        <p>Hello</p>
        <button @click="vum_closeModal">close</button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TheModal from "@/components/TheModal.vue";
import { useModal } from "@/composables/useModal";
export default defineComponent({
  name: "HelloWorld",
  components: { TheModal },
  props: {
    msg: String,
  },
  setup() {
    const { modalVisivle, openModal, closeModal } = useModal();
    ///// vue-universal-modal
    const vum_isShow = ref(false);

    const vum_showModal = () => {
      vum_isShow.value = true;
    };

    const vum_closeModal = () => {
      vum_isShow.value = false;
    };

    return {
      modalVisivle,
      openModal,
      closeModal,
      vum_isShow,
      vum_showModal,
      vum_closeModal,
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
