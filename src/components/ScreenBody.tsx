import * as React from "react";

import { debounce } from "debounce";

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
    private onWindowResize: () => void;

    constructor(props: ScreenBodyProps) {
        super(props);
        this.state = {
            split: "",
            currentSlide: 0,
            ready: false,
        };
        this.onWindowResize = debounce(() => {
            this.reset();
        }, 100);
    }

    public componentWillUnmount() {
        window.removeEventListener("resize", this.onWindowResize);
    }

    public componentDidMount() {
        this.reset(true);
        this.setState({ ready: true });
        window.addEventListener("resize", this.onWindowResize);
    }

    public render(): JSX.Element {
        const { ready } = this.state;
        return (
            <div className={`screen-body ${ready ? "ready" : ""}`} ref={this.elementRef}>
                {this.props.children}
            </div>
        );
    }

    private reset = (hard?: boolean) => {
        try {
            if (hard) {
                const splittingOptions = {
                    type: "lines",
                    linesClass: "line line++",
                };
                this.splitText = new SplitText(this.elementRef.current, splittingOptions);
            } else {
                this.splitText.split();
            }
        } catch (err) {
            console.error(err);
        }
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
