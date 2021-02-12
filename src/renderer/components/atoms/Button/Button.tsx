/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import type { ButtonHTMLAttributes, FunctionComponent } from "react";

interface IButtonTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
}
const Button: FunctionComponent<IButtonTypes> = ({
  children,
  primary = false,
  ...props
}) => {
  const theme = useTheme();
  return (
    <button
      className="button"
      css={css`
        background-color: ${primary ? theme.colors.primary : "black"};
        padding: 5px 10px;
        border: 1px solid black;
        position: relative;
        cursor: pointer;
        &:after {
          content: "";
          position: absolute;
          height: 100%;
          width: 100%;
          background-color: white;
          left: 0;
          top: 0;
          opacity: 0;
        }
        &:hover:after {
          opacity: 0.3;
        }
        &:focus {
          outline: 0;
        }
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
