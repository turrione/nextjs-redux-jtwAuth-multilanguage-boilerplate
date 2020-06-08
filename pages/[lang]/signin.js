import React, { useState, useEffect } from 'react';
import LocaleLink from '../../components/shared/Link';

import { connect } from 'react-redux';
import actions from '../../redux/actions';

import initialize from '../../utils/initialize';

import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBMask,
  MDBView,
  MDBCard,
  MDBCardBody,
  MDBCardHeader
} from 'mdbreact';
import { bindActionCreators } from 'redux';
import withLocale from '../../hocs/withLocale';
import Layout from '../../components/layout/Layout';
import useTranslation from '../../hook/useTranslation';
import { useRouter } from 'next/router';

const Signin = (props) => {

  let { t, locale } = useTranslation();
  let router = useRouter();

  let [state, setState] = useState({
    email: 'fake@test.com',
    password: '123456'
  });

  useEffect(() => {
    if (props.authentication.token) router.push('/[lang]/profile', `/${locale}/profile`);
  }, [props.authentication.token]);

  let handleSubmit = (e) => {
    e.preventDefault();
    props.authenticate(
      { email: state.email, password: state.password },
      '/' + locale, 'login'
    );
  };

  return (
    <Layout
      title={t('signin.title')}>
      <MDBView src={'/images/background.jpeg'} fixed>
        <MDBMask className="rgba-black-light d-flex justify-content-center align-items-center">
          <MDBContainer>
            <MDBRow className="justify-content-center">
              <MDBCol md="6" style={{ maxWidth: '400px' }}>
                <MDBCard>
                  <MDBCardHeader>
                    <p className="h5 text-center mb-4">{t('signin.title')}</p>
                  </MDBCardHeader>
                  <MDBCardBody>
                    <form onSubmit={handleSubmit.bind(this)}>
                      <div className="grey-text">
                        <MDBInput
                          label={t('signin.writeEmail')}
                          icon="envelope"
                          onChange={e => setState({ ...state, email: e.target.value })}
                          value={state.email}
                          group
                          type="email"
                          validate
                          error="wrong"
                          success="right" />
                        <MDBInput
                          label={t('signin.writePassword')}
                          icon="lock"
                          onChange={e => setState({ ...state, password: e.target.value })}
                          value={state.password}
                          group
                          type="password"
                          validate />
                      </div>

                      <MDBRow className="text-center">
                        <MDBCol sm="12">
                          <MDBBtn color="indigo" type="submit" >{t('signin.btn')}</MDBBtn>
                        </MDBCol>
                        <MDBCol sm="12">
                          <span
                            className="font-weight-bold text-muted"
                            style={{ cursor: 'pointer' }}>
                            <strong>{t('signin.forgotPass')}</strong>
                          </span>
                        </MDBCol>
                        <MDBCol sm="12">
                          <span
                            className="font-weight-bold text-muted"
                            style={{ cursor: 'pointer' }}>
                            <strong>{t('signin.noHaveAccount')}</strong>
                          </span>
                          <LocaleLink href="signup">
                            <a> {t('signin.href')}</a>
                          </LocaleLink>
                        </MDBCol>
                      </MDBRow>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBMask>
      </MDBView>
    </Layout >
  );
};

Signin.getInitialProps = (ctx) => {
  initialize(ctx);
};


const mapStateToPprops = (state) => state;

const mapDispatchToProps = (dispatch) => {
  const { authenticate } = bindActionCreators(actions, dispatch);
  return { authenticate };
};

export default connect(mapStateToPprops, mapDispatchToProps)(withLocale(Signin));
