import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute(props, { component: Component, roles, ...rest }) {
    return (
        <Route {...rest} render={props => {
            if (!props.login) {
                return <Redirect to={{ pathname: '/index', state: { from: props.location} }} />
            }

            return <Component {...props} />
        }} />
    );
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}


export default connect(mapStateToProps)(PrivateRoute);