import React from 'react';

function Search(props) {
    return (
        <input className="form-control" placeholder="Search" 
            value={props.query} 
            onChange={props.onChangeQuery}/>
    );
}

export default Search;