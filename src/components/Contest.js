import React from 'react';

class Contest extends React.Component {

    render() {

        return(
            <div className = "Contest">
                {this.props.id}<br />
                {this.props.categoryName}<br />
                {this.props.description}
            </div>
        );

    }

}

export default Contest;