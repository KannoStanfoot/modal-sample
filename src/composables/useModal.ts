import { ref } from "vue";

export function useModal() {
  const modalVisivle = ref(false);

  const openModal = () => {
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
}
