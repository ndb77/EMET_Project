import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
        </div>
        <div style={{"justifyContent":"flex-start", "gridTemplateRows":"auto minmax(auto,400px)"}}>{children}</div>
      </div>
    </>
  );
}
