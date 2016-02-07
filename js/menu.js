const BlockComponent = React.createClass({
    render: function() {
        var id = 'block' + this.props.bid;
        var text = '';
        $.each(this.props.verses, function(k, v) {
            text += k + ' ' + v + ' ';
        });
        return (
            <div id={id} className="passage">{text}</div>
        );
    }
});


const PassageContent = React.createClass({
    getInitialState: function() {
        return {
            currentBlock: 0,
            headers: ['Loading...'],
            blocks: ['']
        };
    },
    componentWillMount: function() {
        var success = (d) => {
            var headers = [];
            var blocks = [];
            console.log('yay');
            console.log(d);
            for (var i = 0; i < d.passages.length; i++ ) {
                var data = d.passages[i];
                headers.push(data.title);
                blocks.push(<BlockComponent bid={i} verses={data.verses}/>);
            }
            this.setState({
                headers: headers,
                blocks: blocks
            });
        };
        var fail = () => {
            console.log('nope');
        };
        get_passage(this.props.passage, success, fail);
    },
    render: function() {
        return (
        <div>
            <h1 id="header">{this.state.headers[this.state.currentBlock]}</h1>
            <div id="content">
                <div id="text_body">
                    {this.state.blocks[this.state.currentBlock]}
                </div>
            </div>
        </div>
        );
    }
});

const MainContent = React.createClass({
    getInitialState: function() {
        var passage = Cookies.get('passage');
        if (!passage) {
            passage = 'Gen 1';
        }
        return {
            passage: passage
        };
    },
    render: function() {
        return (
        <div id="content-wrapper" className="serif">
            <PassageContent passage={this.state.passage} />
        </div>
        );
    }
});

ReactDOM.render(<MainContent />, document.getElementById('main-hook'));
