export const addItemToCart = (cartItems, cartItemToAdd) => {

    //checking whether new item alredy present in cart.
    const exsitingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    )

    //if present()
    if(exsitingCartItem){
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id ?
                {...cartItem, quantitiy: cartItem.quantitiy + 1 }
                :
                cartItem
            )
    }

    return [...cartItems, {...cartItemToAdd, quantitiy: 1}]
}

