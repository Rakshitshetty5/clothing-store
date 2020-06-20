import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { selectIsCollectionFetching }  from '../../redux/shop/shop.selector';
import WithSpinner from '../with-spinner/with-spinner.component'
import CollectionsOverview from './collection-overview.component'
import { connect } from 'react-redux';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
})

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer