import { FunctionComponent } from "react";

interface Props {
  children: JSX.Element | Array<JSX.Element>;
  header?: string;
}

export const Card: FunctionComponent<any> = ({ children, header }) => {
  return (
    <>
      <div className="card my-4">
        {header && (
          <div className="card-header">
            <h2 className="mb-0">User Form</h2>
          </div>
        )}
        <div className="card-body">{children}</div>
      </div>
    </>
  );
};
