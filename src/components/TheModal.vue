<template>
  <teleport to="body">
    <div
      class="modal"
      id="sample-modal"
      v-show="isVisible"
      @click="close"
    ></div>
    <div class="modal-content" v-show="isVisible">モーダルのコンテンツです</div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheModal",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const close = () => {
      console.log("モーダル外をクリックしました");
      context.emit("close");
    };

    return { close };
  },
});
</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #333;
  background-color: white;
  width: 600px;
  height: auto;
  border-radius: 20px;
  padding: 20px;
}
</style>
