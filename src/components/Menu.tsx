import * as React from "react";

import { AppContainer } from "../store/containers/appContainer";
import { SearchBox } from "./SearchBox";
import { ConnectedProps, connect } from "../store/connect";

interface MenuProps extends ConnectedProps {
}

interface MenuState {
}

/**
 * Menu is a visual component for displaying
 */
class MenuClass extends React.Component<MenuProps, MenuState> {
    private readonly appContainer: AppContainer;

    constructor(props: MenuProps) {
        super(props);
        [this.appContainer] = this.props.containers;
    }

    public render(): JSX.Element {
        return (
            <SearchBox handleSearch={async (query) => { await this.appContainer.setPassage(query); }} />
        );
    }
}

export const Menu = connect<MenuProps>([AppContainer])(MenuClass);