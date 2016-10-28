/* UTILITIES */

var inArray = function( element, array) {
  for(var i = array.length - 1; i < array.length; i++ ){
    if(element.localeCompare(array[i]) === 0){
      return true;
    }
    else {
      return false;
    }
  }
}

var writingHandlers = function() {
  $("#publish-button").click(function(e){
  });

  $('#text').on('input', function () {
    console.log("Test");
      var text = this.textContent, count = text.trim().replace(/\s+/g, ' ').split(' ').length;
      $('.words').text(count);
  });
}

var IO = function() {
  SAVE_INTERVAL = 2500;
  autoSave = null; // Save Timeout object
  saveObject = null; // Save request object
  loadObject = null; // Load request object
  voteObject = null; // Vote
  commentObject = null

  var loginHandler = function(){
    var data = {};
    var inputs = $('#login-form :input');
      $('#login-submit').each(function(e){
        data[e.name] = e.value;
      });
  }

  var saveText = function(pid) {
    var data = {
      prompt_id: pid,
      text: $('#text').text(),
    };
    if(saveObject){
        saveObject.abort();
        saveObject = null;
    }
    saveObject = $.post('/save',
      data=data,
      function(response, status_code, xhr){
        if(response === 'SUCCESS'){
        } else {
          console.log("Save failed.");
        }
      });
  };

  var publishText = function(pid) {
    var data = {
      prompt_id: pid,
    }
    $.post('/publish',
      data=data,
      function(response, status_code, xhr){
        if(response === 'SUCCESS'){
        } else {
          console.log("Published failed");
        }
      });
  };

  var loadText = function(pid) {
    var data = {
      prompt_id: pid,
    };
    $.post('/load',
      data=data,
      function(text, status_code, xhr){
        if(status_code === 'success'){
          $('#text').text(text);
        } else {
          console.log('load fail');
        }
      });
  };

  var loadRandomText = function(pid) {
    var data = {
      prompt_id: pid,
    };
    if(loadObject) {
        loadObject.abort();
        loadObject = null;
    }
    loadObject = $.post('/loadrandom',
      data=data,
      function(response, status_code, xhr){
        if(status_code === 'success'){
          $('#text').text(response["text"]);

        } else {
        }
      })
    return piece_id;
  };


  var setAutoSave = function(pid) {
    $("#text").on("input propertychange change", function(e) {
      clearTimeout(autoSave);
      autoSave = setTimeout(function() {
        saveText(pid);
      }, SAVE_INTERVAL);
    });
  }

  var clearLoad = function() {
    loadObject.abort();
    loadObject = null;
  }

  var vote = function(piece_id){
    var data = {piece_id: piece_id};
    voteObject = $.post('/vote',
       data = data,
       function(response,status_code, xhr){
         if(status_code === "success" ){
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
    vote:vote,
  };
}();

//This function creates the front dashboard layout in templaye "dashboard.html"
class Front extends React.Component {
  constructor(){
    super();
    this.state = {result: []};
  }

  componentDidMount(){
   this.serverRequest = $.post("/getprompts", function (result) {
     this.setState({ result :result});
   }.bind(this));
  }

  render(){
    var tab = [];
    for (var i = 0; i < this.state.result.length; i++){
      tab.push(<PromptsFront prompt ={this.state.result[i].text} pid ={this.state.result[i].pid} />)
    }
    return (
        <div className="dashboard_front">
            <div className="header">
                <h1>
                    Dashboard
                </h1>
                <div className="rectangle">
                    <h1>
                        In Progress
                    </h1>
                </div>
                <div className="current">
                    <div className="box">
                        <h1>Project Name</h1>
                        <img className="pic" src="../static/images/lion.png" height={100}/>
                    </div>
                    <div className="box">
                        <h1>Project Name</h1>
                        <img className="pic" src="../static/images/128x128.png" height={100}/>
                    </div>
                    <div className="box">
                        <h1>Project Name</h1>
                        <img className="pic" src="../static/images/wolf.png" height={100}/>
                    </div>
                    <div className="box">
                        <h1>Project Name</h1>
                        <img className="pic" src="../static/images/paws.png" height={100}/>
                    </div>
                </div>
            </div>
            <div className="following">
                <div className="rectangle">
                    <h1>
                        Daily
                    </h1>
                </div>
                <hr></hr>
                <div className="current">
                    {tab}
                </div>

            </div>
        </div>
    )
  }
};


//This function creates the class that renders the template for "reading.html"
class Entry extends React.Component {
    constructor() {
        super();
    }
    render() {
        var {title, pic, author, date, text} = this.props;
        return (
            <div>
                <h1 className="story_title">{title}</h1>
                <div className="profile-box">
                    <img className="author_pic img-circular" src={pic} height={24}/>
                    <div className="author_info">
                        <h1 className="author_name">{author}</h1>
                        <h1 className="date">{date}</h1>
                    </div>
                </div>

                <p className="story_text">{text}</p>
            </div>
        )
    }
};
Entry.propTypes = {
    title: React.PropTypes.string.isRequired // Makes Title a property
};
Entry.defaultProps = {  // initialize title
    title: "Title"
};


class Signup extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="form-signup">
          <h2>Sign Up</h2>
          <h3>read and write from thousands of prompts.
              <div className="break"></div></h3>
          <fieldset>
              <p className="login-msg">Please include 5 cents for good luck.</p>
              <form action="/signup" method="POST">
                  <input type="email" name="email" placeholder="Email" required />
                  <input type="password" name="password" placeholder="Password" required />
                  <input type="text" name="penname" placeholder="Pen Name" required />
                  <input type="submit" value="Sign up" />
              </form>
              <a onClick={this.props.handleForm}> Already signed up? Log in.</a>
          </fieldset>
      </div>
  );
  }
}

class Login extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
        <div className="form-login">
            <h1>Log in</h1>
            <fieldset>
                <form id="login-form" action="/login" method="POST">
                    <input type="email" name="email" placeholder="Enter your email address" required />
                    <input type="password" name="password" placeholder="Enter your password" required />
                    <br />
                    <input onClick={this.props.loginHandler} id="login-submit" type="submit" value="Log in" />
                </form>
                <a onClick={this.props.handleForm}> Not signed up? Create an account.</a><br></br>

                <a href="#">Forgot Password?</a>
          </fieldset>
        </div>
    )

  }
}

/*LANDING*/
class Landing extends React.Component{
  constructor(){
    super();
    this.state ={ signupLogin: 1}
    this.handleForm = this.handleForm.bind(this);
  }

  handleForm(signupLogin, event){
    this.setState({signupLogin : !this.state.signupLogin});
  }

  loginHandler(event){
    var response = IO.loginHandler();
  }

  checkForm(signupLogin){
    if(signupLogin == 1){
     return(<Signup loginHandler={this.loginHandler.bind(this)} handleForm ={this.handleForm.bind(this,this.state.signupLogin)}/>);
   }
    else {
      return(<Login handleForm ={this.handleForm.bind(this,this.state.signupLogin)}/>);
    }

  }

  render() {
    return(
      <div>
        <div className = "form-container">
                <h1>BardHop</h1>
          <div id="login">
            {this.checkForm(this.state.signupLogin)}
          </div>
        </div>

      </div>

    );
  }
}


class Prompts extends React.Component{
  constructor(props){
    super(props);
    this.prompt = props.prompt;
    this.state = { promptChoice: 0} ;
    this.handleChoice = this.handleChoice.bind(this);
  }

  handleChoice(){
    var text = $.post("/getprompts", function (response) {
      this.setState({ });
    });
  }

  render() {
    return(
      <div className="prompt_tab">
        <div onClick ={this.handleChoice} className="daily_box">
              <p>{this.prompt}</p>
        </div>
      </div>
    )
  }
}

class PromptsFront extends React.Component{
  constructor(props){
    super(props);
    this.prompt = props.prompt;
    this.state = { promptChoice: 0} ;
    this.handleChoice = this.handleChoice.bind(this);
}
    handleChoice(){
      var text = $.post("/getprompts", function (response) {
      this.setState({ });
    });
    }

    render() {
      return(
      <div className="daily_box">
          <p>{this.prompt}</p>
          <button className="btn dashboard_read">Read</button>
          <button className="btn dashboard_read">Write</button>
      </div>
      )
    }
}

class PromptsWriting extends React.Component{
  constructor(props){
    super(props);
  }

  setHighlight(){
    if(this.props.currentPID === this.props.pid){
     return(true);
    }
  }

  render() {
    if(this.setHighlight()){
      return(
        <div>
          <div className="promptInfo" onClick= {this.props.clickHandler}>
            <div className="p-box-blue">
              <p className="writing_page_prompts">
                {this.props.prompt}
              </p>
            </div>
          </div>
        </div>

      )
    }
    else{
    return(
      <div>
        <div className="promptInfo" onClick= {this.props.clickHandler}>
          <div className="p-box">
            <p className="writing_page_prompts">
              {this.props.prompt}
            </p>
          </div>
        </div>
      </div>
    );
    }
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
            return (<DailyPrompt/>)
        } else if (number == 0) {
            return (<Top_Stories/>)
        }
    }

    render() {
        const textStory = this.state.topStories
            ? 'Top Stories'
            : 'Daily Prompt';
        var mode = this.state.topStories
            ? 0
            : 1;
        return (
            <div className="s-tog">
                <div onClick={this.handleStories}></div>
                {this.dailyTop(mode)}
            </div>
        )
    }
};

/* WRITING */

class WritingPage extends React.Component{
  constructor(){
    super();
    this.state = { result: [], pid: [], currentPID: 0, currentPrompt: "Choose a prompt to write!", highlight: false};
    this.highlight = this.highlight.bind(this);

  }

  componentWillMount(){
   this.serverRequest = $.post("/getprompts", function (result) {
     this.setState({ result:result });
   }.bind(this));
  }


  setPID(pid, event){
    var text = IO.loadText(pid);
    this.setState({currentPID: pid});
    IO.setAutoSave(pid);
  }

  setPrompt(prompt, event){
    this.setState({currentPrompt: prompt});
  }

  highlight(highlight,event){
    this.setState({highlight: false})
    console.log(this.state.highlight);
  }

  clickHandler(highlight,pid,prompt,event){
    this.setPID(pid,event);
    this.setPrompt(prompt,event);
    this.highlight(highlight,event);
  }

  render(){
    var tab = [];
    var writingArea = null;
    for (var i = 0; i < this.state.result.length; i++){
      tab.push(<PromptsWriting
        clickHandler={this.clickHandler.bind(this,this.state.highlight,this.state.result[i].pid,this.state.result[i].text)}
        prompt={this.state.result[i].text}
        pid={this.state.result[i].pid}
        currentPID = {this.state.currentPID}
        highlight={this.state.highlight}
        />)};
    return(
        <div>
            <div className="selectionBox">
                {tab}
            </div>
             <WritingArea pid={this.state.currentPID} prompt={this.state.currentPrompt}/>
        </div>
      )
  }
}


class WritingArea extends React.Component {
    constructor(props) {
        super(props);
        this.pid = props.pid;
        this.state = {pid: props.pid}
    }



    render() {
      if(this.props.pid == 0){
        return(
            <div>
                <div className="writing_head">
                    <button id="publish-button" onClick={IO.publishText.bind(this, this.props.pid)} className="btn submit">Submit</button>
                    <h1 className="no-prompt">{this.props.prompt}</h1>
                </div>
              </div>
            )
          }
          else{
            return(
            <div>
                <div className="writing_head">
                    <button id="publish-button" onClick={IO.publishText.bind(this, this.props.pid)} className="btn submit">Submit</button>
                    <h1>{this.props.prompt}</h1>
                    <p className="words">WordCount:</p>
                </div>
                <section className="writingpage_section">
                    <article id="text" contentEditable="true" className="content writingpage_article"></article>
                </section>
              </div>
            )
            }


    }
}

/* READING */

class ReadingPage extends React.Component{
  constructor(){
    super();
    this.state = { result: [], pid: [], currentPID: 0, piece_id:-1 };
  }

  componentWillMount(){
   this.serverRequest = $.post("/getprompts", function (result) {
     this.setState({ result:result });
   }.bind(this));
  }

  componentWillUnmount() {
    IO.clearLoad();
  }

  setPID(pid, event){
    var data = {
      prompt_id: pid,
    };
    $.post('/loadrandom', data=data, (response) => {
          $('#text').text(response["text"]);
          this.setState({piece_id: response["piece_id"]})
        }
      )
    this.setState({currentPID: pid});
  }

  clickHandler(pid,event){
    this.setPID(pid,event);
  }

  render(){
    var tab = [];
    var writingArea = null;
    for (var i = 0; i < this.state.result.length; i++){
      tab.push(<PromptsWriting clickHandler = {this.clickHandler.bind(this, this.state.result[i].pid)} currentPID = {this.state.currentPID} prompt ={this.state.result[i].text} pid ={this.state.result[i].pid} />)
      writingArea = <ReadingArea pid={this.state.result[i].pid} />
    }
    return(
        <div>
            <div className="selectionBox">
                {tab}

            </div>
            {writingArea}
            <div class="cover-comments">
              <div id="rct">
                <LikeButton piece_id={this.state.piece_id}/>
              </div>
            </div>
        </div>

    )
  }
}

class ReadingArea extends React.Component {

    constructor(props) {
        super(props);
        this.pid = props.pid;
        this.state = {pid: props.pid}
    }

    render() {
        return (
            <div>
                <section className="writingpage_section">
                    <article id="text" contentEditable="false" className="content writingpage_article"></article>
                </section>
              </div>
        )
    }
}


class CommentBox extends React.Component {
    constructor(){
          super();
    }

    getInititalState() {
      return {data: []};
    }

    componentDidUpdate(){
      return false;
    }

    render(){
    return(
      <div className="commentBox">
      <CommentList data={this.props.data} />
      <CommentForm />
      </div>
    );
  }

  }

  class CommentForm extends React.Component{
    constructor(){
      super();
    }

    render(){
      return(
        <form className="commentForm">
        <div contentEditable="true" className = "commentType" type="text" placeholder="Say something..." />
        <input type="submit" value="Post" className = "commentSubmit" />
        </form>
      )
    }
  }

  class CommentList extends React.Component{
    constructor(){
      super();
    }

    render(){
      var commentNodes = this.props.data.map(function(comment){
        return(
          <Comment author=  {comment.author} key = {comment.id}>
            {comment.text}
            </Comment>
        );
      });
      return(
        <div className="commentList">
        {commentNodes}
        </div>
      );
    }
  }

  var data= [ {id: 1, author: "Pete Hunt", text: "This is one comment"},{id: 2, author: "Jordan Walke", text: "This is *another* comment"}];

  class Comment extends React.Component{
    constructor(){
      super();
    }

    render(){
      return(
        <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
          </h2>
        <h2 className= "commentText">
          {this.props.children}
          </h2>
          <hr></hr>
        </div>
      )
    }
  }

  class LikeButton extends React.Component {
     constructor(props) {
       super(props);
       this.state = { liked: false, follow: false};
       this.handleLike = this.handleLike.bind(this);
       this.handleComment = this.handleComment.bind(this);
  }

    handleLike(piece_id, event) {
      var like = IO.vote(piece_id);
      if(like){
        this.setState({liked: !this.state.liked});
      }
    }

    handleComment(piece_id, event) {
      this.setState({comment: !this.state.comment});
    }

    commentOn(one){
       if( one == 1){
         return(
         <CommentBox data = {data}/>)
       }
      }

     render() { const textLike = this.state.liked ? 'Unlike' : 'Like';
      const textFollow= this.state.follow ? 'Unfollow' : 'Follow';
      var commentOnOff = this.state.comment ? 1 : 0;
      const textComment = "Comments"; return (
        <div>
          <div className="rct-1">
            <div onClick={this.handleLike.bind(this, this.props.piece_id)} className="like">
              {textLike}
            </div>
            <div onClick={this.handleComment.bind(this, this.props.piece_id)} className="comment-opening">
              {textComment}
            </div>
        </div>
        <div>
        {this.commentOn(commentOnOff)}
        </div>
    </div>
    );
  }
}

//
//ReactDOM.render(<Writing/>, document.getElementById('writing_page'));
//ReactDOM.render(<Story/>,document.getElementById('story'))
window.onload = function(){
  var url = window.location.href.split('/');
  if(inArray("dashboard",url)){
    ReactDOM.render(<Front pic="../static/images/lion.jpg"/>, document.getElementById('d_board'));
  }
  else if(inArray("writing",url)){
    writingHandlers();
    ReactDOM.render(<WritingPage/>, document.getElementById('writing_page'));
  }
  else if(inArray("reading",url)){
    //ReactDOM.render(<Story/>,document.getElementById('story'))
    ReactDOM.render(<ReadingPage/>, document.getElementById('reading-page'));
  }
  else if(inArray("",url)){
    ReactDOM.render(<Landing/>, document.getElementById('landing-page'));
  }
};
