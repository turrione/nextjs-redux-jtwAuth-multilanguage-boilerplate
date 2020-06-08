import Head from 'next/head';


// Redux
import { connect } from 'react-redux';
import actions from '../../redux/actions';

// Components
import { Fragment } from 'react';
import Navigation from './navigation/Navigation';

const Layout = ({
  children,
  isAuthenticated,
  deauthenticate,
  title,
  description,
  keywords }) => (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <title>{title}</title>
      </Head>

      <Navigation
        isAuthenticated={isAuthenticated}
        deauthenticate={deauthenticate} />

      <div id="main" className="custom-margin">
        {children}
      </div>

      <style jsx>{`
    .custom-margin {
      margin-top: 56px;
    }
    `}</style>
    </Fragment>
  );

const mapStateToProps = (state) => (
  { isAuthenticated: !!state.authentication.token }
);

export default connect(mapStateToProps, actions)(Layout);
