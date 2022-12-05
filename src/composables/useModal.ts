import { ref } from "vue";
import { useEventListener } from "@vueuse/core";

export const useModal = (modalName: string) => {
  const modalVisivle = ref(false);

  const openModal = () => {
    modalVisivle.value = true;
  };
  const closeModal = () => {
    modalVisivle.value = false;
  };

  const userActions = (element: HTMLButtonElement | undefined) => {
    return new Promise<void>((resolve, reject) => {
      console.log("クリック待ちの対象", element);

      if (element) {
        useEventListener(element, "click", () => {
          resolve();
        });
      }
    });
  };

  const push = async (
    element: HTMLButtonElement | undefined /* , modalType */
  ) => {
    openModal();

    await userActions(element);
  };
  return {
    modalVisivle,
    openModal,
    closeModal,
    push,
  };
};
