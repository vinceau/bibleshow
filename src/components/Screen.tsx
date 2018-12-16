import * as React from "react";
import { Subscribe } from "unstated";

import { CounterContainer } from "./Counter";


export const Screen = () => {
    return (
        <Subscribe to={[CounterContainer]}>
            {(counter: CounterContainer) => (
                <div>
                    <b>{counter.state.count}</b>
                </div>
            )}
        </Subscribe>
    );
};
