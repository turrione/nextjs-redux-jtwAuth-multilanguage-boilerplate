import React, { Fragment, useState } from 'react';

import LocaleLink from '../../shared/Link';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from 'mdbreact';
import LocaleSwitcher from './LocaleSwitcher';
import useTranslation from '../../../hook/useTranslation';
import Router from 'next/router';


const Navigation = (props) => {

  let [isOpen, setIsOpen] = useState(false);
  let { isAuthenticated, deauthenticate, page } = props;
  let { locale, t } = useTranslation();

  return (
    <MDBNavbar
      color="indigo"
      fixed="top"
      dark
      expand="md"
      scrolling={page === 'home' ? true : false}>
      <MDBNavbarBrand>
        <LocaleLink href="">
          <a>
            <strong className="white-text">NextJS App</strong>
          </a>
        </LocaleLink>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav right>
          {
            isAuthenticated ?
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <MDBIcon icon="user" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem onClick={() => Router.push('/[lang]/profile', `/${locale}/profile`)}>{t('nav.profile')}</MDBDropdownItem>
                    <MDBDropdownItem onClick={() => deauthenticate()}>{t('nav.logout')}</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem> :
              <Fragment>
                <MDBNavItem>
                  <LocaleLink href="signin">
                    <a className="nav-link">{t('nav.signin')}</a>
                  </LocaleLink>
                </MDBNavItem>
                <MDBNavItem>
                  <LocaleLink href="signup">
                    <a className="nav-link">{t('nav.signup')}</a>
                  </LocaleLink>
                </MDBNavItem>
              </Fragment>
          }
          <LocaleSwitcher />
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};
export default Navigation;