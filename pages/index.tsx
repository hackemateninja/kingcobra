// Packages
import { GetStaticProps } from 'next';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { IMake } from '@/def/IMake';

// Components
import Home from '@/comp/home';

// Utilities
import getMonth from '@/util/get-month';
import getYear from '@/util/get-year';
import randomizer from '@/util/random-quotes';

// Services
import { getMakes } from '@/src/services';

const HomePage: React.FC<IPlainObject> = (props) => (
  <Home year={props.year} month={props.month} quotes={props.quotes} makes={props.makes} />
);

export const getStaticProps: GetStaticProps = async () => {
  const makes: IMake[] = await getMakes();
  const month = getMonth();
  const year = getYear();
  const quotes = randomizer();

  return {
    props: { month, year, quotes, makes },
    revalidate: 3600,
  };
};

export default HomePage;
