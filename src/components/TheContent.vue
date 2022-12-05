<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="openModalA">モーダルを開く</button>

    <ModalTypeA
      ref="modalTypeA"
      :isVisible="modalVisivles.modalTypeA.value"
      @close="closeModal('modalTypeA')"
    />
    <ModalTypeB
      ref="modalTypeB"
      :isVisible="modalVisivles.modalTypeB.value"
      @close="closeModal('modalTypeB')"
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
  components: { /* TheModal ,*/ ModalTypeA, ModalTypeB },
  props: {
    msg: String,
  },
  setup() {
    const { modalVisivles, closeModal, push } = useModal();

    const modalTypeA = ref<InstanceType<typeof ModalTypeA>>();
    const modalTypeB = ref<InstanceType<typeof ModalTypeB>>();

    const openModalB = () => {
      const element = modalTypeB.value?.closeButton;
      push("modalTypeB", element).then(() => {
        console.log("モーダルBの処理をここで実行します");
        closeModal("modalTypeB");
      });
    };

    const openModalA = () => {
      const element = modalTypeA.value?.registrationButton;
      push("modalTypeA", element)
        .then(() => {
          console.log("地域を登録する処理をここで実行します");
          closeModal("modalTypeA");
        })
        .then(() => {
          openModalB();
        });
    };

    return {
      modalVisivles,
      openModalA,
      closeModal,
      modalTypeA,
      modalTypeB,
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
