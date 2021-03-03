import { InjectionKey } from "vue";
import { createStore } from "vuex";

import counter, { ICounter } from "./counter";

const store = createStore<IRootState>({
  modules: {
    counter,
  },
});

export interface IRootState {
  counter: ICounter;
}

export const key: InjectionKey<typeof store> = Symbol();
export default store;
