// Packages
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

// Styles
import GlobalStyles from '../../src/themes/global';
import PrimaryTheme from '../../src/themes/primary';

// Components
import Typ from '../../src/components/typ/typ';
import TypHeader from '../../src/components/typ/header';
import TypTopContent from '../../src/components/typ/top-content';
import TypListing from '../../src/components/typ/listing';
import TypBottomContent from '../../src/components/typ/bottom-content';
import TypFooter from '../../src/components/typ/footer';
import SVGs from '../../src/components/typ/svgs';

const dealersInfo = [
	{
		id: "1",
		name: "Midway Ford",
  },
  {
		id: "2",
		name: "Palmetto Truck Center ",
	}
];

export default function Thanks() {
  return (
    <ThemeProvider theme={PrimaryTheme}>
      <Head>
        <title>New Car Closeout | New Car Deals | Car.com</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
				<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5cb1e5" />
				<link rel="manifest" type="application/json" href="/favicon/manifest.json" />
      </Head>
      <GlobalStyles />
      <Typ>
        <TypHeader />
        <div>
          <TypTopContent name="John" last="Doe" make="Ford" model="F-250" dealers={dealersInfo} />
          <TypListing />
          <TypBottomContent />
          <TypFooter />
        </div>
      </Typ>
      <SVGs />
    </ThemeProvider>
  );
}
