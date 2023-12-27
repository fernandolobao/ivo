import React, { ChangeEvent, FC, ReactNode, useRef, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";

const tuple = <T extends string[]>(...args: T) => args;
const VARIANT = tuple("primary", "secondary");
const SIZE = tuple("sm", "md", "lg", "xlg");
const TYPE = tuple("text", "password", "number");

export interface ComponentProps {
  variant?: (typeof VARIANT)[number];
  size?: (typeof SIZE)[number];
  type?: (typeof TYPE)[number];
  value: string;
  placeholder?: string;
  disabled: boolean;
  label?: ReactNode;
  helper?: ReactNode;
  className?: string;
  onChange?: (str: string) => void;
  onClick?: () => void;
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

type ActionProps = ComponentProps & InputProps;

/**
 * Input basic component
 */
export const Input: FC<ActionProps> = ({
  variant = "primary",
  size = "md",
  type = "text",
  className,
  value,
  placeholder,
  disabled,
  label,
  helper,
  onChange,
  onClick,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState<boolean>(!!value);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    onChange && target !== null && onChange(target.value);
  };

  const focusHandler = () => {
    if (!value) {
      setActive(true);
    }
  };

  const blurHandler = () => {
    if (!value) {
      setActive(false);
    }
  };

  return (
    <div
      className={classNames(
        [
          styles[`input`],
          styles[`input--${size}`],
          styles[`input--${variant}`],
          styles[`input--${type}`],
        ],
        className,
        {
          [styles["input--active"]]: active,
          [styles["input--disabled"]]: disabled,
        }
      )}
    >
      {label && <span className={classNames(styles.label)}>{helper}</span>}
      <div className={styles.wrapper}>
        <input
          className={classNames(styles.input)}
          ref={inputRef}
          {...props}
          value={value}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(event) => changeHandler(event)}
          onFocus={() => focusHandler()}
          onBlur={() => blurHandler()}
        />
      </div>
      {helper && <span className={classNames(styles.helper)}>{helper}</span>}
    </div>
  );
};
