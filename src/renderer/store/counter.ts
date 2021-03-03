import { Module } from "vuex";
import { IRootState } from "./";

export interface ICounter {
  count: number;
}

export default {
  namespaced: true,
  state: {
    count: 1,
  },
  mutations: {
    decrement(state) {
      if (state.count > 1) {
        state.count--;
      }
    },
    increment(state) {
      state.count++;
    },
  },
} as Module<ICounter, IRootState>;
