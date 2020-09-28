import React, {Component} from "react";
import {Route} from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/CollectionsOverview";
import CollectionPage from "../collection/CollectionPage";
import {connect} from "react-redux";
import {fetchCollectionsStartAsync} from "../../redux/shop/shopActions";
import {WithSpinner} from "../../components/with-spinner/withSpinner";
import {createStructuredSelector} from "reselect";
import {selectIsCollectionFetching, selectIsCollectionsLoaded} from "../../redux/shop/shopSelectors";
import './ShopPage.scss';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends Component {
    componentDidMount() {
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync()
    }

    render() {
        const {match, isCollectionsLoaded, isFetchingCollections} = this.props;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`}
                       render={props => <CollectionsOverviewWithSpinner isLoading={isFetchingCollections} {...props}/>}
                />
                <Route path={`${match.path}/:collectionId`}
                       render={props => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props}/>}
                />
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionsLoaded: selectIsCollectionsLoaded,
    isFetchingCollections: selectIsCollectionFetching
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)