import React from 'react';
import { useRouter } from 'next/dist/client/router';
import { locales, languageNames } from '../../../translations/config';
import { LocaleContext } from '../../../context/LocaleContext';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownItem, MDBDropdownMenu } from 'mdbreact';

const LocaleSwitcher = () => {
  const router = useRouter();
  const { locale } = React.useContext(LocaleContext);

  const handleLocaleChange = (locale) => {
    const regex = new RegExp(`^/(${locales.join('|')})`);
    router.push(router.pathname, router.asPath.replace(regex, `/${locale}`));
  };

  return (
    <MDBDropdown>
      <MDBDropdownToggle nav>
        <i className={`${locale === 'es' ? 'spain' : 'united states'} flag`}></i>
      </MDBDropdownToggle>
      <MDBDropdownMenu>
        {locales.map(locale => (
          <MDBDropdownItem key={locale} onClick={() => handleLocaleChange(locale)}>
            <i className={`${locale === 'es' ? 'spain' : 'united states'} flag`}></i> {languageNames[locale]}
          </MDBDropdownItem>
        ))}
      </MDBDropdownMenu>
    </MDBDropdown>
  );
};

export default LocaleSwitcher;