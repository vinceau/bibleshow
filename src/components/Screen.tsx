import * as React from "react";
import { Subscribe } from "unstated";

import { AppContainer } from "../store/containers/appContainer";
import { ScreenBody } from "./ScreenBody";


export const Screen = () => {
    return (
        <Subscribe to={[AppContainer]}>
            {(container: AppContainer) => (
                <div className="screen">
                    <h1>{container.state.query}</h1>
                    <ScreenBody text={JSON.stringify(container.state.passages)} />
                </div>
            )}
        </Subscribe>
    );
};
