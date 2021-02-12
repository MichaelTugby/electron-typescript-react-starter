/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import type { FunctionComponent, HTMLAttributes } from "react";

import Button from "~/components/atoms/Button";

interface ICounterType extends HTMLAttributes<HTMLDivElement> {
  onDecrease?: () => void;
  onIncrease?: () => void;
}
const Counter: FunctionComponent<ICounterType> = ({
  children,
  onDecrease,
  onIncrease,
  ...props
}) => (
  <div className="counter" {...props}>
    <Button primary className="counter__decrease-btn" onClick={onDecrease}>
      -
    </Button>
    <span
      css={css`
        padding: 0 5px;
      `}
      className="counter__text"
    >
      {children}
    </span>
    <Button primary className="counter__increase-btn" onClick={onIncrease}>
      +
    </Button>
  </div>
);

export default Counter;
