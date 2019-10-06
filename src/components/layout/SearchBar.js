import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {StyledSearchBar, StyledSearchBarContent} from "../styles/StyledSearchBar";

const SearchBar = ({ searchHandler }) => {

    const [state, setState] = useState('');
    const timeout = useRef(null);

    /**
     * Call movie search
     */
    const onSearch = (e) => {
        const {value} = e.target;
        clearTimeout(timeout.current);

        setState(value);

        timeout.current = setTimeout(() => {
            searchHandler(value);
        }, 500);
    };

    return (
        <StyledSearchBar>
            <StyledSearchBarContent>
                <FontAwesome className="fa-search" name="search" size="2x" />
                <input type="text" placeholder="Search Movie" onChange={onSearch} value={state} />
            </StyledSearchBarContent>
        </StyledSearchBar>
    )
}

SearchBar.propTypes = {
    searchHandler: PropTypes.func
}

export default SearchBar;
