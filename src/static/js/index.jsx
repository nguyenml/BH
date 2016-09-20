import React from 'react';

function Front() {
    console.log($);
    console.log(document.location.href);
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
                    <div className="daily_box">
                        <p>Prompt</p>
                        <button className="btn dashboard_read">Read</button>
                        <button className="btn dashboard_read">Write</button>
                    </div>
                    <div className="daily_box">
                        <p>Prompt</p>
                        <button className="btn dashboard_read">Read</button>
                        <button className="btn dashboard_read">Write</button>
                    </div>
                    <div className="daily_box">
                        <p>Prompt</p>
                        <button className="btn dashboard_read">Read</button>
                        <button className="btn dashboard_read">Write</button>
                    </div>
                    <div className="daily_box">
                        <p>Prompt</p>
                        <button className="btn dashboard_read">Read</button>
                        <button className="btn dashboard_read">Write</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

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
    title: React.PropTypes.string.isRequired
};
Entry.defaultProps = {
    title: "Title"
};

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
                <Entry title="The Second One" text=" " author="{{firstname}}{{lastname}}" pic="../static/images/riff.jpg" date="July 17, 2016"/>
            </div>
        )
    }
}

class DailyPrompt extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <div className="daily_prompt">
                    <h1 className="daily">Prisoners won't try to excape if they don't even know they are in prison.</h1>
                    <hr></hr>
                </div>
                <Entry title="The Biggest One" text="" author="{{story}} {{lastname}}" pic="../static/images/riff.jpg" date="July 17, 2016"/>
            </div>

        )
    }

}

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
/////////////////////////////////////////////
class Writing extends React.Component {
    constructor() {
        super();
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
            <h1>{this.props.title}</h1>
        )
    }
});

document.onload = function() {
    var myLocation = window.location.href.split('/');
    console.log(myLocation);
    //ReactDOM.render(<Story/>,document.getElementById('story'));
    //ReactDOM.render(<Prompt title = "ANALYSIS" />,document.getElementById('prompt'));
    //ReactDOM.render(<Writing/>, document.getElementById('writing_page'));
    ReactDOM.render(<Front pic="../static/images/lion.jpg"/>, document.getElementById('d_board'));
}

