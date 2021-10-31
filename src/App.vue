<template>
  <div>hello world</div>
  <FormSelect name="test" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import FormSelect from "@/components/Textarea.vue";

@Options({
  components: {
    FormSelect,
  },
})
export default class App extends Vue {}
</script>
