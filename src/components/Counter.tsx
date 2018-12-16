import * as React from "react";
import { Container, Subscribe } from "unstated";

interface ICounterState {
    count: number;
}

export class CounterContainer extends Container<ICounterState> {
    public state = {
        count: 0
    };

    public async increment() {
        await this.setState({ count: this.state.count + 1 });
    }

    public async decrement() {
        await this.setState({ count: this.state.count - 1 });
    }
}

export const Counter = () => {
    return (
        <Subscribe to={[CounterContainer]}>
            {(counter: CounterContainer) => (
                <div>
                    <button onClick={() => counter.decrement()}>-</button>
                    <span>{counter.state.count}</span>
                    <button onClick={() => counter.increment()}>+</button>
                </div>
            )}
        </Subscribe>
    );
};
