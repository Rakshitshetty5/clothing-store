import React from 'react';
import { Route } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'
import { selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selector.js'

const WithSpinnerForCollectionOverview = WithSpinner(CollectionOverview);
const WithSpinnerForCollectionPage = WithSpinner(CollectionPage);

// in app.js Route passes object to shopage automatically.
class ShopPage extends React.Component{


    componentDidMount(){

        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();

    }



    render(){
        const { isCollectionFetching, match, isCollectionLoaded } = this.props;

        return(

            <div className="shop-page">
                <Route exact path = {`${match.path}`} render = {(props) => <WithSpinnerForCollectionOverview isLoading={isCollectionFetching} {...props} />} />
                <Route path = {`${match.path}/:collectionId`} render = {(props) => <WithSpinnerForCollectionPage isLoading={!isCollectionLoaded} {...props} />} />
            </div>
                    
        )
    }

}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching : selectIsCollectionFetching,
    isCollectionLoaded : selectIsCollectionLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})


export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);