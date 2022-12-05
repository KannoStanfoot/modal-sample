<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="openModalA">モーダルを開く</button>

    <ModalTypeA
      ref="modalTypeA"
      :isVisible="modalVisivles.modalTypeA.value"
      @close="popModal('modalTypeA')"
    />
    <ModalTypeB
      ref="modalTypeB"
      :isVisible="modalVisivles.modalTypeB.value"
      @close="popModal('modalTypeB')"
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
  components: { ModalTypeA, ModalTypeB },
  props: {
    msg: String,
  },
  setup() {
    const { modalVisivles, popModal, pushModal } = useModal();

    const modalTypeA = ref<InstanceType<typeof ModalTypeA>>();
    const modalTypeB = ref<InstanceType<typeof ModalTypeB>>();

    const openModalB = () => {
      const element = modalTypeB.value?.closeButton;
      pushModal("modalTypeB", [element]).then(() => {
        popModal("modalTypeB");
      });
    };

    const openModalA = () => {
      const element1 = modalTypeA.value?.submitButton;
      const element2 = modalTypeA.value?.closeButton;
      pushModal("modalTypeA", [element1, element2]).then((resolve) => {
        switch (resolve) {
          case "submit":
            popModal("modalTypeA");
            openModalB();
            break;
          case "close":
            popModal("modalTypeA");

            break;

          default:
            popModal("modalTypeA");
            break;
        }
      });
    };

    return {
      modalVisivles,
      openModalA,
      popModal,
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
