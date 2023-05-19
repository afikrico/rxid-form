import React, { FunctionComponent } from "react";

interface Props {
  children: JSX.Element | Array<JSX.Element>;
  label?: string;
  htmlFor?: string;
  required?: boolean;
}

export const Group: FunctionComponent<Props> = ({
  children,
  label,
  htmlFor,
  required,
}) => {
  return (
    <div className="custom-form-group mb-3">
      {label && (
        <label
          className={"mb-1" + (required ? " required" : "")}
          htmlFor={htmlFor}
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );
};
