const BlockComponent = React.createClass({
    componentDidUpdate: function() {
        this.lineSplit();
    },
    componentDidMount: function() {
        this.lineSplit();
    },
    lineSplit: function() {
        var st = new SplitText('#block' + this.props.bid, {
            type: 'lines',
            linesClass: 'line line++',
        });
    },
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
            currentBlock: 0
        };
    },
    nextPassage: function() {
        this.setState({
            currentBlock: this.state.currentBlock + 1
        });
    },
    render: function() {
        var headers = [];
        var blocks = [];
        for (var i = 0; i < this.props.passages.length; i++ ) {
            var data = this.props.passages[i];
            headers.push(data.title);
            blocks.push(<BlockComponent bid={i} verses={data.verses} reset={this.reset}/>);
        }
        return (
        <div>
            <h1 id="header">{headers[this.state.currentBlock]}</h1>
            <div id="content">
                <div id="text_body">
                    {blocks[this.state.currentBlock]}
                </div>
            </div>
        </div>
        );
    }
});

const TopBar = React.createClass({
    render: function() {
        var menuText = this.props.menuOpened ? 'close' : 'menu';
        var menuClass = classNames('menu-icon', {
            'active': this.props.menuOpened
        });
        return (
            <div className="top-bar">
                <div id="trigger-menu" onClick={this.props.onMenuClick} className={menuClass}>
                    <span></span>
                    <div className="title">{menuText}</div>
                </div>
                <div className="controls">
                    <div id="prev" title="Previous" className="control-button" ><span className="glyphicon glyphicon-triangle-left"></span></div>
                    <div id="next" title="Next" className="control-button" ><span className="glyphicon glyphicon-triangle-right"></span></div>
                    <div id="full" title="Toggle Fullscreen" className="control-button" ><span className="glyphicon glyphicon-resize-full"></span></div>
                </div>
            </div>
        );
    }
});

const Pusher = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var query = $('#search').val();
        if (query) {
            this.props.onSearchSubmit(query);
            $('#search').blur();
        }
    },
    render: function() {
        return (
        <div className="pusher">
            <div className="menu">
                <div className="menu-section nav-search">
                    <div className="form-title"><span className="mini-icon glyphicon glyphicon-search"></span>Search</div>
                    <form id="search_form" onSubmit={this.handleSubmit}>
                        <input id="search" placeholder={this.props.defaultPassage} type="text" />
                        <button type="submit">
                            <i className="icon-search" aria-hidden="true" data-icon="⚲"></i>
                        </button>
                    </form>
                </div>
                <div className="menu-section">
                    <div className="form-title"><span className="mini-icon glyphicon glyphicon-font"></span>Font</div>
                    <select id="font-select" className="form-control">
                        <option className="serif" value="serif">Times</option>
                        <option className="sans-serif" value="sans-serif">Arial</option>
                    </select> 
                </div>
                <div className="menu-section">
                    <div className="form-title"><span className="mini-icon glyphicon glyphicon-align-left"></span>Align</div>
                    <div className="btn-group">
                        <button type="button" title="Left Align" data-keyword="left" className="align-btn btn btn-default" aria-label="Left Align">
                            <span className="glyphicon glyphicon-align-left" aria-hidden="true"></span>
                        </button>
                        <button type="button" title="Center Align" data-keyword="center" className="align-btn btn btn-default" aria-label="Center Align">
                            <span className="glyphicon glyphicon-align-center" aria-hidden="true"></span>
                        </button>
                        <button type="button" title="Right Align" data-keyword="right" className="align-btn btn btn-default" aria-label="Right Align">
                            <span className="glyphicon glyphicon-align-right" aria-hidden="true"></span>
                        </button>
                        <button type="button" title="Justify" data-keyword="justify" className="align-btn btn btn-default" aria-label="Justify">
                            <span className="glyphicon glyphicon-align-justify" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                <hr />
                <div className="menu-section">
                    <div className="form-title form-label"><span className="mini-icon glyphicon glyphicon-text-size"></span>Font Size</div>
                    <div className="btn-group">
                        <button id="ft-dec-btn" type="button" title="Decrease Font Size" className="btn btn-default">
                            <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
                        </button>
                        <button id="ft-inc-btn" type="button" title="Increase Font Size" className="btn btn-default" aria-label="Center Align">
                            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                <div className="menu-section">
                    <div className="form-title form-label"><span className="mini-icon glyphicon glyphicon-text-width"></span>Margin</div>
                    <div className="btn-group">
                        <button id="mg-dec-btn" type="button" title="Decrease Margins" className="btn btn-default">
                            <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
                        </button>
                        <button id="mg-inc-btn" type="button" title="Increase Margins" className="btn btn-default">
                            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                <div className="menu-section">
                    <div className="form-title form-label"><span className="mini-icon glyphicon glyphicon-text-height"></span>Line Height</div>
                    <div className="btn-group">
                        <button id="lh-dec-btn" type="button" title="Decrease Line Height" className="btn btn-default">
                            <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
                        </button>
                        <button id="lh-inc-btn" type="button" title="Increase Line Height" className="btn btn-default">
                            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
                <hr />
                <div className="menu-section">
                    <div className="form-title form-label"><span className="mini-icon glyphicon glyphicon-adjust"></span>Invert</div>
                    <button id="invert-btn" title="Invert Colours" type="button" className="btn btn-default">
                        <span className="white-on-black glyphicon glyphicon-text-background" aria-hidden="true"></span>
                    </button>
                </div>
                <div className="menu-section">
                    <div className="form-title form-label"><span className="mini-icon glyphicon glyphicon-flash"></span>Reset</div>
                    <button id="reset-btn" title="Reset Settings" type="button" className="btn btn-default">
                        <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                    </button>
                </div>
                <hr />
                <div className="menu-section menu-footer">
                    <p><b><a target="_blank" href="http://github.com/vinceau/bibleshow">BibleShow</a> &copy; 2015</b></p>
                    <p>Made with love<br />by <a target="_blank" href="http://vinceau.github.io/">Vincent Au</a></p>
                </div>
                <div className="menu-fix"></div>
            </div>
        </div>
        );
    }
});

const MainContent = React.createClass({
    getInitialState: function() {
        return {
            menuOpened: false,
            passages: {}
        };
    },
    onMenuClick: function() {
        this.setState({
            menuOpened: !this.state.menuOpened
        });
    },
    onSearchSubmit: function(query) {
        this.loadQuery(query);
    },
    loadQuery: function(query) {
        var success = function(d) {
            console.log('yay');
            console.log(d);
            this.setState({
                passages: d.passages
            });
            Cookies.set('passage', query);
        }.bind(this);
        var fail = function() {
            console.log('Failed to load passage(s).');
        };
        get_passage(query, success, fail);
    },
    componentWillMount: function() {
        var passage = Cookies.get('passage');
        if (!passage) {
            passage = this.props.defaultPassage;
        }
        this.loadQuery(passage);
    },
    render: function() {
        var contClass = classNames({
            'menu-open' : this.state.menuOpened
        });
        return (
        <div id="container" className={contClass}>
            <TopBar onMenuClick={this.onMenuClick}
                    menuOpened={this.state.menuOpened} />
            <Pusher onSearchSubmit={this.onSearchSubmit}
                    defaultPassage={this.props.defaultPassage} />
            <div id="content-wrapper" className="serif">
                <PassageContent passages={this.state.passages} />
            </div>
        </div>
        );
    }
});


ReactDOM.render(<MainContent defaultPassage="Gen 1-2" />, document.getElementById('main-hook'));
