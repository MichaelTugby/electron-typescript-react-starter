import { createApp } from "vue";
import store, { key } from "./store";
import "./styles/theme";

import Home from "~/renderer/components/pages/Home";

const app = createApp(Home);
app.use(store, key);
app.mount("#root");
