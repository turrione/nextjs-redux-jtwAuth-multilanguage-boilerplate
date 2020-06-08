import React from 'react';
import ErrorPage from '../pages/_error';
import { isLocale } from '../translations/getInitialLocale';
import { LocaleProvider } from '../context/LocaleContext';
import { getDisplayName } from 'next/dist/next-server/lib/utils';


export default (WrappedPage) => {
  const WithLocale = ({ locale, ...pageProps }) => {

    if (!locale) {
      // no valid locale detected
      return (<ErrorPage statusCode={404} />);
    }
    return (
      <LocaleProvider lang={locale}>
        <WrappedPage {...pageProps} locale={locale} />
      </LocaleProvider>
    );
  };

  WithLocale.getInitialProps = async ctx => {
    // retrieve initial props of the wrapped component
    let pageProps = {};
    if (WrappedPage.getInitialProps) {
      pageProps = await WrappedPage.getInitialProps(ctx);
    }

    if (typeof ctx.query.lang !== 'string' || !isLocale(ctx.query.lang)) {
      // in case the value of 'lang' is not a valid locale return it as undefined
      return { ...pageProps, locale: undefined };
    }

    // the locale is valid
    return { ...pageProps, locale: ctx.query.lang };
  };

  // pretty display name for the debugger
  WithLocale.displayName = `withLang(${getDisplayName(WrappedPage)})`;

  return WithLocale;
};