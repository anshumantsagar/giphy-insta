import React from 'react';
import { NavLink } from 'react-router-dom';

//logo
import Logo from '../assets/logo.png'

const navbar = props => {
    let style = {
        color: 'lightblue'
    }
    return (
        <nav className='navbar'>
            <div className='logo'><img alt='logo' src={Logo}/></div>
            <div></div>
            <div>
                <ul className='navbarul'>
                    <li><NavLink exact activeStyle={style} to='/trending'>Trending</NavLink></li>
                    <li><NavLink activeStyle={style} to='/search'>Search</NavLink></li>
                    <li><NavLink activeStyle={style} to='/upload'>Upload</NavLink></li>
                </ul>
            </div>
        </nav>
    );
}

export default navbar;