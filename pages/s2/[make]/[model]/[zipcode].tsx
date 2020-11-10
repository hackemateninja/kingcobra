// Packages
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'

// Definitions
import { IPlainObject } from '../../../../src/definitions/IPlainObject';

// Layout
import DefaultLayout from '../../../../src/layouts/default';

// Components
import StepTwo from '../../../../src/components/steps/step-two';
import { RootState } from '../../../../store/reducers';
import { setMonth } from '../../../../store/slices/month';

// Styles
import GlobalStyles from '../../../../src/themes/global';
import PrimaryTheme from '../../../../src/themes/primary';

const PageStepTwo: React.FC<IPlainObject> = ( props ) => {
	const router = useRouter();
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
			</Head>
			<GlobalStyles />
			<DefaultLayout>
				<StepTwo />
			</DefaultLayout>
		</ThemeProvider>
	);
};

export default PageStepTwo;