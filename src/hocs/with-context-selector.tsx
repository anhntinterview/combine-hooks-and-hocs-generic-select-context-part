import React, { ComponentType } from "react";
import { useFormContext, Context } from "../context";

export const withContextSelector = <
  TProps extends unknown,
  TValue extends unknown
>(
  Component: ComponentType<TProps & Record<string, TValue>>,
  selectors: Record<string, (data: Context) => TValue>
): ComponentType<Record<string, TValue>> => {
  const MemoisedComponent = React.memo(Component) as ComponentType<
    Record<string, TValue>
  >;

  return (props: TProps & Record<string, TValue>) => {
    const data = useFormContext();
    const contextProps = Object.keys(selectors).reduce((acc, key) => {
      acc[key] = selectors[key](data);

      return acc;
    }, {});

    return <MemoisedComponent {...props} {...contextProps} />;
  };
};
