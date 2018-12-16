import * as React from "react";
import { Container, Provider, Subscribe } from "unstated";

interface ICounterState {
    count: number;
}

class CounterContainer extends Container<ICounterState> {
    public state = {
        count: 0
    };

    public increment() {
        this.setState({ count: this.state.count + 1 });
    }

    public decrement() {
        this.setState({ count: this.state.count - 1 });
    }
}

export const Counter = () => {
    return (
        <Provider>
            <Subscribe to={[CounterContainer]}>
                {(counter: CounterContainer) => (
                    <div>
                        <button onClick={() => counter.decrement()}>-</button>
                        <span>{counter.state.count}</span>
                        <button onClick={() => counter.increment()}>+</button>
                    </div>
                )}
            </Subscribe>
        </Provider>
    );
};
