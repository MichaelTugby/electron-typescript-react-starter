<template>
  <div class="counter">
    <Button class="counter__decrease-button" primary @click="onDecrement"
      >-</Button
    >
    <span class="counter__text">
      <slot />
    </span>
    <Button class="counter__increase-button" primary @click="onIncrement"
      >+</Button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "~/renderer/components/atoms/Button";
export default defineComponent({
  components: { Button },
  emits: ["decrement", "increment"],
  setup(_, { emit }) {
    const onDecrement = () => emit("decrement");
    const onIncrement = () => emit("increment");
    return {
      onDecrement,
      onIncrement,
    };
  },
});
</script>

<style lang="scss" scoped>
.counter__text {
  padding: 0 5px;
  @media (prefers-color-scheme: dark) {
    color: white;
  }
  @media (prefers-color-scheme: light) {
    color: black;
  }
}
</style>
