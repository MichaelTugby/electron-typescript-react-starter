<template>
  <button class="button" :class="{ 'button--primary': primary }">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    primary: Boolean,
  },
});
</script>

<style lang="scss" scoped>
.button {
  &--primary {
    background-color: var(--app-primary);
  }
  padding: 5px 10px;
  border: 1px solid black;
  position: relative;
  cursor: pointer;
  &:after {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: white;
    left: 0;
    top: 0;
    opacity: 0;
  }
  &:hover:after,
  &:focus:after {
    opacity: 0.3;
    outline: 0;
  }
}
</style>
