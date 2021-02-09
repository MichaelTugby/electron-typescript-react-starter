/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import PropTypes from "prop-types";

import type { FunctionComponent } from "react";

interface ButtonTypes {
  children: string;
}
const Button: FunctionComponent<ButtonTypes> = ({ children }) => (
  <div
    css={css`
      display: flex;
    `}
  >
    <button
      css={css`
        color: blue;
        &:hover {
          color: red;
        }
      `}
    >
      {children}
    </button>
  </div>
);
Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Button;
