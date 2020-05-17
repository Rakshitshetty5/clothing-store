import React from 'react';

import './cart-icon.styles.scss';

import { ReactComponent as ShoppingIcon} from '../../assets/original.svg'

const CartIcon = () => (
    <div className="cart-icon">
        <ShoppingIcon className="shopping-icon" />
        <span className="item-count">0</span>
    </div>
)

export default CartIcon