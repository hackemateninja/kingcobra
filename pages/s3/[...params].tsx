// Packages
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

// Definitions
import { IPlainObject } from '../../src/definitions/IPlainObject';

// Layout
import DefaultLayout from '../../src/layouts/default';

// Styles
import GlobalStyles from '../../src/themes/global';
import PrimaryTheme from '../../src/themes/primary';

////

const StepThree: React.FC<IPlainObject> = ( props ) => {

	const router = useRouter();
	const [models, setModels] = useState([]);
	const [make, setMake] = useState('');
	const [model, setModel] = useState('');
	const [zip, setZip] = useState('');

	let test = [];

	useEffect(() => {
		console.log(props.params);
		test = props.params;
		console.log(test[0], test[1], test[2]);
		setMake(test[0]);
		setModel(test[1]);
		setZip(test[2]);
	}, []);

	// const key = `${make}/${model}/${zipcode}`;

	useEffect(() => {
		const apiUrl = `https://jsonplaceholder.typicode.com/users`;
		fetch(apiUrl)
      	.then((response) => response.json())
      	.then(data => setModels(data));
	}, [])

	return (
		<ThemeProvider theme={PrimaryTheme}>
			<Head>
				<title>New Car Closeout | New Car Deals | Car.com</title>
			</Head>
			<GlobalStyles />
			<DefaultLayout>
				<h1>Step Two</h1>
				<ul>
					<li>Make: {make}</li>
					<li>Model: {model}</li>
					<li>Zip Code: {zip}</li>
				</ul>
				<ul>
					{models.map((user) => (
						<li key={user.id}>{user.name}</li>
					))}
				</ul>
			</DefaultLayout>
		</ThemeProvider>
	);
};

export async function getServerSideProps(content) {
	const { params } = content.query;
	return {props: {params}}
}

export default StepThree;