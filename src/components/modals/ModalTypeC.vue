<template>
  <teleport to="#modals">
    <div :class="modalType" v-show="shouldShowThisComponent">
      <div class="modal-background" @click="popModal(modalType)"></div>
      <div class="modal-content">
        <div class="box">
          <p>モーダルタイプC</p>
          <p>モーダルタイプC</p>
          <p>モーダルタイプC</p>
          <p>モーダルタイプC</p>
          <p>モーダルタイプC</p>
          <p>モーダルタイプC</p>
          <p>モーダルタイプC</p>
          <p>モーダルタイプC</p>
          <p>モーダルタイプC</p>
          <p>モーダルタイプC</p>
          <p>モーダルタイプC</p>
          <p>モーダルタイプC</p>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, defineExpose } from "vue";
import { useModal, type ModalsVisibleStatus } from "@/composables/useModal";

/** 本コンポーネントのモーダル名 */
const modalType: keyof ModalsVisibleStatus = "modalTypeC";

const { modalsVisibleStatus, pushModal, popModal, scrollLock } = useModal();

/** 本コンポーネントを表示するか否か */
const shouldShowThisComponent = computed(() => {
  return modalsVisibleStatus.modalTypeC.value;
});

// クリック対象のDOM参照
const submitButton = ref<HTMLButtonElement>();
const closeButton = ref<HTMLButtonElement>();

/** 本コンポーネントのモーダルを開く */
const openModal = async () => {
  return await pushModal(modalType, [submitButton.value, closeButton.value]);
};

// スクロールロック
scrollLock(shouldShowThisComponent, modalType);

defineExpose({ openModal });
</script>

<style lang="scss" scoped>
.modal-background {
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
  background-color: rgb(255, 220, 248);
  overflow: scroll;
  width: 600px;
  height: 100px;
  border-radius: 20px;
  padding: 20px;

  .box {
    width: 400px;
    height: 900px;
    background-color: rgb(186, 255, 231);
  }
}
</style>
