import { ref, Ref } from "vue";
import { useEventListener } from "@vueuse/core";

/** 各モーダルの表示状態クラス */
export class ModalsVisibleStatus {
  modalTypeA: Ref<boolean>;
  modalTypeB: Ref<boolean>;

  constructor() {
    this.modalTypeA = ref(false);
    this.modalTypeB = ref(false);
  }
}

/** 各モーダルの表示状態インスタンス */
const modalsVisibleStatus = new ModalsVisibleStatus();

export const useModal = () => {
  /** モーダルを開く */
  const openModal = (modalType: keyof ModalsVisibleStatus) => {
    modalsVisibleStatus[modalType].value = true;
  };
  /** モーダルを閉じる */
  const closeModal = (modalType: keyof ModalsVisibleStatus) => {
    modalsVisibleStatus[modalType].value = false;
  };

  /** モーダルを開く処理を実行後、ユーザーがモーダル上のボタンをクリックするまで待機する */
  const pushModal = async (
    modalType: keyof ModalsVisibleStatus,
    elementList: Array<HTMLButtonElement | undefined>
  ) => {
    openModal(modalType);

    return await onClickButton(modalType, elementList);
  };
  /** モーダルを閉じる処理を呼び出す */
  const popModal = (modalType: keyof ModalsVisibleStatus) => {
    closeModal(modalType);
  };

  /** モーダルコンテンツ内のボタンをユーザーがクリックした際の処理
   */
  const onClickButton = (
    modalType: keyof ModalsVisibleStatus,
    elementList: Array<HTMLButtonElement | undefined>
  ) => {
    return new Promise<string>((resolve, reject) => {
      for (const element of elementList) {
        useEventListener(element, "click", () => {
          // ボタン押下後にモーダルを閉じる
          closeModal(modalType);

          // buttonType の型は src/components/modals/ModalTypeA.vue のmodalButtonTypeAと同じ型定義ファイルを利用想定
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
    modalsVisibleStatus,
    openModal,
    closeModal,
    pushModal,
    popModal,
  };
};
