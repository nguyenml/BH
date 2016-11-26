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

	/* UTILITIES */

	var inArray = function (element, array) {
	  for (var i = array.length - 1; i < array.length; i++) {
	    if (element.localeCompare(array[i]) === 0) {
	      return true;
	    } else {
	      return false;
	    }
	  }
	};

	var writingHandlers = function () {
	  $("#publish-button").click(function (e) {});

	  $('#text').on('input', function () {
	    console.log("Test");
	    var text = this.textContent,
	        count = text.trim().replace(/\s+/g, ' ').split(' ').length;
	    $('.words').text(count);
	  });
	};

	var IO = function () {
	  SAVE_INTERVAL = 1500;
	  autoSave = null; // Save Timeout object
	  saveObject = null; // Save request object
	  loadObject = null; // Load request object
	  voteObject = null; // Vote
	  commentObject = null;

	  var loginHandler = function () {
	    var data = {};
	    var inputs = $('#login-form :input');
	    $('#login-submit').each(function (e) {
	      data[e.name] = e.value;
	    });
	  };

	  var saveText = function (pid) {
	    var data = {
	      prompt_id: pid,
	      text: $('#text').text()
	    };
	    if (saveObject) {
	      saveObject.abort();
	      saveObject = null;
	    }
	    saveObject = $.post('/save', data = data, function (response, status_code, xhr) {
	      if (response === 'SUCCESS') {} else {
	        console.log("Save failed.");
	      }
	    });
	  };

	  var publishText = function (pid) {
	    var data = {
	      prompt_id: pid
	    };
	    $.post('/publish', data = data, function (response, status_code, xhr) {
	      if (response === 'SUCCESS') {} else {
	        saveText(pid);
	        console.log("Published failed");
	      }
	    });
	  };

	  var loadText = function (pid) {
	    var data = {
	      prompt_id: pid
	    };
	    $.post('/load', data = data, function (text, status_code, xhr) {
	      if (status_code === 'success') {
	        $('#text').text(text);
	      } else {
	        console.log('load fail');
	      }
	    });
	  };

	  var loadRandomText = function (pid) {
	    var data = {
	      prompt_id: pid
	    };
	    if (loadObject) {
	      loadObject.abort();
	      loadObject = null;
	    }
	    loadObject = $.post('/loadrandom', data = data, function (response, status_code, xhr) {
	      if (status_code === 'success') {
	        $('#text').text(response["text"]);
	      } else {}
	    });
	    return piece_id;
	  };

	  var setAutoSave = function (pid) {
	    $("#text").on("input propertychange change", function (e) {
	      console.log("Input");
	      clearTimeout(autoSave);
	      autoSave = setTimeout(function () {
	        saveText(pid);
	      }, SAVE_INTERVAL);
	    });
	  };

	  var clearLoad = function () {
	    loadObject.abort();
	    loadObject = null;
	  };

	  var vote = function (piece_id) {
	    var data = { piece_id: piece_id };
	    voteObject = $.post('/vote', data = data, function (response, status_code, xhr) {
	      if (status_code === "success") {
	        return true;
	      } else {
	        return false;
	      }
	    });
	    return voteObject;
	  };

	  return {
	    saveText: saveText,
	    loadText: loadText,
	    loadRandomText: loadRandomText,
	    setAutoSave: setAutoSave,
	    publishText: publishText,
	    loginHandler: loginHandler,
	    clearLoad: clearLoad,
	    vote: vote
	  };
	}();

	//Switches between the top entries and the newest entries
	class Story extends React.Component {
	  constructor() {
	    super();
	    this.state = {
	      favorites: false
	    };
	    this.handleDisplay = this.handleDisplay.bind(this);
	  }

	  handleDisplay() {
	    this.setState({
	      favorites: !this.state.favorites
	    });
	  }

	  dailyTop(number) {
	    if (number == 0) {
	      return React.createElement(Back, null);
	    } else if (number == 1) {
	      return React.createElement(Front, null);
	    }
	  }

	  render() {
	    const textStory = this.state.favorites ? 'Go to My Writing' : 'Go to My Favorites';
	    var mode = this.state.favorites ? 0 : 1;
	    return React.createElement(
	      'div',
	      { className: 's-tog' },
	      React.createElement(
	        'div',
	        { className: 'black_box', onClick: this.handleDisplay },
	        React.createElement(
	          'h1',
	          null,
	          textStory
	        )
	      ),
	      this.dailyTop(mode)
	    );
	  }
	};

	class Back extends React.Component {
	  constructor() {
	    super();
	    this.state = { result: [] };
	  }

	  componentDidMount() {
	    this.serverRequest = $.post("/getfavorites", function (result) {
	      this.setState({ result: result });
	    }.bind(this));
	  }

	  render() {
	    var tab = [];
	    for (var i = 0; i < this.state.result.length; i++) {
	      tab.push(React.createElement(PromptsFront, { piece: this.state.result[i].piece, prompt: this.state.result[i].text, promptid: this.state.result[i].prompt, date: this.state.result[i].date }));
	    }
	    return React.createElement(
	      'div',
	      { className: 'dashboard_front' },
	      React.createElement(
	        'div',
	        { className: 'following' },
	        React.createElement(
	          'div',
	          { className: 'rectangle' },
	          React.createElement(
	            'h1',
	            null,
	            'Stories I Liked'
	          )
	        ),
	        React.createElement('hr', null)
	      ),
	      React.createElement(
	        'div',
	        { className: 'display_box_container' },
	        tab
	      )
	    );
	  }
	};

	//This function creates the front dashboard layout in templaye "dashboard.html"
	class Front extends React.Component {
	  constructor() {
	    super();
	    this.state = { result: [] };
	  }

	  componentDidMount() {
	    this.serverRequest = $.post("/getpieces", function (result) {
	      this.setState({ result: result });
	    }.bind(this));
	  }

	  render() {
	    var tab = [];
	    for (var i = 0; i < this.state.result.length; i++) {
	      tab.push(React.createElement(PromptsFront, { piece: this.state.result[i].piece, prompt: this.state.result[i].text, promptid: this.state.result[i].prompt, date: this.state.result[i].date }));
	    }
	    return React.createElement(
	      'div',
	      { className: 'dashboard_front' },
	      React.createElement(
	        'div',
	        { className: 'following' },
	        React.createElement(
	          'div',
	          { className: 'rectangle' },
	          React.createElement(
	            'h1',
	            null,
	            'Stories I Wrote'
	          )
	        ),
	        React.createElement('hr', null)
	      ),
	      React.createElement(
	        'div',
	        { className: 'display_box_container' },
	        tab
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
	      'div',
	      null,
	      React.createElement(
	        'h1',
	        { className: 'story_title' },
	        title
	      ),
	      React.createElement(
	        'div',
	        { className: 'profile-box' },
	        React.createElement('img', { className: 'author_pic img-circular', src: pic, height: 24 }),
	        React.createElement(
	          'div',
	          { className: 'author_info' },
	          React.createElement(
	            'h1',
	            { className: 'author_name' },
	            author
	          ),
	          React.createElement(
	            'h1',
	            { className: 'date' },
	            date
	          )
	        )
	      ),
	      React.createElement(
	        'p',
	        { className: 'story_text' },
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

	class Signup extends React.Component {
	  constructor(props) {
	    super(props);
	  }

	  render() {
	    return React.createElement(
	      'div',
	      { className: 'form-signup' },
	      React.createElement(
	        'h2',
	        null,
	        'Sign Up'
	      ),
	      React.createElement(
	        'h3',
	        null,
	        'read and write from thousands of prompts.',
	        React.createElement('div', { className: 'break' })
	      ),
	      React.createElement(
	        'fieldset',
	        null,
	        React.createElement(
	          'p',
	          { className: 'login-msg' },
	          'Please include 5 cents for good luck.'
	        ),
	        React.createElement(
	          'form',
	          { action: '/signup', method: 'POST' },
	          React.createElement('input', { type: 'email', name: 'email', placeholder: 'Email', required: true }),
	          React.createElement('input', { type: 'password', name: 'password', placeholder: 'Password', required: true }),
	          React.createElement('input', { type: 'text', name: 'penname', placeholder: 'Pen Name', required: true }),
	          React.createElement('input', { type: 'submit', value: 'Sign up' })
	        ),
	        React.createElement(
	          'a',
	          { onClick: this.props.handleForm },
	          ' Already signed up? Log in.'
	        )
	      )
	    );
	  }
	}

	class Login extends React.Component {
	  constructor(props) {
	    super(props);
	  }

	  render() {
	    return React.createElement(
	      'div',
	      { className: 'form-login' },
	      React.createElement(
	        'h1',
	        null,
	        'Log in'
	      ),
	      React.createElement(
	        'fieldset',
	        null,
	        React.createElement(
	          'form',
	          { id: 'login-form', action: '/login', method: 'POST' },
	          React.createElement('input', { type: 'email', name: 'email', placeholder: 'Enter your email address', required: true }),
	          React.createElement('input', { type: 'password', name: 'password', placeholder: 'Enter your password', required: true }),
	          React.createElement('br', null),
	          React.createElement('input', { onClick: this.props.loginHandler, id: 'login-submit', type: 'submit', value: 'Log in' })
	        ),
	        React.createElement(
	          'a',
	          { onClick: this.props.handleForm },
	          ' Not signed up? Create an account.'
	        ),
	        React.createElement('br', null),
	        React.createElement(
	          'a',
	          { href: '#' },
	          'Forgot Password?'
	        )
	      )
	    );
	  }
	}

	/*LANDING*/
	class Landing extends React.Component {
	  constructor() {
	    super();
	    this.state = { signupLogin: 1 };
	    this.handleForm = this.handleForm.bind(this);
	  }

	  handleForm(signupLogin, event) {
	    this.setState({ signupLogin: !this.state.signupLogin });
	  }

	  loginHandler(event) {
	    var response = IO.loginHandler();
	  }

	  checkForm(signupLogin) {
	    if (signupLogin == 1) {
	      return React.createElement(Signup, { loginHandler: this.loginHandler.bind(this), handleForm: this.handleForm.bind(this, this.state.signupLogin) });
	    } else {
	      return React.createElement(Login, { handleForm: this.handleForm.bind(this, this.state.signupLogin) });
	    }
	  }

	  render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'form-container' },
	        React.createElement(
	          'h1',
	          null,
	          'BardHop'
	        ),
	        React.createElement(
	          'div',
	          { id: 'login' },
	          this.checkForm(this.state.signupLogin)
	        )
	      )
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
	  }

	  render() {
	    return React.createElement(
	      'div',
	      { className: 'prompt_tab' },
	      React.createElement(
	        'div',
	        { onClick: this.handleChoice, className: 'daily_box' },
	        React.createElement(
	          'p',
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
	    this.text = props.prompt;
	    this.state = { writing_prompt: "", result: [], votes: 0 };
	  }

	  getDate() {
	    return this.props.date.substring(0, 11);
	  }
	  componentDidMount() {
	    var data = {
	      pid: this.props.promptid,
	      piece: this.props.piece
	    };
	    this.serverRequest = $.post("/findprompt", data = data, function (result) {
	      this.setState({ writing_prompt: result });
	    }.bind(this));
	    this.serverRequest = $.post("/votetotal", data = data, function (votes) {
	      this.setState({ votes: votes });
	    }.bind(this));
	  }
	  render() {
	    return React.createElement(
	      'div',
	      { className: 'display_box' },
	      React.createElement(
	        'div',
	        { className: 'feedback_header' },
	        React.createElement(
	          'div',
	          { className: 'feedback_header_date' },
	          this.getDate()
	        ),
	        React.createElement(
	          'div',
	          { className: 'feedback_header_likes' },
	          '☆ ',
	          this.state.votes
	        )
	      ),
	      React.createElement(
	        'h1',
	        null,
	        this.state.writing_prompt
	      ),
	      React.createElement(
	        'p',
	        null,
	        this.text,
	        React.createElement('hr', null)
	      )
	    );
	  }
	}

	class PromptsWriting extends React.Component {
	  constructor(props) {
	    super(props);
	  }

	  setHighlight() {
	    if (this.props.currentPID === this.props.pid) {
	      return true;
	    }
	  }

	  render() {
	    if (this.setHighlight()) {
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'div',
	          { className: 'promptInfo', onClick: this.props.clickHandler },
	          React.createElement(
	            'div',
	            { className: 'p-box-blue' },
	            React.createElement(
	              'p',
	              { className: 'writing_page_prompts' },
	              this.props.prompt
	            )
	          )
	        )
	      );
	    } else {
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'div',
	          { className: 'promptInfo', onClick: this.props.clickHandler },
	          React.createElement(
	            'div',
	            { className: 'p-box' },
	            React.createElement(
	              'p',
	              { className: 'writing_page_prompts' },
	              this.props.prompt
	            )
	          )
	        )
	      );
	    }
	  }
	}

	/* WRITING */

	class WritingPage extends React.Component {
	  constructor() {
	    super();
	    this.state = { result: [], pid: [], currentPID: 0, currentPrompt: "Choose a prompt to write!", highlight: false };
	    this.highlight = this.highlight.bind(this);
	  }

	  componentWillMount() {
	    this.serverRequest = $.post("/getprompts", function (result) {
	      this.setState({ result: result });
	    }.bind(this));
	  }

	  setPID(pid, event) {
	    var text = IO.loadText(pid);
	    this.setState({ currentPID: pid });
	    IO.setAutoSave(pid);
	  }

	  setPrompt(prompt, event) {
	    this.setState({ currentPrompt: prompt });
	  }

	  highlight(highlight, event) {
	    this.setState({ highlight: false });
	    console.log(this.state.highlight);
	  }

	  clickHandler(highlight, pid, prompt, event) {
	    this.setPID(pid, event);
	    this.setPrompt(prompt, event);
	    this.highlight(highlight, event);
	  }

	  render() {
	    var tab = [];
	    var writingArea = null;
	    for (var i = 0; i < this.state.result.length; i++) {
	      tab.push(React.createElement(PromptsWriting, {
	        clickHandler: this.clickHandler.bind(this, this.state.highlight, this.state.result[i].pid, this.state.result[i].text),
	        prompt: this.state.result[i].text,
	        pid: this.state.result[i].pid,
	        currentPID: this.state.currentPID,
	        highlight: this.state.highlight
	      }));
	    };
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'selectionBox' },
	        tab
	      ),
	      React.createElement(WritingArea, { pid: this.state.currentPID, prompt: this.state.currentPrompt })
	    );
	  }
	}

	class WritingArea extends React.Component {
	  constructor(props) {
	    super(props);
	    this.pid = props.pid;
	    this.state = { pid: props.pid };
	  }

	  render() {
	    if (this.props.pid == 0) {
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'div',
	          { className: 'writing_head' },
	          React.createElement(
	            'button',
	            { id: 'publish-button', onClick: IO.publishText.bind(this, this.props.pid), className: 'btn submit' },
	            'Submit'
	          ),
	          React.createElement(
	            'h1',
	            { className: 'no-prompt' },
	            this.props.prompt
	          )
	        )
	      );
	    } else {
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'div',
	          { className: 'writing_head' },
	          React.createElement(
	            'button',
	            { id: 'publish-button', onClick: IO.publishText.bind(this, this.props.pid), className: 'btn submit' },
	            'Submit'
	          ),
	          React.createElement(
	            'h1',
	            null,
	            this.props.prompt
	          ),
	          React.createElement(
	            'p',
	            { className: 'words' },
	            'WordCount:'
	          )
	        ),
	        React.createElement(
	          'section',
	          { className: 'writingpage_section' },
	          React.createElement('article', { id: 'text', contentEditable: 'true', className: 'content writingpage_article' })
	        )
	      );
	    }
	  }
	}

	/* READING */

	class ReadingPage extends React.Component {
	  constructor() {
	    super();
	    this.state = { prompts: [], currentPromptID: 0, pieceID: -1, like: 0, showCommentBox: 0, comments: [] };
	  }

	  componentWillMount() {
	    this.serverRequest = $.post("/getprompts", function (result) {
	      this.setState({ prompts: result });
	    }.bind(this));
	  }

	  componentWillUnmount() {
	    IO.clearLoad();
	  }

	  toggleComment(event) {
	    if (this.state.showCommentBox === 0) {
	      this.setState({ showCommentBox: 1 });
	      var data = {
	        piece_id: this.state.pieceID
	      };
	      $.post('/comment', data = data, response => {
	        this.setState({ comments: response });
	      });
	    } else {
	      this.setState({ showCommentBox: 0 });
	    }
	  }
	  toggleLike(event) {
	    var data = {
	      piece_id: this.state.pieceID
	    };
	    $.post('/vote', data = data, response => {
	      this.setState({ like: response["like"] });
	    });
	  }

	  setPID(pid, event) {
	    $('#text').text(" ");
	    var data = {
	      prompt_id: pid
	    };
	    $.post('/loadrandom', data = data, response => {
	      $('#text').text(response["text"]);
	      this.setState({ pieceID: response["piece_id"] });
	      this.setState({ like: response["like"] });
	    });
	    this.setState({ currentPromptID: pid });
	  }

	  clickHandler(pid, event) {
	    this.setPID(pid, event);
	  }

	  render() {
	    var tab = [];
	    var writingArea = null;
	    for (var i = 0; i < this.state.prompts.length; i++) {
	      tab.push(React.createElement(PromptsWriting, {
	        clickHandler: this.clickHandler.bind(this, this.state.prompts[i].pid),
	        currentPID: this.state.currentPromptID,
	        prompt: this.state.prompts[i].text,
	        pid: this.state.prompts[i].pid }));
	      writingArea = React.createElement(ReadingArea, { pid: this.state.prompts[i].pid });
	    }
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'selectionBox' },
	        tab
	      ),
	      writingArea,
	      React.createElement(
	        'div',
	        { 'class': 'cover-comments' },
	        React.createElement(
	          'div',
	          { id: 'rct' },
	          React.createElement(Feedback, {
	            piece_id: this.state.pieceID,
	            onClickComment: this.toggleComment.bind(this),
	            onClick: this.toggleLike.bind(this),
	            likeState: this.state.like,
	            comments: this.state.comments,
	            showCommentBox: this.state.showCommentBox
	          })
	        )
	      )
	    );
	  }
	}

	class ReadingArea extends React.Component {

	  constructor(props) {
	    super(props);
	    this.pid = props.pid;
	    this.state = { pid: props.pid };
	  }

	  render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'section',
	        { className: 'writingpage_section' },
	        React.createElement('article', { id: 'text', contentEditable: 'false', className: 'content writingpage_article' })
	      )
	    );
	  }
	}

	class CommentBox extends React.Component {
	  constructor(props) {
	    super();
	  }

	  getInititalState() {
	    return { comments: [] };
	  }

	  componentDidUpdate() {
	    return false;
	  }

	  render() {
	    return React.createElement(
	      'div',
	      { className: 'commentBox' },
	      React.createElement(CommentList, { comments: this.props.comments }),
	      React.createElement(CommentForm, null)
	    );
	  }

	}

	class CommentForm extends React.Component {
	  constructor() {
	    super();
	  }

	  render() {
	    return React.createElement(
	      'form',
	      { className: 'commentForm' },
	      React.createElement('div', { contentEditable: 'true', className: 'commentType', type: 'text', placeholder: 'Say something...' }),
	      React.createElement('input', { type: 'submit', value: 'Post', className: 'commentSubmit' })
	    );
	  }
	}

	class CommentList extends React.Component {
	  // Comment aggregation [(author, text)]
	  constructor(props) {
	    super(props);
	  }

	  render() {
	    var commentNodes = this.props.comments.map(function (comment) {
	      return React.createElement(
	        Comment,
	        { author: comment.author, key: comment.id },
	        comment.text
	      );
	    });
	    return React.createElement(
	      'div',
	      { className: 'commentList' },
	      commentNodes
	    );
	  }
	}

	var data = [{ id: 1, author: "Pete Hunt", text: "This is one comment" }, { id: 2, author: "Jordan Walke", text: "This is *another* comment" }];

	class Comment extends React.Component {
	  // Comment data (author, text)
	  constructor() {
	    super();
	  }

	  render() {
	    return React.createElement(
	      'div',
	      { className: 'comment' },
	      React.createElement(
	        'h2',
	        { className: 'commentAuthor' },
	        this.props.author
	      ),
	      React.createElement(
	        'h2',
	        { className: 'commentText' },
	        this.props.children
	      ),
	      React.createElement('hr', null)
	    );
	  }
	}

	class Feedback extends React.Component {
	  constructor(props) {
	    super(props);
	  }

	  comments() {
	    if (this.props.showCommentBox === 1) {
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(CommentBox, { comments: this.props.comments })
	      );
	    }
	    return React.createElement('div', null);
	  }

	  render() {
	    const textLike = this.props.likeState ? 'Unlike' : 'Like';
	    const textComment = "Comments";
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'rct-1' },
	        React.createElement(
	          'div',
	          { onClick: this.props.onClick, className: 'like' },
	          textLike
	        ),
	        React.createElement(
	          'div',
	          { onClick: this.props.onClickComment, className: 'comment-opening' },
	          textComment
	        )
	      ),
	      this.comments()
	    );
	  }
	}

	//
	//ReactDOM.render(<Writing/>, document.getElementById('writing_page'));
	//ReactDOM.render(<Story/>,document.getElementById('story'))
	window.onload = function () {
	  var url = window.location.href.split('/');
	  if (inArray("dashboard", url)) {
	    ReactDOM.render(React.createElement(Story, null), document.getElementById('d_board'));
	  } else if (inArray("writing", url)) {
	    writingHandlers();
	    ReactDOM.render(React.createElement(WritingPage, null), document.getElementById('writing_page'));
	  } else if (inArray("reading", url)) {
	    //ReactDOM.render(<Story/>,document.getElementById('story'))
	    ReactDOM.render(React.createElement(ReadingPage, null), document.getElementById('reading-page'));
	  } else if (inArray("", url)) {
	    ReactDOM.render(React.createElement(Landing, null), document.getElementById('landing-page'));
	  }
	};

/***/ }
/******/ ]);