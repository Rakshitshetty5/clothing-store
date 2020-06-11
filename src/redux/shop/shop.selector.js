import { createSelector } from 'reselect'




const shopSelect = state => state.shop

export const shopCollectionSelect = createSelector(
    [shopSelect],
    shop => shop.collections
)

export const selectCollectionForPreview = createSelector(
    [shopCollectionSelect],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

//currying
export const selectCollection = collectionUrlParam => 
    createSelector(
        [shopCollectionSelect],
        collections => collections ? collections[collectionUrlParam] : null
        )

export const selectIsCollectionFetching = createSelector(
    [shopSelect],
    shop => shop.isFetching
)

export const selectIsCollectionLoaded = createSelector(
    [shopSelect],
    shop => !!shop.collections //return true or false
)