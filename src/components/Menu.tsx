import * as React from "react";

import { connect, ConnectedProps } from "../store/connect";
import { AppContainer } from "../store/containers/AppContainer";
import { SearchBox } from "./SearchBox";

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
            <div className="menu">
                <SearchBox handleSearch={async (query) => { await this.appContainer.setPassages(query); }} />
                <button onClick={this.appContainer.prevPassage}>Prev</button>
                <button onClick={this.appContainer.nextPassage}>Next</button>
            </div>
        );
    }
}

export const Menu = connect<MenuProps>([AppContainer])(MenuClass);
