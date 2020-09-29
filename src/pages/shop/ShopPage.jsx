import React, {Component} from "react";
import {Route} from "react-router-dom";
import CollectionPage from "../collection/CollectionPage";
import {connect} from "react-redux";
import {fetchCollectionsStartAsync} from "../../redux/shop/shopActions";
import {withSpinner} from "../../components/with-spinner/withSpinner";
import {createStructuredSelector} from "reselect";
import {selectIsCollectionsLoaded} from "../../redux/shop/shopSelectors";
import './ShopPage.scss';
import {collectionsOverviewContainer} from "../../components/collections-overview/collectionOverviewContainer";

const CollectionPageWithSpinner = withSpinner(CollectionPage)

class ShopPage extends Component {
    collectionsOverviewContainer;
    componentDidMount() {
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync()
    }

    render() {
        const {match, isCollectionsLoaded} = this.props;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={collectionsOverviewContainer}/>
                <Route path={`${match.path}/:collectionId`}
                       render={props => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props}/>}
                />
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)