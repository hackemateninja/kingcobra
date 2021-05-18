// Packages
import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { IModel } from '@/def/IModel';
import { IMake } from '@/def/IMake';

// Layout
import HomePage from './home';

// services
import { getMakes, getModelsByMake } from '@/src/services';

// Utilities
import getYear from '@/util/get-year';
import getMonth from '@/util/get-month';
import randomizer from '@/util/random-quotes';

const Home: FC<IPlainObject> = (props) => <HomePage {...props} />;

export const getStaticPaths: GetStaticPaths = async () => {
  const makes = await getMakes();
  const getModelsByMakeRequests = makes.map((make) => getModelsByMake(make.seoName));
  const receivedModels = await Promise.all(getModelsByMakeRequests);
  const paths = receivedModels.reduce<{ params: { make: string; model: string } }[]>(
    (paths, models, index) => [
      ...paths,
      ...models.map((model) => ({
        params: {
          make: makes[index].seoName,
          model: model.seoName,
        },
      })),
    ],
    []
  );

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const makes: IMake[] = await getMakes();
  const make = makes.find((item) => item.seoName === params.make);
  const models: IModel[] = await getModelsByMake(params.make);
  const model = models.find((item) => item.seoName === params.model);

  const year = getYear();
  const month = getMonth();
  const quotes = randomizer();

  return {
    props: {
      makes,
      models,
      make,
      model,
      year,
      month,
      quotes,
    },
  };
};

export default Home;
