import * as React from "react";

import { Subscribe } from "unstated";

import { AppStateContainer } from "../store";
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
            <Subscribe to={[AppStateContainer]}>
                {(state: AppStateContainer) => (
                    <SearchBox handleSearch={async (query) => { await state.setPassage(query); }} />
                )}
            </Subscribe>
        );
    }
}
