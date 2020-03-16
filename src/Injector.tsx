import React, { useContext } from "react";
import { store as s } from "@risingstack/react-easy-state";

// Input
export enum Stores {
  Counter = "COUNTER"
}

const SC = {
  [Stores.Counter]: s({
    counter: 3
  })
};
// \Input

export type SC_t = typeof SC;

const StoreContext = React.createContext(SC);

export const useStore = (key: Stores) => {
  const storeContext = useContext(StoreContext);
  if (!storeContext[key]) {
    throw new Error(`Store: "${key}" is not registered!`);
  }
  return storeContext[key]!;
};

export const injectStores = (
  Component: React.ComponentType<any>,
  ...selectors: Stores[]
): React.ComponentType<any> => (props: any) => {
  const stores: Partial<SC_t> = selectors.reduce((prev, key) => {
    return Object.assign(prev, {
      [key]: useStore(key)
    });
  }, {});
  return <Component {...stores} {...props} />;
};

export const Provider: React.FC = props => (
  <StoreContext.Provider value={SC}>{props.children}</StoreContext.Provider>
);
