import { all, call, takeLatest, put } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.actions';

export function* clearCartOnSignOut(){
    yield put(clearCart());
    // more thing .....
    // yield 2
    // yield 3
}


export function* onSignOutSuccess(){
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS,clearCartOnSignOut)
    // when signout success is dispatched from usersaga
}


export function* cartSagas(){
    yield(all([call(onSignOutSuccess)]))
}