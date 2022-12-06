<template>
  <teleport to="#modals">
    <div class="modal" v-show="shouldShowThisComponent">
      <div class="modal-background" @click="popModal(modalType)"></div>
      <div class="modal-content">
        <p>モーダルBのコンテンツです</p>
        <button ref="closeButton" :modal-button-type="modalButtonType">
          閉じる
        </button>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, defineExpose } from "vue";
import { useModal, type ModalsVisibleStatus } from "@/composables/useModal";

/** 本コンポーネントのモーダル名 */
const modalType: keyof ModalsVisibleStatus = "modalTypeB";

// 利用するタイプを型定義ファイルで定義しておく
const modalButtonType = "close";

const { modalsVisibleStatus, pushModal, popModal } = useModal();

/** 本コンポーネントを表示するか否か */
const shouldShowThisComponent = computed(() => {
  return modalsVisibleStatus.modalTypeB.value;
});

// クリック対象のDOM参照
const closeButton = ref<HTMLButtonElement>();

/** 本コンポーネントのモーダルを開く */
const openModal = async () => {
  return await pushModal(modalType, [closeButton.value]);
};

defineExpose({ openModal });
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
