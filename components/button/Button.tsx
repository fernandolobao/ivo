import React, { FC, ReactNode, useRef, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";

const tuple = <T extends string[]>(...args: T) => args;
const VARIANT = tuple("primary", "secondary");
const SIZE = tuple("small", "medium", "large", "xlarge");
const TYPE = tuple("button", "reset", "submit");

export interface ComponentProps {
  variant?: (typeof VARIANT)[number];
  size?: (typeof SIZE)[number];
  type?: (typeof TYPE)[number];
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

type ButtonProps =
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
      as: "button";
    })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      as: "link";
    });

type ActionProps = ComponentProps & ButtonProps;

/**
 * Button basic component
 */
export const Button: FC<ActionProps> = ({
  variant = "primary",
  size = "medium",
  type = "button",
  className,
  children,
  onClick,
  ...props
}) => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hover, setHover] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const aRef = useRef<HTMLAnchorElement>(null);

  if (props.as === "link") {
    const { as, ...rest } = props;
    return (
      <a
        ref={aRef}
        onMouseEnter={(event) => {
          if (aRef.current !== null) {
            setPos({
              x: event.pageX - aRef.current.offsetLeft,
              y: event.pageY - aRef.current.offsetTop,
            });
            setHover(true);
            console.log({
              x: event.pageX - aRef.current.offsetLeft,
              y: event.pageY - aRef.current.offsetTop,
            });
          }
        }}
        onMouseLeave={() => {
          setHover(false);
          setClick(false);
        }}
        onClick={(event) => {
          if (aRef.current !== null) {
            setPos({
              x: event.pageX - aRef.current.offsetLeft,
              y: event.pageY - aRef.current.offsetTop,
            });
            setClick(true);
          }
          onClick && onClick();
        }}
        className={classNames([styles[`${as}`], styles[`${as}--${variant}`]], {
          [styles.animateRipple]: hover,
          [styles.animateClick]: click,
        })}
        {...rest}
      >
        <span
          className={classNames(styles.ripple)}
          style={{ left: pos.x + "px", top: pos.y + "px" }}
        ></span>
        <span className={classNames(styles.text)}>{children}</span>
      </a>
    );
  }
  return (
    <button
      ref={btnRef}
      type={type}
      onMouseEnter={(event) => {
        if (btnRef.current !== null) {
          setPos({
            x: event.pageX - btnRef.current.offsetLeft,
            y: event.pageY - btnRef.current.offsetTop,
          });
          setHover(true);
        }
      }}
      onMouseLeave={() => {
        setHover(false);
        setClick(false);
      }}
      onClick={(event) => {
        if (btnRef.current !== null) {
          setPos({
            x: event.pageX - btnRef.current.offsetLeft,
            y: event.pageY - btnRef.current.offsetTop,
          });
          setClick(true);
        }
        onClick && onClick();
      }}
      className={classNames(
        [
          styles[`button`],
          styles[`button--${size}`],
          styles[`button--${variant}`],
          styles[`button--${type}`],
        ],
        { [styles.animateRipple]: hover, [styles.animateClick]: click }
      )}
    >
      <span
        className={classNames(styles.ripple)}
        style={{ left: pos.x + "px", top: pos.y + "px" }}
      ></span>
      <span className={classNames(styles.text)}>{children}</span>
    </button>
  );
};
