// Packages
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import { makes } from '../src/data/makes';

// Definitions
import { IPlainObject } from '../src/definitions/IPlainObject';

// Layout
import DefaultLayout from '../src/layouts/default';

// Styles
import GlobalStyles from '../src/themes/global';
import PrimaryTheme from '../src/themes/primary';

// Components
import Title from '../src/components/title';
import SubTitle from '../src/components/subtitle';
import StepOne from '../src/components/steps/step-one';
import { RootState } from '../store/reducers';
import { setMonth } from '../store/slices/month';

const Home: React.FC<IPlainObject> = (props) => {
	const dispatch = useDispatch();
	let month: string;

	if (!month) dispatch(setMonth());
	month = useSelector((state: RootState) => state.monthData);

	return (
		<ThemeProvider theme={PrimaryTheme}>
			<Head>
				<title>New Car Closeout | New Car Deals | Car.com</title>
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
				<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5cb1e5" />
				<link rel="manifest" type="application/json" href="/favicon/manifest.json" />
				<meta name="description" content={"Huge "+ month +" Markdowns On New Cars. Get Your Internet Price Now & Save"} />
				<meta name="keywords" content="new cars, new auto, car dealers, car sales, car deals, car prices, suv sales, truck sales, car dealerships" />
				<meta name="robots" content="noindex, nofollow" />
				<meta name="audience" content="all" />
				<meta name="revisit-after" content="5 days" />
				<meta name="distribution" content="global" />
			</Head>
			<GlobalStyles />
			<DefaultLayout>
				<Title>Huge {month} Closeout on All New Vehicles</Title>
				<SubTitle>Compare Prices from Multiple Dealers and <strong>Get the Lowest Price</strong></SubTitle>
				<StepOne makes={props.makesData} make="" model="" />
			</DefaultLayout>
		</ThemeProvider>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		props: {
			makesData: makes
		},
	}
}

export default Home;