<template>
  <div class="hello">
    <button @click="openModalA">モーダルを開く</button>

    <ModalTypeA ref="modalTypeA" />
    <ModalTypeB ref="modalTypeB" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ModalTypeA from "@/components/modals/ModalTypeA.vue";
import ModalTypeB from "@/components/modals/ModalTypeB.vue";
export default defineComponent({
  name: "TheContent",
  components: { ModalTypeA, ModalTypeB },
  setup() {
    // モーダルコンポーネントの参照
    const modalTypeA = ref<InstanceType<typeof ModalTypeA>>();
    const modalTypeB = ref<InstanceType<typeof ModalTypeB>>();

    /** modalTypeB のモーダルを開いてから閉じるまでの一連の処理 */
    const openModalB = () => {
      modalTypeB.value?.openModal().then(() => {
        console.log("modalB|コンテンツ内ボタンクリック成功後の処理");
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
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
