import { connect } from 'react-redux';
import initialize from '../../utils/initialize';
import Layout from '../../components/layout/Layout';
import {
  MDBView,
  MDBMask,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBCol,
  MDBAnimation,
  MDBIcon
} from 'mdbreact';
import useTranslation from '../../hook/useTranslation';
import withLocale from '../../hocs/withLocale';
import LocaleLink from '../../components/shared/Link';
import Swal from 'sweetalert2';


const Index = () => {

  const { t } = useTranslation();

  return (
    <Layout
      title={t('home.title')}
      page="home">
      <div className="p-1 card bg-secondary" style={{ position: 'sticky', top: '56px', zIndex: '999' }}>
        <div className="text-center">
          <MDBBtn
            onClick={() => Swal.fire({ title: 'Fake button' })}
            color="blue"
            size="sm"
            style={{ borderRadius: '40px' }}
          >
            <span className="ml-3">DIV .bg-secondary    ||    BUTTON color="blue" </span>
          </MDBBtn>
        </div>
      </div>
      <div className="p-1 card bg-light" style={{ position: 'sticky', top: '56px', zIndex: '999' }}>
        <div className="text-center">
          <MDBBtn
            onClick={() => Swal.fire({ title: 'Fake button' })}
            color="indigo"
            size="sm"
            style={{ borderRadius: '40px' }}
          >
            <span className="ml-3">DIV .bg-light    ||    BUTTON color="indigo"</span>
          </MDBBtn>
        </div>
      </div>
      <MDBView src={'/images/background.jpeg'} fixed>
        <MDBMask className="rgba-black-strong d-flex justify-content-center align-items-center">
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12" className="mb-4 white-text text-center">
                <MDBAnimation type="heartBeat">
                  <h1 className="display-3 mb-0 pt-md-5 pt-5 white-text font-weight-bold" >NEXT<span className="indigo-text font-weight-bold">JS</span></h1>
                </MDBAnimation>
                <hr className="hr-light my-4" />
                <h5 className="text-uppercase pt-md-5 pt-sm-2 pt-5 pb-md-5 pb-sm-3 pb-5 white-text font-weight-bold">{t('home.slogan')}</h5>
                <LocaleLink href="signup">
                  <a>
                    <MDBBtn color="indigo" size="lg" >
                      {t('common.createAccount')}
                    </MDBBtn>
                  </a>
                </LocaleLink>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBMask>
      </MDBView>
    </Layout>
  );
};


Index.getInitialProps = function (ctx) {
  initialize(ctx);
};

export default connect(state => state)(withLocale(Index));
