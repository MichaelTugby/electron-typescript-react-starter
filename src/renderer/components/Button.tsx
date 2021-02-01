/** @jsx jsx */
import { jsx, css } from "@emotion/react";

interface ButtonTypes {
    children: string;
}
const Button = ({ children }: ButtonTypes)  => (
    <button css={css`
        color: blue;
        &:hover {
            color: red;
        }
    `}>{children}</button>
);

export default Button;
