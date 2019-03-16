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
        const { passages, currentPassage } = this.appContainer.state;
        if (passages.length === 0) {
            return <></>;
        }
        const { title, verses } = passages[currentPassage];
        return (
            <div className="screen">
                <h1>{title}</h1>
                <ScreenBody>
                    <p>{verses.map((verse) => `${verse.number} ${verse.text} `)}</p>
                </ScreenBody>
            </div>
        );
    }
}

export const Screen = connect<ConnectedProps>([AppContainer])(ScreenClass);
