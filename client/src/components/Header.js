import React from 'react';
import {Link} from 'react-router-dom';
import GoogeAuth from './GoogleAuth';

const Header = () =>{
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                Streamy
            </Link>
            <div className="right menu">
                <Link to="/" className="item">
                    All STreams
                </Link>
            </div>
            <GoogeAuth/>
        </div>
    );
}

export default Header;