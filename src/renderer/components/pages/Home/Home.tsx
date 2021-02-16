/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "~/store";

import Button from "~/components/atoms/Button";
import Counter from "~/components/molecules/Counter";

const Home: FunctionComponent = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const toggleDarkMode = () => {
    window.api.send("dark-mode:toggle");
  };
  return (
    <div id="home">
      <h3
        css={css`
          margin: 0 0 10px 0;
          @media (prefers-color-scheme: dark) {
            color: white;
          }
          @media (prefers-color-scheme: light) {
            color: black;
          }
        `}
      >
        Simple Counter
      </h3>
      <Counter
        id="home__counter"
        onDecrease={() => dispatch({ type: "SUBTRACT_COUNTER" })}
        onIncrease={() => dispatch({ type: "ADD_COUNTER" })}
      >
        {counter}
      </Counter>
      <Button onClick={toggleDarkMode}>Toggle Dark Mode</Button>
    </div>
  );
};

export default Home;
