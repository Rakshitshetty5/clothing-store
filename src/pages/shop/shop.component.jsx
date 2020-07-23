import React, { lazy, Suspense} from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
// import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container';
// import CollectionPageContainer from '../collection/collection.container'

import { fetchCollectionsStart } from '../../redux/shop/shop.actions'
import Spinner from '../../components/spinner/spinner.components'

const CollectionOverviewContainer = lazy(() => import('../../components/collection-overview/collection-overview.container'));
const CollectionPageContainer = lazy(() => import('../collection/collection.container'))

// in app.js Route passes object to shopage automatically.
class ShopPage extends React.Component{


    componentDidMount(){

        const { fetchCollectionsStart } = this.props;
        fetchCollectionsStart();

    }



    render(){
        const {  match } = this.props;

        return(

            <div className="shop-page">
                <Suspense fallback={<Spinner />}>
                <Route exact path = {`${match.path}`} component = {CollectionOverviewContainer} />
                <Route path = {`${match.path}/:collectionId`} component = { CollectionPageContainer }/>
                </Suspense>
            </div>
                    
        )
    }

}


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})


export default connect(null,mapDispatchToProps)(ShopPage);