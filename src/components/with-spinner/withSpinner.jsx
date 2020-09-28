import React from "react";
import {SpinnerContainer, SpinnerOverlay} from "./withSpinnerStyles";

export const WithSpinner = WrappedComponent => {
    return ({isLoading, ...otherProps}) => {
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer/>
            </SpinnerOverlay>
        ) : (
            <WrappedComponent {...otherProps}/>
        )
    }
}