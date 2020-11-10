// Packages
import React, { useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import { makes } from '../../src/data/makes';

// Definitions
import { IPlainObject } from '../../src/definitions/IPlainObject';

// Layout
import DefaultLayout from '../../src/layouts/default';

// Reducers
import { saveImg, saveMake } from '../../store/slices/form';

// Components
import StepOne from '../../src/components/steps/step-one';
import { RootState } from '../../store/reducers';
import { setMonth } from '../../store/slices/month';
import Redirect from '../../src/components/redirect';
import Title from '../../src/components/title';
import SubTitle from '../../src/components/subtitle';

// Styles
import GlobalStyles from '../../src/themes/global';
import PrimaryTheme from '../../src/themes/primary';

const Make: React.FC<IPlainObject> = (props) => {
	const dispatch = useDispatch();
	const { name, value, image } = props.make.length !== 0 && props.make[0];
	let month: string;

	useEffect(() => {
		if ( props.make.length !== 0 ) {
			dispatch( saveMake( name ) );
			dispatch( saveImg( image ) );
		}
	}, [])

	if (!month) dispatch(setMonth());
	month = useSelector((state: RootState) => state.monthData);

	return (
		<ThemeProvider theme={PrimaryTheme}>
			<Head>
				<meta name="description" content={`Huge ${month} ${name} Markdowns Near You. Get ${name} Deals in Your Area & Save`} />
				<meta name="keywords" content={`${name}, ${name} dealers, ${name} sales, ${name} prices, ${name} deals, ${name} clearance, ${name} cars, ${name} trucks, ${name} suv, ${name} dealerships, new ${name}`} />
				<title>{name} Clearance | {name} Deals | Car.com</title>
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
				<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5cb1e5" />
				<link rel="manifest" type="application/json" href="/favicon/manifest.json" />
			</Head>
			<GlobalStyles />
			<DefaultLayout>
				{props.make.length === 1 ? (
					<>
						<Title>Huge Markdowns on {name} This Month!</Title>
						<SubTitle>Compare Prices from Multiple {name} Dealers and <strong>Get the Lowest Price</strong></SubTitle>
						<StepOne makes={props.makesData} make={value} model="" />
					</>
				) : (
					<Redirect />
				)}
			</DefaultLayout>
		</ThemeProvider>
	);
};

export const getServerSideProps: GetServerSideProps = async ( context ) => {
	const currentMake = makes.filter( item => item.value === context.query.make );

	return {
		props: {
			makesData: makes,
			make: currentMake
		},
	}
}

export default Make;