import React from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import './header.styles.scss';

import { ReactComponent as Logo } from '../../assets/crown.svg'

import { auth } from '../../firebase/firebase.utils';

import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selector'

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
                <Link className='option' to = '/signin'>SIGN IN</Link>
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

const mapStateToprops = createStructuredSelector({

   /*
    currentUser : selectCurrentUser(state),
    hidden : selectCartHidden(state)
    */ //this is similar to below due to 
    //createStructuredSElector we have access to top level state which directly gets passed down

    currentUser : selectCurrentUser,
    hidden: selectCartHidden
})


export default connect(mapStateToprops)(Header);
