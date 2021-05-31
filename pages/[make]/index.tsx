// Packages
import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { IMake } from '@/def/IMake';
import { IModel } from '@/def/IModel';

// Layout
import HomePage from './home';

// services
import { getMakes, getModelsByMake } from '@/src/services';

// Utilities
import { config } from '@/util/config';
import getYear from '@/util/get-year';
import getMonth from '@/util/get-month';
import randomizer from '@/util/random-quotes';

const Make: FC<IPlainObject> = (props) => <HomePage {...props} />;

export const getStaticPaths: GetStaticPaths = async () => {
  const makes = await getMakes();
  const paths = makes.map((make: IMake) => ({
    params: { make: make.seoName },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const makes: IMake[] = await getMakes();
  const models: IModel[] = await getModelsByMake(params.make);
  const make = makes.find((item) => item.seoName === params.make);

  const year = getYear();
  const month = getMonth();
  const quotes = randomizer();

  return {
    props: {
      makes,
      make,
      models,
      year,
      month,
      quotes,
    },
  };
};

export default Make;
