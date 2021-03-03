<template>
  <div id="home">
    <h3 class="home__title">Simple Counter</h3>
    <Counter @decrement="decrement" @increment="increment">{{
      counter
    }}</Counter>
    <Button @click="toggleDarkMode">Toggle Dark Mode</Button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { useStore } from "vuex";
import { key } from "~/renderer/store";

import Button from "~/renderer/components/atoms/Button";
import Counter from "~/renderer/components/molecules/Counter";

export default defineComponent({
  name: "Home",
  components: { Button, Counter },
  setup() {
    const store = useStore(key);
    const decrement = () => store.commit("counter/decrement");
    const increment = () => store.commit("counter/increment");
    const counter = computed(() => store.state.counter.count);

    const toggleDarkMode = () => {
      window.api.send("dark-mode:toggle");
    };

    return {
      counter,
      decrement,
      increment,
      toggleDarkMode,
    };
  },
});
</script>

<style lang="scss" scoped>
.home__title {
  margin: 0 0 10px 0;
  @media (prefers-color-scheme: dark) {
    color: white;
  }
  @media (prefers-color-scheme: light) {
    color: black;
  }
}
</style>
