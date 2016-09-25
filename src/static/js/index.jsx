
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

//renders the top stories of the particular prompt
class Top_Stories extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className="top_story_page">
                    <h1 className="top_story_header">Top Stories Today</h1>
                    <hr></hr>
                </div>
                <Entry title="The Second One" text="         asdasdfasdfasfafasdfasdfafafas" author="{{firstname}}{{lastname}}" pic="../static/images/riff.jpg" date="July 17, 2016"/>
            </div>
        )
    }
}

//renders the new entry for the prompt
class DailyPrompt extends React.Component {
  constructor(){
    super();
    this.state = {
      prompts: [],
      promptChoice: 0
    };
    this.handleChoice = this.handleChoice.bind(this);
  }

  handleChoice(){
    var text = $.post("/getprompts", function (response) {
    this.setState({"text": text })
  });
  console.log(this.state.text);
  }

  componentDidMount(){
   this.serverRequest = $.post("/getprompts", function (response) {
     this.setState({ prompts : response});
   }.bind(this));
  }

    render() {
        var tab = [];
        for (var i = 0; i < this.state.prompts.length; i++){
          tab.push(<Prompts prompt ={this.state.prompts[i].text} pid ={this.state.prompts[i].pid} />)
        }
        return (
            <div>
              <div className="daily_prompt">
                {tab}
            </div>
                <Entry title="The Biggest One" text="" author="{{story}} {{lastname}}" pic="../static/images/riff.jpg" date="July 17, 2016"/>
            </div>

        )
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
    console.log("test");
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
    console.log("test");
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
    this.prompt = props.prompt;
    this.pid = props.pid;
}

    render() {
      return(
      <div className="promptInfo">
          <a href = {'/'} className = "ph">
            <div className="p-box"><h1 className = "writing_page_prompts">{this.prompt}{this.pid}</h1></div></a>
      </div>
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
        return (
            <div>
                <div className="writing_head">
                    <button className="btn submit">Submit</button>
                    <h1>Prompt</h1>
                    <p>WordCount:</p>
                </div>
                <section className="writingpage_section">
                    <article id="text" contentEditable="true" className="content writingpage_article"></article>
                </section>
                <Prompt/>
              </div>


        )
    }
}

var Prompt = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired
    },
    getDefaultProps: function() {
        return {title: "Title"}
    },
    render: function() {
        return (
        <div className = "prompt">
            <h1>ANALYSIS</h1>
            </div>
        )
    }
});

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

var IO = function() {
    var saveText = function(aid, pid, text) {
        var data = {
                    author_id: aid,
                    piece_id: pid,
                    text: text
                    };
        $.post('/saving',
                data=data,
                function(response, status_code, xhr){
                    if(response === 'success'){
                       console.log("Saved");
                    }
                    else {
                        console.log("Save failed.");
                        console.log(response);
                        console.log(status_code);
                    } 
                });
    };
    
    var autoSave = window.setTimeout(autosave(1,1, ""), 10000);

}():

class WritingSelection extends React.Component{
  constructor(){
    super();
    this.state = { result: [], pid: []};
    this.handleChoice = this.handleChoice.bind(this);
  }

  componentDidMount(){
   this.serverRequest = $.post("/getprompts", function (result) {
     this.setState({ result :result});
     console.log("result");
   }.bind(this));
  }

  handleChoice(){
    this.setState({pid:this.state.result.pid})
  }

  render(){
    var tab = [];
    for (var i = 0; i < this.state.result.length; i++){
      tab.push(<PromptsWriting prompt ={this.state.result[i].text} pid ={this.state.result[i].pid} />)
    }
    return(
        <div>
            <h1 className="promptOfTheDay">PROMPTINFO</h1>
            <div className="selectionBox">
                {tab}

                </div>
            </div>
    )
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
  ReactDOM.render(<WritingSelection/>, document.getElementById('writing_page'));
  }
  else if(inArray("reading",url)){
  ReactDOM.render(<Story/>,document.getElementById('story'))
  }
};
