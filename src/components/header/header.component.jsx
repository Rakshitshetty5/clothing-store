import React from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';

import './header.styles.scss';

import { ReactComponent as Logo } from '../../assets/crown.svg'

import { auth } from '../../firebase/firebase.utils';

const Header = ({currentUser}) => (
    <div className='header'>
        <Link className = "logo-conatiner"  to="/">
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link className="option" to = '/shop'>
                SHOP
            </Link>
            <Link className="option" to='/contact'>
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option'>SIGN IN</Link>
            }
        </div>


    </div>
)

//the below pattern is used to get properties(data) required from reducers

const mapStateToprops = (state) => ({
    // object return from this function
    // name of property will be actual property thatwe want to pass
    //value will be the value

    currentUser : state.user.currentUser //(rootreducer (user) => userReducer(currentUser))
})


export default connect(mapStateToprops)(Header);
