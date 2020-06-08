import Link from "next/link";
import useTranslation from "../../hook/useTranslation";

const LocaleLink = ({ href, children }) => {

  const { locale } = useTranslation();

  return (
    <Link href={`/[lang]${href}`} as={`/${locale}${href && '/' + href}`} >
      {children}
    </Link>
  );
};

export default LocaleLink;