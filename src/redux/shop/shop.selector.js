import { createSelector } from 'reselect'

const COLLECTION_ID_MAP = {
    hats : 1,
    sneakers : 2,
    jackets : 3,
    womens : 4,
    mens : 5
}



const shopSelect = state => state.shop

export const shopCollectionSelect = createSelector(
    [shopSelect],
    shop => shop.collection
)

//currying
export const selectCollection = collectionUrlParam => 
    createSelector(
        [shopCollectionSelect],
        collections => collections.find(
            collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
        )

    )