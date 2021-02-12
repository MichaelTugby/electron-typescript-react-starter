/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "~/store";

import Counter from "~/components/molecules/Counter";

const Home: FunctionComponent = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div id="home">
      <h3
        css={css`
          margin: 0 0 10px 0;
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
    </div>
  );
};

export default Home;
