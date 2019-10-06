import React from 'react';
import PropTypes from 'prop-types';
import {Link} from '@reach/router';
import {StyledNavigation} from "../styles/StyledNavigation";

const Navigation = ({movieName}) => (
    <StyledNavigation>
        <div className="navigation-content">
            <Link to="/">
                <p>Home</p>
            </Link>
            <p>|</p>
            <p>{movieName}</p>
        </div>
    </StyledNavigation>
)

Navigation.propTypes = {
    movieName: PropTypes.string
}

export default Navigation;
