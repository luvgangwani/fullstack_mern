import React from 'react';

class ContestPreview extends React.Component {
    
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this); // added this line to handle scope of this for the handleClick function. handleClick (any function other than render does not know what "this" is)
    }

    handleClick() {
        this.props.onClick(this.props.contestId)
    }

    render() {
        return (
            <div className = "contest-preview" onClick = {this.handleClick}>
                <div className = "category-name">{this.props.categoryName}</div>
                <div className = "contest-name">{this.props.contestName}</div>
            </div>
        );
    }
}

export default ContestPreview;