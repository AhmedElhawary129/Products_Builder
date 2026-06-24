import type { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

const CircleColor = ({ color, ...rest }: IProps) => {
  return (
    <span
    {...rest}
    className={`block w-5 h-5 rounded-full cursor-pointer mb-1`}
    style={{ backgroundColor: color }}
    />
  );
};

export default CircleColor;
