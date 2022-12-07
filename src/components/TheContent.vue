<template>
  <div class="the-content">
    <button @click="openModalA">モーダルを開く</button>

    <ModalTypeA ref="modalTypeA" />
    <ModalTypeB ref="modalTypeB" />
    <ModalTypeC ref="modalTypeC" />
    <div class="box"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ModalTypeA from "@/components/modals/ModalTypeA.vue";
import ModalTypeB from "@/components/modals/ModalTypeB.vue";
import ModalTypeC from "@/components/modals/ModalTypeC.vue";
export default defineComponent({
  name: "TheContent",
  components: { ModalTypeA, ModalTypeB, ModalTypeC },
  setup() {
    // モーダルコンポーネントの参照
    const modalTypeA = ref<InstanceType<typeof ModalTypeA>>();
    const modalTypeB = ref<InstanceType<typeof ModalTypeB>>();
    const modalTypeC = ref<InstanceType<typeof ModalTypeB>>();

    /** modalTypeB のモーダルを開いてから閉じるまでの一連の処理 */
    const openModalB = () => {
      modalTypeB.value?.openModal().then(() => {
        console.log("modalB|コンテンツ内ボタンクリック成功後の処理");
      });
    };

    /** modalTypeC のモーダルを開いてから閉じるまでの一連の処理 */
    const openModalC = () => {
      modalTypeC.value?.openModal().then(() => {
        console.log("modalC|モーダル閉じる代わりにモーダルCを開く");
      });
    };

    /** modalTypeA のモーダルを開いてから閉じるまでの一連の処理 */
    const openModalA = () => {
      modalTypeA.value
        ?.openModal()
        .then((resolve: string) => {
          // モーダル上のボタン押下後の処理
          switch (resolve) {
            case "submit":
              openModalB();
              break;
            case "close":
              openModalC();
              break;

            default:
              break;
          }
        })
        .catch((reject: string) => {
          // 予期せぬエラー時の処理を記載
        });
    };

    return {
      openModalA,
      modalTypeA,
      modalTypeB,
      modalTypeC,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box {
  display: block;
  height: 3000px;
  background-color: rgb(221, 255, 234);
}
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
