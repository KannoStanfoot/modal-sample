import { ref, Ref } from "vue";
import { useEventListener } from "@vueuse/core";

class ModalVisivles {
  modalTypeA: Ref<boolean>;
  modalTypeB: Ref<boolean>;

  constructor() {
    this.modalTypeA = ref(false);
    this.modalTypeB = ref(false);
  }
}

const modalVisivles = new ModalVisivles();

export const useModal = () => {
  const openModal = (modalName: keyof ModalVisivles) => {
    modalVisivles[modalName].value = true;
  };
  const closeModal = (modalName: keyof ModalVisivles) => {
    modalVisivles[modalName].value = false;
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
    modalName: keyof ModalVisivles,
    element: HTMLButtonElement | undefined /* , modalType */
  ) => {
    openModal(modalName);

    await userActions(element);
  };
  return {
    modalVisivles,
    openModal,
    closeModal,
    push,
  };
};
