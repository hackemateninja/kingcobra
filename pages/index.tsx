// Packages
import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import * as QueryString from 'query-string';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { RootState } from '@/src/definitions/TRootReducer';
import { IPreload } from '@/def/IMetaData';
import { IMake } from '@/def/IMake';

// Layout
import DefaultLayout from '@/layout/default';

// Styles
import GlobalStyles from '@/theme/global';
import CarcomTheme from '@/theme/carcom';

// Slices
import { setMakes } from '@/redux/slices/step-one';

// Components
import Title from '@/comp/title';
import SubTitle from '@/comp/subtitle';
import StepOne from '@/comp/steps/step-one';
import MetaData from '@/comp/meta-data';

// Utilities
import { config } from '@/util/config';
import getMonth from '@/util/get-month';
import getYear from '@/util/get-year';
import randomizer from '@/util/random-quotes';

const Home: React.FC<IPlainObject> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const metadata = useSelector((state: RootState) => state.metadata);
  const stepOne = useSelector((state: RootState) => state.stepOne.data);

  const { month } = props;
  const { prefix, separator, description, keywords } = metadata.home;
  const title = `${prefix.join(` ${separator} `)} ${separator} ${metadata.name}`;

  const handlerSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { selectedMake, selectedModel, zipcode } = stepOne;
    const { zip } = zipcode;

    const queryparams = QueryString.parse(location.search);
    const { utsu, utss } = queryparams;
    const query = (utsu && utss && `?utsu=${utsu}&utss=${utss}`) || '';

    window.open(
      `/s2/${selectedMake.seoName}/${selectedModel.seoName}/${zip}${query}`,
      '',
      `width=${screen.width},height=${screen.height}`
    );
    router.push(`/fas/${selectedMake.seoName}/${selectedModel.seoName}/${zip}${query}`);
  };

  useEffect(() => {
    dispatch(setMakes(props.makes));
  }, []);

  const preload: IPreload[] = [{ type: 'image', elem: '/hero-image.jpg' }];

  return (
    <ThemeProvider theme={CarcomTheme}>
      <MetaData title={title} description={description.join('')} keywords={keywords} preload={preload} />
      <GlobalStyles />
      <DefaultLayout year={props.year} month={month}>
        <Title>Huge {month} Closeout on All New Vehicles</Title>
        <SubTitle>
          Compare Prices from Multiple Dealers and <strong>Get the Lowest Price</strong>
        </SubTitle>
        <StepOne onSubmit={handlerSubmit} makes={props.makes} image="/hero-image.jpg" quotes={props.quotes} />
      </DefaultLayout>
    </ThemeProvider>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const makes: IMake[] = await fetch(`${config.apiBaseUrl}/api/makes`).then((r) => r.json());

  const month = getMonth();
  const year = getYear();
  const quotes = randomizer();

  return { props: { makes, month, year, quotes }, revalidate: 86400 };
};

export default Home;
