/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	
	//This function creates the front dashboard layout in templaye "dashboard.html"
	class Front extends React.Component {
	    constructor() {
	        super();
	        this.state = { result: [] };
	    }

	    componentDidMount() {
	        this.serverRequest = $.post("/getprompts", function (result) {
	            this.setState({ result: result });
	        }.bind(this));
	    }

	    render() {
	        var tab = [];
	        for (var i = 0; i < this.state.result.length; i++) {
	            tab.push(React.createElement(PromptsFront, { prompt: this.state.result[i].text, pid: this.state.result[i].pid }));
	        }
	        return React.createElement(
	            "div",
	            { className: "dashboard_front" },
	            React.createElement(
	                "div",
	                { className: "header" },
	                React.createElement(
	                    "h1",
	                    null,
	                    "Dashboard"
	                ),
	                React.createElement(
	                    "div",
	                    { className: "rectangle" },
	                    React.createElement(
	                        "h1",
	                        null,
	                        "In Progress"
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "current" },
	                    React.createElement(
	                        "div",
	                        { className: "box" },
	                        React.createElement(
	                            "h1",
	                            null,
	                            "Project Name"
	                        ),
	                        React.createElement("img", { className: "pic", src: "../static/images/lion.png", height: 100 })
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "box" },
	                        React.createElement(
	                            "h1",
	                            null,
	                            "Project Name"
	                        ),
	                        React.createElement("img", { className: "pic", src: "../static/images/128x128.png", height: 100 })
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "box" },
	                        React.createElement(
	                            "h1",
	                            null,
	                            "Project Name"
	                        ),
	                        React.createElement("img", { className: "pic", src: "../static/images/wolf.png", height: 100 })
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "box" },
	                        React.createElement(
	                            "h1",
	                            null,
	                            "Project Name"
	                        ),
	                        React.createElement("img", { className: "pic", src: "../static/images/paws.png", height: 100 })
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "following" },
	                React.createElement(
	                    "div",
	                    { className: "rectangle" },
	                    React.createElement(
	                        "h1",
	                        null,
	                        "Daily"
	                    )
	                ),
	                React.createElement("hr", null),
	                React.createElement(
	                    "div",
	                    { className: "current" },
	                    tab
	                )
	            )
	        );
	    }
	};

	//This function creates the class that renders the template for "reading.html"
	class Entry extends React.Component {
	    constructor() {
	        super();
	    }
	    render() {
	        var { title, pic, author, date, text } = this.props;
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "h1",
	                { className: "story_title" },
	                title
	            ),
	            React.createElement(
	                "div",
	                { className: "profile-box" },
	                React.createElement("img", { className: "author_pic img-circular", src: pic, height: 24 }),
	                React.createElement(
	                    "div",
	                    { className: "author_info" },
	                    React.createElement(
	                        "h1",
	                        { className: "author_name" },
	                        author
	                    ),
	                    React.createElement(
	                        "h1",
	                        { className: "date" },
	                        date
	                    )
	                )
	            ),
	            React.createElement(
	                "p",
	                { className: "story_text" },
	                text
	            )
	        );
	    }
	};
	Entry.propTypes = {
	    title: React.PropTypes.string.isRequired // Makes Title a property
	};
	Entry.defaultProps = { // initialize title
	    title: "Title"
	};

	//renders the top stories of the particular prompt
	class Top_Stories extends React.Component {
	    constructor() {
	        super();
	    }

	    render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                { className: "top_story_page" },
	                React.createElement(
	                    "h1",
	                    { className: "top_story_header" },
	                    "Top Stories Today"
	                ),
	                React.createElement("hr", null)
	            ),
	            React.createElement(Entry, { title: "The Second One", text: "         asdasdfasdfasfafasdfasdfafafas", author: "{{firstname}}{{lastname}}", pic: "../static/images/riff.jpg", date: "July 17, 2016" })
	        );
	    }
	}

	//renders the new entry for the prompt
	class DailyPrompt extends React.Component {
	    constructor() {
	        super();
	        this.state = {
	            prompts: [],
	            promptChoice: 0
	        };
	        this.handleChoice = this.handleChoice.bind(this);
	    }

	    handleChoice() {
	        var text = $.post("/getprompts", function (response) {
	            this.setState({ "text": text });
	        });
	        console.log(this.state.text);
	    }

	    componentDidMount() {
	        this.serverRequest = $.post("/getprompts", function (response) {
	            this.setState({ prompts: response });
	        }.bind(this));
	    }

	    render() {
	        var tab = [];
	        for (var i = 0; i < this.state.prompts.length; i++) {
	            tab.push(React.createElement(Prompts, { prompt: this.state.prompts[i].text, pid: this.state.prompts[i].pid }));
	        }
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                { className: "daily_prompt" },
	                tab
	            ),
	            React.createElement(Entry, { title: "The Biggest One", text: "", author: "{{story}} {{lastname}}", pic: "../static/images/riff.jpg", date: "July 17, 2016" })
	        );
	    }

	}

	class Prompts extends React.Component {
	    constructor(props) {
	        super(props);
	        this.prompt = props.prompt;
	        this.state = { promptChoice: 0 };
	        this.handleChoice = this.handleChoice.bind(this);
	    }
	    handleChoice() {
	        var text = $.post("/getprompts", function (response) {
	            this.setState({});
	        });
	        console.log("test");
	    }

	    render() {
	        return React.createElement(
	            "div",
	            { className: "prompt_tab" },
	            React.createElement(
	                "div",
	                { onClick: this.handleChoice, className: "daily_box" },
	                React.createElement(
	                    "p",
	                    null,
	                    this.prompt
	                )
	            )
	        );
	    }
	}

	class PromptsFront extends React.Component {
	    constructor(props) {
	        super(props);
	        this.prompt = props.prompt;
	        this.state = { promptChoice: 0 };
	        this.handleChoice = this.handleChoice.bind(this);
	    }
	    handleChoice() {
	        var text = $.post("/getprompts", function (response) {
	            this.setState({});
	        });
	        console.log("test");
	    }

	    render() {
	        return React.createElement(
	            "div",
	            { className: "daily_box" },
	            React.createElement(
	                "p",
	                null,
	                this.prompt
	            ),
	            React.createElement(
	                "button",
	                { className: "btn dashboard_read" },
	                "Read"
	            ),
	            React.createElement(
	                "button",
	                { className: "btn dashboard_read" },
	                "Write"
	            )
	        );
	    }
	}

	class PromptsWriting extends React.Component {
	    constructor(props) {
	        super(props);
	        this.prompt = props.prompt;
	        this.pid = props.pid;
	    }

	    render() {
	        return React.createElement(
	            "div",
	            { className: "promptInfo" },
	            React.createElement(
	                "a",
	                { href: '/', className: "ph" },
	                React.createElement(
	                    "div",
	                    { className: "p-box" },
	                    React.createElement(
	                        "h1",
	                        { className: "writing_page_prompts" },
	                        this.prompt,
	                        this.pid
	                    )
	                )
	            )
	        );
	    }
	}

	//Switches between the top entries and the newest entries
	class Story extends React.Component {
	    constructor() {
	        super();
	        this.state = {
	            topStories: false
	        };
	        this.handleStories = this.handleStories.bind(this);
	    }

	    handleStories() {
	        this.setState({
	            topStories: !this.state.topStories
	        });
	    }

	    dailyTop(number) {
	        if (number == 1) {
	            return React.createElement(DailyPrompt, null);
	        } else if (number == 0) {
	            return React.createElement(Top_Stories, null);
	        }
	    }

	    render() {
	        const textStory = this.state.topStories ? 'Top Stories' : 'Daily Prompt';
	        var mode = this.state.topStories ? 0 : 1;
	        return React.createElement(
	            "div",
	            { className: "s-tog" },
	            React.createElement("div", { onClick: this.handleStories }),
	            this.dailyTop(mode)
	        );
	    }
	};
	/////////////////////////////////////////////WRITING//////////////////////////////////////////////////////////------------------------------------------------------------------------------------------------------------------------------------
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	class Writing extends React.Component {
	    constructor(props) {
	        super(props);
	        this.pid = props.pid;
	    }

	    render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                { className: "writing_head" },
	                React.createElement(
	                    "button",
	                    { className: "btn submit" },
	                    "Submit"
	                ),
	                React.createElement(
	                    "h1",
	                    null,
	                    "Prompt"
	                ),
	                React.createElement(
	                    "p",
	                    null,
	                    "WordCount:"
	                )
	            ),
	            React.createElement(
	                "section",
	                { className: "writingpage_section" },
	                React.createElement("article", { id: "text", contentEditable: "true", className: "content writingpage_article" })
	            ),
	            React.createElement(Prompt, null)
	        );
	    }
	}

	var Prompt = React.createClass({
	    displayName: "Prompt",

	    propTypes: {
	        title: React.PropTypes.string.isRequired
	    },
	    getDefaultProps: function () {
	        return { title: "Title" };
	    },
	    render: function () {
	        return React.createElement(
	            "div",
	            { className: "prompt" },
	            React.createElement(
	                "h1",
	                null,
	                "ANALYSIS"
	            )
	        );
	    }
	});

	var inArray = function (element, array) {
	    for (var i = array.length - 1; i < array.length; i++) {
	        if (element.localeCompare(array[i]) === 0) {
	            return true;
	        } else {
	            return false;
	        }
	    }
	};

	class WritingSelection extends React.Component {
	    constructor() {
	        super();
	        this.state = { result: [], pid: [] };
	        this.handleChoice = this.handleChoice.bind(this);
	    }

	    componentDidMount() {
	        this.serverRequest = $.post("/getprompts", function (result) {
	            this.setState({ result: result });
	            console.log("result");
	        }.bind(this));
	    }

	    handleChoice() {
	        this.setState({ pid: this.state.result.pid });
	    }

	    render() {
	        var tab = [];
	        for (var i = 0; i < this.state.result.length; i++) {
	            tab.push(React.createElement(PromptsWriting, { prompt: this.state.result[i].text, pid: this.state.result[i].pid }));
	        }
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "h1",
	                { className: "promptOfTheDay" },
	                "PROMPTINFO"
	            ),
	            React.createElement(
	                "div",
	                { className: "selectionBox" },
	                tab
	            )
	        );
	    }
	}

	//
	//ReactDOM.render(<Writing/>, document.getElementById('writing_page'));
	//ReactDOM.render(<Story/>,document.getElementById('story'))
	window.onload = function () {
	    var url = window.location.href.split('/');
	    if (inArray("dashboard", url)) {
	        ReactDOM.render(React.createElement(Front, { pic: "../static/images/lion.jpg" }), document.getElementById('d_board'));
	    } else if (inArray("writing", url)) {
	        ReactDOM.render(React.createElement(WritingSelection, null), document.getElementById('writing_page'));
	    } else if (inArray("reading", url)) {
	        ReactDOM.render(React.createElement(Story, null), document.getElementById('story'));
	    }
	};

/***/ }
/******/ ]);