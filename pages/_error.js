// pages/_error.js

import Layout from "../components/layout/Layout";
import { MDBView, MDBMask, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn } from "mdbreact";
import Link from "next/link";
import useTranslation from "../hook/useTranslation";
import withLocale from "../hocs/withLocale";

function ErrorPage({ statusCode }) {

  let { t } = useTranslation();

  return (
    <Layout title={t('error.title')}>
      <MDBView
        src={'/images/background.jpeg'}
        fixed>
        <MDBMask className="rgba-black-strong d-flex justify-content-center align-items-center">
          <MDBRow>
            <MDBCol>
              <MDBCard style={{ backgroundColor: '#00000047', maxWidth: '500px' }}>
                <MDBCardBody className="error-main">
                  <div className="error-main text-center">
                    <h1 className="m-0">{statusCode}</h1>
                    <h5 className="mb-4">{t('error.message')}</h5>
                    <Link href="/">
                      <a>
                        <MDBBtn
                          color="green"
                          className="white-text btn-light-blue"
                          size="lg">
                          {t('error.btn')}
                        </MDBBtn>
                      </a>
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBMask>
      </MDBView>
      <style jsx>{`

.error-main h1{
  font-weight: bold;
  color: #ffff;
  font-size: 100px;
  text-shadow: 2px 4px 5px #6E6E6E;
}
.error-main h5{
  color: #ffff;
}
      `}</style>
    </Layout>
  );
}

function getInitialProps({ res, err }) {
  let statusCode;
  // If the res variable is defined it means nextjs
  // is in server side
  if (res) {
    statusCode = res.statusCode;
  } else if (err) {
    // if there is any error in the app it should
    // return the status code from here
    statusCode = err.statusCode;
  } else {
    // Something really bad/weird happen and status code
    // cannot be determined.
    statusCode = null;
  }
  return { statusCode };
}

ErrorPage.getInitialProps = getInitialProps;

export default ErrorPage;