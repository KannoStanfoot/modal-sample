<template>
  <teleport to="body">
    <div class="modal" v-show="isVisible" @click="close"></div>
    <div class="modal-content" v-show="isVisible">
      <p>モーダルBのコンテンツです</p>
      <button ref="closeButton" :modal-button-type="modalButtonType">
        閉じる
      </button>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, defineExpose } from "vue";

defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits<{ (e: "close"): void }>();

const close = () => {
  console.log("モーダル外をクリックしました");
  emit("close");
};

// 利用するタイプを型定義ファイルで定義しておく
const modalButtonType = "close";

const closeButton = ref<HTMLButtonElement>();
defineExpose({ closeButton });
</script>

<style lang="scss" scoped>
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
  background-color: rgb(171, 189, 255);
  width: 600px;
  height: auto;
  border-radius: 20px;
  padding: 20px;
}
</style>
