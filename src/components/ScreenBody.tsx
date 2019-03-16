import * as React from "react";

interface ScreenBodyProps {
}

interface ScreenBodyState {
    // tslint:disable-next-line:no-any
    split: any;
    currentSlide: number;
    ready: boolean;
}

/**
 * ScreenBody is a visual component for displaying
 */

export class ScreenBody extends React.Component<ScreenBodyProps, ScreenBodyState> {
    // tslint:disable-next-line:no-any
    private splitText: any;
    private elementRef = React.createRef<HTMLDivElement>();

    constructor(props: ScreenBodyProps) {
        super(props);
        this.state = {
            split: "",
            currentSlide: 0,
            ready: false,
        };
    }

    public componentDidMount() {
        this.setState({ ready: true });
        try {
            const splittingOptions = {
                type: "lines",
                linesClass: "line line++",
            };
            this.splitText = new SplitText(this.elementRef.current, splittingOptions);
        } catch (err) {
            console.error(err);
        }
    }

    public render(): JSX.Element {
        const { ready } = this.state;
        return (
            <div className={`screen-body ${ready ? "ready" : ""}`} ref={this.elementRef}>
                {this.props.children}
            </div>
        );
    }

    /*
    private next = () => {
        this.setState({ currentSlide: this.state.currentSlide + 1 });
    }

    private prev = () => {
        this.setState({ currentSlide: Math.max(this.state.currentSlide - 1, 0) });
    }
    */
}
