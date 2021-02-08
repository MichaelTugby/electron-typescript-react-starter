/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import PropTypes from "prop-types";

import type { FunctionComponent } from "react";

interface ButtonTypes {
  children: string;
}
const Button: FunctionComponent<ButtonTypes> = ({ children }) => (
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
);
Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Button;
