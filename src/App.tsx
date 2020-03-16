import React, { useCallback } from "react";
import { view as v } from "@risingstack/react-easy-state";
import { injectStores, Stores, SC_t } from "./Injector";

type CounterPageProps = { greeting: string } & SC_t;

const CounterPage: React.FC<CounterPageProps> = v(
  ({ [Stores.Counter]: counterStore, greeting }) => {
    const onChange = useCallback(
      ev => {
        if (ev?.target?.value) {
          counterStore.counter = ev.target.value;
        }
      },
      [counterStore.counter]
    );

    return (
      <div>
        <h1>{greeting}!</h1>
        <span>Counter is {counterStore.counter}</span>
        <input type="number" value={counterStore.counter} onChange={onChange} />
      </div>
    );
  }
);

const CounterPageInjected = injectStores(CounterPage, Stores.Counter);

export const App = () => {
  return <CounterPageInjected greeting="Hello" />;
};
