import React, {Component} from "react";
import {Route} from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/CollectionsOverview";
import CollectionPage from "../collection/CollectionPage";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {connect} from "react-redux";
import {updateCollections} from "../../redux/shop/shopActions";
import {WithSpinner} from "../../components/with-spinner/withSpinner";
import {createStructuredSelector} from "reselect";
import {selectIsCollectionsLoaded} from "../../redux/shop/shopSelectors";
import './ShopPage.scss';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends Component {
    state = {
        loading: true
    }
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const collectionRef = firestore.collection('collections')
        const {updateCollections} = this.props

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
            async snapshot => {
                const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
                updateCollections(collectionsMap);
                this.setState({loading: false})
            }
        )
    }

    render() {
        const {match, isCollectionsLoaded} = this.props;
        const {loading} = this.state;

        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`}
                       render={props => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>}
                />
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
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)