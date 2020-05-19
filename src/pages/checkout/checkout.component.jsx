import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { selectCartTotal } from '../../redux/cart/cart.selectors'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import './checkout.styles.scss';

const CheckoutPage = ({ cartItems, total}) =>(
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-text">
                <span>Product</span>
            </div>
            <div className="header-text">
                <span>Description</span>
            </div>
            <div className="header-text">
                <span>Qunatity</span>
            </div>
            <div className="header-text">
                <span>Price</span>
            </div>
            <div className="header-text">
                <span>Remove</span>
            </div>
        </div>
        {cartItems.map(cartItem => <CheckoutItem key ={cartItem.id} cartItem={cartItem}/>)}
        <div className="total">
            <span>TOTAL: ${total}</span>
        </div>
    </div>
) 

const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems,
    total : selectCartTotal
})
//when we dont pass the other (dispatch one) in connect then we have
// access to dispatch in the function( i.e checkout page )
// check by {...otherProps} printing the above(use a return satement)
export default connect(mapStateToProps)(CheckoutPage);