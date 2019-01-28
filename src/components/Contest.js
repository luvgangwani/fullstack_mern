import React, { Component } from 'react';

class Contest extends Component {


  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.fetchNames(this.props.nameIds);
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.addName(this.refs.newNameInput.value, this.props._id);
    this.refs.newNameInput.value = '';
  }

  render() {
    return (
      <div className="Contest">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Contest Description</h3>
          </div>
          <div className="panel-body">
            <div className="contest-description">
              {this.props.description}
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Proposed Names</h3>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              {
                this.props.nameIds.map(nameId => (
                  <li key={nameId} className="list-group-item">
                    {this.props.lookUpName(nameId)}
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Propose a New Name</h3>
          </div>
          <div className="panel-body">
            <form onSubmit = {this.handleSubmit}>
              <div className="input-group">
                <input 
                type="text" 
                placeholder="New Name Here..." 
                ref="newNameInput" 
                className="form-control" />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-info">Sumbit</button>
                </span>
              </div>
            </form>
          </div>
        </div>

        <div className="home-link contest-list"
             onClick={this.props.onContestLinkClick}>
          Contest List
        </div>
      </div>
    );
  }
}

// Contest.propTypes = {
//   description: PropTypes.string.isRequired,
//   onContestLinkClick: PropTypes.func.isRequired,
// };

export default Contest;
