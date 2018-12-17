import * as React from "react";

interface SearchBoxProps {
    handleSearch: (query: string) => void;
    placeholder?: string;
    initialValue?: string;
}

interface SearchBoxState {
    query: string;
}

/**
 * SearchBox is a visual component for displaying
 */
export class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
    constructor(props: SearchBoxProps) {
        super(props);
        const query = props.initialValue ? props.initialValue : "";
        this.state = {
            query,
        };
    }

    public render(): JSX.Element {
        const { placeholder } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.query} placeholder={placeholder} onChange={this.handleChange} />
            </form>
        );
    }

    private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.handleSearch(this.state.query);
    }

    private handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const query = (event.target as HTMLInputElement).value;
        this.setState({ query });
    }
}
