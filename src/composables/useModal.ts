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
  const openModal = (modalType: keyof ModalVisivles) => {
    modalVisivles[modalType].value = true;
  };
  const closeModal = (modalType: keyof ModalVisivles) => {
    modalVisivles[modalType].value = false;
  };

  const pushModal = async (
    modalType: keyof ModalVisivles,
    elementList: Array<HTMLButtonElement | undefined>
  ) => {
    openModal(modalType);

    return await userActions(elementList);
  };
  // pushに合わせてpopにしたけど、ただcloseModal実行するだけ
  const popModal = (modalType: keyof ModalVisivles) => {
    closeModal(modalType);
  };

  const userActions = (elementList: Array<HTMLButtonElement | undefined>) => {
    return new Promise<string>((resolve, reject) => {
      for (const element of elementList) {
        useEventListener(element, "click", () => {
          const buttonType = element?.getAttribute("modal-button-type");
          if (buttonType) {
            return resolve(buttonType);
          } else {
            return reject("error");
          }
        });
      }
    });
  };

  return {
    modalVisivles,
    openModal,
    closeModal,
    pushModal,
    popModal,
  };
};
