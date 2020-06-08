import React from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';

import initialize from '../../utils/initialize';

import {
    MDBRow,
    MDBCol,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBListGroupItem,
    MDBListGroup
} from 'mdbreact';
import { bindActionCreators } from 'redux';
import withLocale from '../../hocs/withLocale';
import Layout from '../../components/layout/Layout';
import useTranslation from '../../hook/useTranslation';


const Profile = (props) => {

    let { t } = useTranslation();

    return (
        <Layout
            title={t('profile.title')}>
            <MDBContainer>
                <MDBRow style={{ marginTop: 300 }} className="justify-content-center">
                    <MDBCol md="6" style={{ maxWidth: '700px' }}>
                        <MDBCard>
                            <MDBCardHeader>
                                <p className="h5 text-center mb-4">{t('profile.title')}</p>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <MDBListGroup style={{ width: "22rem" }}>
                                    <MDBListGroupItem active>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">{t('profile.yourEmail')}</h5>
                                        </div>
                                        <p className="mb-1">{props.profile.user.email}</p>
                                        <small>props.profile.user.email</small>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Token</h5>
                                        </div>
                                        <p className="mb-1">{props.authentication.token}</p>
                                        <small>props.authentication.token</small>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </Layout>
    );
};

Profile.getInitialProps = async (ctx) => {
    initialize(ctx);
    let token = ctx.store.getState().authentication.token;
    if (token) {
        await ctx.store.dispatch(actions.getProfile(token, 'getProfile'));
    } else {
        // GUARD => If no token, redirect to home
        ctx.res.redirect('/');
    }
}

const mapStateToPprops = (state) => state;

const mapDispatchToProps = (dispatch) => {
    const { getProfile } = bindActionCreators(actions, dispatch);
    return { getProfile };
};

export default connect(mapStateToPprops, mapDispatchToProps)(withLocale(Profile));