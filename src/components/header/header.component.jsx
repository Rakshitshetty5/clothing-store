import React from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';

import './header.styles.scss';

import { ReactComponent as Logo } from '../../assets/crown.svg'

import { auth } from '../../firebase/firebase.utils';

import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

const Header = ({currentUser , hidden}) => (
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
             <CartIcon />
        </div>
        {
            hidden ? null:
            <CartDropdown />
        }
       


    </div>
)

//the below pattern is used to get properties(data) required from reducers

const mapStateToprops = ({user : {currentUser}, cart: {hidden}}) => ({
   //advanced way of destructuring
   //user and cart is taken(destructured) from state
   // then currentUser and hidden is destructured of user and state

    currentUser,
    hidden 
})


export default connect(mapStateToprops)(Header);
