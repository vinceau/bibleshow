import * as React from "react";
import { Subscribe } from "unstated";

import { AppStateContainer } from "../store";


export const Screen = () => {
    return (
        <Subscribe to={[AppStateContainer]}>
            {(container: AppStateContainer) => (
                <div className="screen">
                    <h1>{container.state.query}</h1>
                    <b>{JSON.stringify(container.state.passages)}</b>
                </div>
            )}
        </Subscribe>
    );
};
