import * as React from "react";

import { connect, ConnectedProps } from "../store/connect";
import { AppContainer } from "../store/containers/AppContainer";
import { ScreenBody } from "./ScreenBody";

class ScreenClass extends React.Component<ConnectedProps> {
    private readonly appContainer: AppContainer;

    constructor(props: ConnectedProps) {
        super(props);
        [this.appContainer] = this.props.containers;
    }

    public render() {
        return (
            <div className="screen">
                <h1>{this.appContainer.state.query}</h1>
                <ScreenBody text={JSON.stringify(this.appContainer.state.passages)} />
            </div>
        );
    }
}

export const Screen = connect<ConnectedProps>([AppContainer])(ScreenClass);
