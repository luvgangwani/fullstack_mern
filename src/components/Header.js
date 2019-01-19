import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component { // destructuring the props object
    render() {
        return(
            <h2 className="Header text-center">{this.props.headerText}</h2>
        );
    }
}

Header.propTypes = {
    headerText: PropTypes.string
};

export default Header;