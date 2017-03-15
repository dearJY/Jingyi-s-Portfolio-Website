import React from "react";
import ReactDOM from "react-dom";

class CommentBox extends React.Component {
	constructor() {
		super();
		this.state = {
			showComments:false,
			comments:[
				{id: 1, author: "Jingyi", body: "PANG NUINUI"},
        		{id: 2, author: "Kang", body: "PI KA SHI"}
			]
		};
	}
	render() {
		const comments = this._getComments();
		let commentNodes;
		let buttonIcon;
		if(this.state.showComments) {
			commentNodes = <div className="row comment-showing">{comments}</div>;
			buttonIcon = <i className="fa fa-minus" aria-hidden="true"></i>;
		}else {
			buttonIcon = <i className="fa fa-plus" aria-hidden="true"></i>;
		}
		return (
			<div className="comment-box">
				<div className="comment-amount col-lg-offset-2 col-lg-9 clearfix">
					<div className="amount-container">
	                    <a onClick={this._handleClick.bind(this)}>
	                        <p className="number">{this._getCommentsTitle(comments.length)}
	                        	{buttonIcon}
	                        </p>
	                    </a>
                    </div>
                </div>
                {commentNodes}
				<CommentWritting addComment={this._addComment.bind(this)}/>
			</div>
		);
	}

	_getComments() {
		return this.state.comments.map(
			(comment) => {
				return (<CommentShowing author={comment.author} body={comment.body} key={comment.id}/>);
		});
	}

	_getCommentsTitle(commentCount) {
		if(commentCount === 0) {
			return " No comments yet";
		}else if(commentCount === 1) {
			return " 1 comment";
		}else {
			return `${commentCount} comments`;
		}
	}

	_handleClick() {
		this.setState({
			showComments:!this.state.showComments
		});
	}

	_addComment(author,body) {
		const comment = {
			id: this.state.comments.length+1,
			author,
			body
		};
		this.setState({comments:this.state.comments.concat([comment])});
	}
}


class CommentShowing extends React.Component {
  render() { 
  	return(
        <div className="single-comment clearfix col-lg-9 col-lg-offset-2">
            <div className="comment-center">
                <div className="user-photo">
                    <img alt="-add name" src="#"/>
                </div>
                <div className="review-container">
                    <div className="name-review">
                        <div className="name">
                            <p>
                            	{this.props.author}
                            </p>
                        </div>
                        <div className="review">
                            <p>
                            	{this.props.body}
                            </p>
                        </div>
                    </div>
                    <div className="like-reply">
                        <a>like</a>
                        <span>{" · "}</span>
                        <a>reply</a>
                    </div>
                </div>
            </div>
        </div>
	);
  }
}



class CommentWritting extends React.Component {
	render() {
		return (
			<div className="row comment-writting">
	            <div className="clearfix col-lg-9 col-lg-offset-2">
	                <div className="comment-center">
	                    <div className="user-photo">
	                        <img alt="-add name" src="#"/>
	                    </div>
	                    <form className="comment-content" onSubmit={this._handleSubmit.bind(this)}>
	                    	<div className="name-text">
	                    		<div className="input-name">
                                    <input type="text" placeholder="name..." 
                               			ref={(input) => this._author = input}/>
                                </div>
		                        <div className="input-container">
		                            <textarea placeholder="Write a Review..." 
		                            	ref={(textarea) => this._body = textarea}></textarea>
		                        </div>
	                        </div>
	                        <div className="input-submit">
	                            <button className="comment-btn" type="submit">post</button>
	                        </div>
	                    </form>
	                </div>
	            </div>
	        </div>
        );
	}

	_handleSubmit(event) {
		event.preventDefault();
		let author = this._author;
		let body = this._body;
		this.props.addComment(author.value,body.value);
	}
}

export default CommentBox;