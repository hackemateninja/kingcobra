// Packages
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

// Styles
import GlobalStyles from '@/theme/global';
import PrimaryTheme from '@/theme/primary';

const FAS: React.FC = (props) => {
	return (
		<ThemeProvider theme={PrimaryTheme}>
			<Head>
				<title>FAS Here</title>
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
				<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5cb1e5" />
				<link rel="manifest" type="application/json" href="/favicon/manifest.json" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
			</Head>
			<GlobalStyles />
			<p>FAS Here</p>
		</ThemeProvider>
	);
};

export default FAS;