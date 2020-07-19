import { takeLatest, put, call  } from "redux-saga/effects";


import { firestore, convertCollectionsSnapshotToMap } from "./../../firebase/firebase.utils";

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from "./shop.types";


export function* fetchCollectionAsync(){
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap,snapshot); // call function is used to call convertCollectionsSnapshotToMap and passes the 
                                                                                            //snapshot value to it 
        yield put(fetchCollectionsSuccess(collectionsMap)) //put is equal to dispatch
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }


}


export function* fetchCollectionStart(){
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,//fetchCollectionStart decorator keeps on listening for FETCH_C_S action and when it comes it executes fetchCollectionAsyn
        fetchCollectionAsync
    );
}