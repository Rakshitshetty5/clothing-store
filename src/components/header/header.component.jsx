import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import { ReactComponent as Logo } from '../../assets/crown.svg'

import { auth } from '../../firebase/firebase.utils';

import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selector'
import { HeaderContainer, OptionsContainer, OptionLink, LogoContainer} from './header.styles'

import { signOutStart } from '../../redux/user/user.actions'
import { dispatch } from 'rxjs/internal/observable/pairs';

const Header = ({currentUser , hidden, signOutStart}) => (
    <HeaderContainer>
        <LogoContainer  to="/">
            <Logo className="logo" />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to = '/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/contact'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionLink as = 'div' onClick={signOutStart}>SIGN OUT</OptionLink>
                :
                <OptionLink to = '/signin'>SIGN IN</OptionLink>
            }
             <CartIcon />
        </OptionsContainer>
        {
            hidden ? null:
            <CartDropdown />
        }
       


    </HeaderContainer>
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

const mapDispatchToProps = dispatch => ({
    signOutStart : () => dispatch(signOutStart())
})


export default connect(mapStateToprops,mapDispatchToProps)(Header);
