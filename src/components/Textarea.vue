<template>
  <div class="form-part">
    <label :for="name" v-html="label" v-if="label"></label>

    <textarea :name="name"></textarea>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    name: { type: String, require: true },
    label: { type: String, require: false },
  },
})
export default class Textarea extends Vue {
  name!: string;
}
</script>
