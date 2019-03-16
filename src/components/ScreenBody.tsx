import * as React from "react";

// import Splitting from "splitting";

interface ScreenBodyProps {
    text: string;
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
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus sem leo, sed imperdiet felis vestibulum ac. Nam eu augue sit amet felis imperdiet maximus. Phasellus porta rutrum placerat. Maecenas eget ornare nibh, a vestibulum diam. Suspendisse eu tincidunt quam. Nam consequat augue eget tortor porta, quis sodales lectus convallis. Duis sagittis sodales tristique. Praesent pretium ipsum sed felis laoreet faucibus. In ut magna finibus orci lacinia convallis. Cras ligula eros, euismod eleifend velit id, varius pretium orci. Nullam id sodales ex, quis interdum leo. Donec eu imperdiet leo. Fusce erat nunc, consectetur non lorem quis, volutpat auctor neque. Sed fermentum leo vel felis pellentesque ultricies.
</p>
                <p>
                    Nullam enim nunc, mollis ut blandit sed, pretium non dolor. Etiam sollicitudin fringilla quam sed blandit. Duis in sapien leo. Suspendisse vitae facilisis lacus. Aenean condimentum, magna eget aliquet pulvinar, ipsum odio sodales metus, ut lacinia leo neque sed ante. Sed facilisis leo non felis faucibus, id finibus justo hendrerit. Morbi et risus felis. Fusce ut mattis neque. Sed tristique est congue dui tempus bibendum. Donec nibh magna, maximus sit amet velit sit amet, rutrum elementum nisl. Integer at ornare diam.
</p>
                <p>
                    Quisque enim turpis, ullamcorper in eros at, suscipit imperdiet sapien. Vestibulum laoreet sagittis augue, ut vulputate purus sollicitudin vitae. Fusce ultricies rutrum rutrum. Phasellus rutrum laoreet mi nec pellentesque. Aenean nec elit mattis, consequat odio a, mattis risus. Maecenas sodales, arcu ut feugiat bibendum, nulla ligula tempus velit, eu tempor libero dolor ac arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer eleifend a risus et dapibus. Sed feugiat, justo pharetra luctus suscipit, est orci ultrices nisl, id hendrerit quam felis eget justo. Ut lacus tellus, aliquet vitae vehicula sed, auctor vel dolor. Phasellus convallis dui sed ligula accumsan maximus. Donec tempus nisl mi, nec placerat erat venenatis nec. Fusce ex nulla, dapibus nec bibendum eget, sollicitudin at tortor. Nullam accumsan cursus iaculis. Praesent tristique et diam in pharetra. Proin placerat, magna non tempus laoreet, sapien nisl blandit metus, in cursus metus diam id arcu.
                        </p>
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus sem leo, sed imperdiet felis vestibulum ac. Nam eu augue sit amet felis imperdiet maximus. Phasellus porta rutrum placerat. Maecenas eget ornare nibh, a vestibulum diam. Suspendisse eu tincidunt quam. Nam consequat augue eget tortor porta, quis sodales lectus convallis. Duis sagittis sodales tristique. Praesent pretium ipsum sed felis laoreet faucibus. In ut magna finibus orci lacinia convallis. Cras ligula eros, euismod eleifend velit id, varius pretium orci. Nullam id sodales ex, quis interdum leo. Donec eu imperdiet leo. Fusce erat nunc, consectetur non lorem quis, volutpat auctor neque. Sed fermentum leo vel felis pellentesque ultricies.
</p>
                <p>
                    Nullam enim nunc, mollis ut blandit sed, pretium non dolor. Etiam sollicitudin fringilla quam sed blandit. Duis in sapien leo. Suspendisse vitae facilisis lacus. Aenean condimentum, magna eget aliquet pulvinar, ipsum odio sodales metus, ut lacinia leo neque sed ante. Sed facilisis leo non felis faucibus, id finibus justo hendrerit. Morbi et risus felis. Fusce ut mattis neque. Sed tristique est congue dui tempus bibendum. Donec nibh magna, maximus sit amet velit sit amet, rutrum elementum nisl. Integer at ornare diam.
</p>
                <p>
                    Quisque enim turpis, ullamcorper in eros at, suscipit imperdiet sapien. Vestibulum laoreet sagittis augue, ut vulputate purus sollicitudin vitae. Fusce ultricies rutrum rutrum. Phasellus rutrum laoreet mi nec pellentesque. Aenean nec elit mattis, consequat odio a, mattis risus. Maecenas sodales, arcu ut feugiat bibendum, nulla ligula tempus velit, eu tempor libero dolor ac arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer eleifend a risus et dapibus. Sed feugiat, justo pharetra luctus suscipit, est orci ultrices nisl, id hendrerit quam felis eget justo. Ut lacus tellus, aliquet vitae vehicula sed, auctor vel dolor. Phasellus convallis dui sed ligula accumsan maximus. Donec tempus nisl mi, nec placerat erat venenatis nec. Fusce ex nulla, dapibus nec bibendum eget, sollicitudin at tortor. Nullam accumsan cursus iaculis. Praesent tristique et diam in pharetra. Proin placerat, magna non tempus laoreet, sapien nisl blandit metus, in cursus metus diam id arcu.
                        </p>
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tempus sem leo, sed imperdiet felis vestibulum ac. Nam eu augue sit amet felis imperdiet maximus. Phasellus porta rutrum placerat. Maecenas eget ornare nibh, a vestibulum diam. Suspendisse eu tincidunt quam. Nam consequat augue eget tortor porta, quis sodales lectus convallis. Duis sagittis sodales tristique. Praesent pretium ipsum sed felis laoreet faucibus. In ut magna finibus orci lacinia convallis. Cras ligula eros, euismod eleifend velit id, varius pretium orci. Nullam id sodales ex, quis interdum leo. Donec eu imperdiet leo. Fusce erat nunc, consectetur non lorem quis, volutpat auctor neque. Sed fermentum leo vel felis pellentesque ultricies.
</p>
                <p>
                    Nullam enim nunc, mollis ut blandit sed, pretium non dolor. Etiam sollicitudin fringilla quam sed blandit. Duis in sapien leo. Suspendisse vitae facilisis lacus. Aenean condimentum, magna eget aliquet pulvinar, ipsum odio sodales metus, ut lacinia leo neque sed ante. Sed facilisis leo non felis faucibus, id finibus justo hendrerit. Morbi et risus felis. Fusce ut mattis neque. Sed tristique est congue dui tempus bibendum. Donec nibh magna, maximus sit amet velit sit amet, rutrum elementum nisl. Integer at ornare diam.
</p>
                <p>
                    Quisque enim turpis, ullamcorper in eros at, suscipit imperdiet sapien. Vestibulum laoreet sagittis augue, ut vulputate purus sollicitudin vitae. Fusce ultricies rutrum rutrum. Phasellus rutrum laoreet mi nec pellentesque. Aenean nec elit mattis, consequat odio a, mattis risus. Maecenas sodales, arcu ut feugiat bibendum, nulla ligula tempus velit, eu tempor libero dolor ac arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer eleifend a risus et dapibus. Sed feugiat, justo pharetra luctus suscipit, est orci ultrices nisl, id hendrerit quam felis eget justo. Ut lacus tellus, aliquet vitae vehicula sed, auctor vel dolor. Phasellus convallis dui sed ligula accumsan maximus. Donec tempus nisl mi, nec placerat erat venenatis nec. Fusce ex nulla, dapibus nec bibendum eget, sollicitudin at tortor. Nullam accumsan cursus iaculis. Praesent tristique et diam in pharetra. Proin placerat, magna non tempus laoreet, sapien nisl blandit metus, in cursus metus diam id arcu.
                        </p>
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
