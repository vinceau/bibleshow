import * as React from "react";

import { Subscribe } from "unstated";

import { AppContainer } from "../store/containers/appContainer";
import { SearchBox } from "./SearchBox";

interface MenuProps {
}

interface MenuState {
}

/**
 * Menu is a visual component for displaying
 */
export class Menu extends React.Component<MenuProps, MenuState> {
    public render(): JSX.Element {
        return (
            <Subscribe to={[AppContainer]}>
                {(state: AppContainer) => (
                    <SearchBox handleSearch={async (query) => { await state.setPassage(query); }} />
                )}
            </Subscribe>
        );
    }
}
