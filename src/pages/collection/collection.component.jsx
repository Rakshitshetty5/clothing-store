import React from 'react';
import CollectionItem from '../../components/collection-item/collection-item.component';
import './collection.styles.scss';
import { selectCollection } from '../../redux/shop/shop.selector'
import {  connect } from 'react-redux';

const CollectionPage = ({collection}) => {
    const {title, items} = collection;
    return  (
        <div className='collection-page'>
            <h2>{title}</h2>
            {items.map(item => 
                <CollectionItem item = {item} />)}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    collection : selectCollection(ownProps.match.params.collectionId)(state) 
}
)

export default connect(mapStateToProps)(CollectionPage)