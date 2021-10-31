<template>
  <header>
    <h1>ウディコン評価算出機</h1>
  </header>

  <main>
    <FormSelect
      name="evaluate"
      placeholder="ここに届いたメールの本文をコピペしてください"
      resize="vertical"
      v-model="text"
    />

    <button @click="exec">評価を算出</button>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import FormSelect from "@/components/Textarea.vue";

@Options({
  components: {
    FormSelect,
  },
})
export default class App extends Vue {
  public text = "";

  public exec() {
    // TODO
    console.log("clicked!!!");
  }
}
</script>
