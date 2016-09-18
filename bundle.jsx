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

	import React from 'react';

	function Front() {
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
	          " In Progress "
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
	          " Daily "
	        )
	      ),
	      React.createElement("hr", null),
	      React.createElement(
	        "div",
	        { className: "current" },
	        React.createElement(
	          "div",
	          { className: "daily_box" },
	          React.createElement(
	            "p",
	            null,
	            "Prompt"
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
	        ),
	        React.createElement(
	          "div",
	          { className: "daily_box" },
	          React.createElement(
	            "p",
	            null,
	            "Prompt"
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
	        ),
	        React.createElement(
	          "div",
	          { className: "daily_box" },
	          React.createElement(
	            "p",
	            null,
	            "Prompt"
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
	        ),
	        React.createElement(
	          "div",
	          { className: "daily_box" },
	          React.createElement(
	            "p",
	            null,
	            "Prompt"
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
	        )
	      )
	    )
	  );
	}

	ReactDOM.render(React.createElement(Front, { pic: "../static/images/lion.jpg" }), document.getElementById('d_board'));

	/////////////////
	class Entry extends React.Component {
	  constructor() {
	    super();
	  }render() {
	    var { title, pic, author, date, text } = this.props;return React.createElement(
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
	};Entry.propTypes = { title: React.PropTypes.string.isRequired };Entry.defaultProps = { title: "Title" };

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
	      React.createElement(Entry, { title: "The Second One", text: "changed. ",
	        author: "{{firstname}} {{lastname}}", pic: "../static/images/riff.jpg", date: "July 17, 2016" })
	    );
	  }
	}

	class DailyPrompt extends React.Component {
	  constructor() {
	    super();
	  }

	  render() {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "div",
	        { className: "daily_prompt" },
	        React.createElement(
	          "h1",
	          { className: "daily" },
	          "Prisoners won't try to excape if they don't even know they are in prison."
	        ),
	        React.createElement("hr", null)
	      ),
	      React.createElement(Entry, { title: "The Biggest One", text: "He house was filled with tears of sadness, joy and laughter. Long hugs, intense and heartfelt kisses, jokes to cheer up the inevitability of a saddened mood. Chris sat on the couch, surrounded by his friends and his family, and he couldn't but smile. The melancholy of the situation weighed on him, and yet there was this feeling that he couldn't shake off. ''If we have to go, then this is a pretty decent way of going.'' The crash of the two planets had been predicted to happen at 5:55AM EST, 25th October 2015. The planet had come in NASA's sights roughly a month ago, and from that moment on everything changed. He house was filled with tears of sadness, joy and laughter. Long hugs, intense and heartfelt kisses, jokes to cheer up the inevitability of a saddened mood. Chris sat on the couch, surrounded by his friends and his family, and he couldn't but smile. The melancholy of the situation weighed on him, and yet there was this feeling that he couldn't shake off. ''If we have to go, then this is a pretty decent way of going.'' The crash of the two planets had been predicted to happen at 5:55AM EST, 25th October 2015. The planet had come in NASA's sights roughly a month ago, and from that moment on everything changed. He house was filled with tears of sadness, joy and laughter. Long hugs, intense and heartfelt kisses, jokes to cheer up the inevitability of a saddened mood. Chris sat on the couch, surrounded by his friends and his family, and he couldn't but smile. The melancholy of the situation weighed on him, and yet there was this feeling that he couldn't shake off. ''If we have to go, then this is a pretty decent way of going.'' The crash of the two planets had been predicted to happen at 5:55AM EST, 25th October 2015. The planet had come in NASA's sights roughly a month ago, and from that moment on everything changed. ",
	        author: "{{firstname}} {{lastname}}", pic: "../static/images/riff.jpg", date: "July 17, 2016" })
	    );
	  }

	}

	class Story extends React.Component {
	  constructor() {
	    super();
	    this.state = { topStories: false };
	    this.handleStories = this.handleStories.bind(this);
	  }

	  handleStories() {
	    this.setState({ topStories: !this.state.topStories });
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
	ReactDOM.render(React.createElement(Story, null), document.getElementById('story'));
	/////////////////////////////////////////////
	class Writing extends React.Component {
	  constructor() {
	    super();
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
	      )
	    );
	  }
	}
	var Prompt = React.createClass({
	  displayName: "Prompt",

	  propTypes: { title: React.PropTypes.string.isRequired },
	  getDefaultProps: function () {
	    return { title: "Title" };
	  },
	  render: function () {
	    return React.createElement(
	      "h1",
	      null,
	      this.props.title
	    );
	  } });ReactDOM.render(React.createElement(Prompt, { title: "ANALYSIS" }), document.getElementById('prompt'));
	ReactDOM.render(React.createElement(Writing, null), document.getElementById('writing_page'));

/***/ }
/******/ ]);