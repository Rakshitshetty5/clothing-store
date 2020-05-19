import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component'

import { selectCartItems } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import './cart-dropdown.styles.scss';


const CartDropdown = ({cartItems, history, dispatch}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ?
                cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)
                :
                <span className="empty-message">Your cart is empty</span>
            }
        </div>
        <CustomButton onClick = { () => {
            history.push('/checkout');
            dispatch(toggleCartHidden());
        }}
        >Go To Checkout</CustomButton>
    </div>
)
/*
const mapStateToProps = (state) => ({
    cartItems : selectCartItems(state)
}
)   */
const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems
}
)
//when we dont pass the other (dispatch one) in connect then we have
// access to dispatch in the function( i.e cart-dropdown)
// check by {...otherProps} printing the above(use a return satement)
    
export default withRouter(connect(mapStateToProps)(CartDropdown));