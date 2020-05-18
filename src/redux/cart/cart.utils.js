export const addItemToCart = (cartItems, cartItemToAdd) => {

    //checking whether new item alredy present in cart.
    const exsitingCartItem = cartItems.find(
        // find returns the first element that satisfies a condition
        cartItem => cartItem.id === cartItemToAdd.id
    )

    //if present()
    if(exsitingCartItem){
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id ?
                {...cartItem, quantity: cartItem.quantity + 1 }
                :
                cartItem
            )
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}

