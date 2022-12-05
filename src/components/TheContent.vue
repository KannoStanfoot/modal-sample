<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="openModal">モーダルを開く</button>
    <!--     <TheModal :isVisible="modalVisivle" @close="closeModal" />
 -->

    <ModalTypeA
      ref="modalTypeA"
      :isVisible="modalVisivle"
      @close="closeModal"
    />
    <ModalTypeB
      ref="modalTypeB"
      :isVisible="modalVisivle"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ModalTypeA from "@/components/modals/ModalTypeA.vue";
import ModalTypeB from "@/components/modals/ModalTypeB.vue";
import { useModal } from "@/composables/useModal";
export default defineComponent({
  name: "TheContent",
  components: { /* TheModal ,*/ ModalTypeA },
  props: {
    msg: String,
  },
  setup() {
    const { modalVisivle, closeModal, push } = useModal("ModalTypeA");

    const modalTypeA = ref<InstanceType<typeof ModalTypeA>>();
    const modalTypeB = ref<InstanceType<typeof ModalTypeB>>();

    const openModal = () => {
      const element = modalTypeA.value?.registrationButton;
      push(element).then(() => {
        console.log("地域を登録する処理をここで実行します");
        closeModal();
      });
    };

    return {
      modalVisivle,
      openModal,
      closeModal,
      modalTypeA,
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
