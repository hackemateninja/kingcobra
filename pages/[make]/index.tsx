// Packages
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

// Definitions
import { IPlainObject } from "@/def/IPlainObject";
import { RootState } from "@/def/TRootReducer";
import { IPreload } from "@/def/IMetaData";
import { IMake } from "@/def/IMake";
import { IModel } from "@/def/IModel";

// Layout
import DefaultLayout from "@/layout/default";

// Slices
import { setMakes, setSelectedMake, saveModels } from "@/redux/slices/step-one";

// Components
import MetaData from "@/comp/meta-data";
import StepOne from "@/comp/steps/step-one";
import Redirect from "@/comp/redirect";
import Title from "@/comp/title";
import SubTitle from "@/comp/subtitle";

// Utilities
import setSuffix from "@/util/suffix";
import combineAnS from "@/util/combine-ans";
import setPrefix from "@/util/prefix";
import { config } from "@/util/config";
import getYear from "@/util/get-year";
import getMonth from "@/util/get-month";
import randomizer from "@/util/random-quotes";

// Styles
import GlobalStyles from "@/theme/global";
import CarcomTheme from "@/theme/carcom";

const Make: React.FC<IPlainObject> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  if (!props.make) {
    return <Redirect />;
  }

  const metadata = useSelector((state: RootState) => state.metadata);
  const stepOne = useSelector((state: RootState) => state.stepOne.data);
  const { prefix, separator, description, keywordsPnS } = metadata.make;

  const { name, seoName, smallJpg } = props.make !== null ? props.make : { name: null, seoName: null, smallJpg: null };

  const title = `${setSuffix(prefix, name, ` ${separator} `)} ${separator} ${metadata.name}`;
  const desc = combineAnS(description, name);
  const prekeys = setPrefix(keywordsPnS.prefix, name, ", ");
  const sufkeys = setSuffix(keywordsPnS.suffix, name, ", ");
  const keys = `${prekeys}, ${sufkeys}`;

  const handlerSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { selectedMake, selectedModel, zipcode } = stepOne;
    const { zip } = zipcode;
    window.open(
      `/s2/${selectedMake.seoName}/${selectedModel.seoName}/${zip}`,
      "",
      `width=${screen.width},height=${screen.height}`
    );

    router.push(`/fas/${selectedMake.seoName}/${selectedModel.seoName}/${zip}`);
  };

  useEffect(() => {
    dispatch(setMakes(props.makes));
    dispatch(setSelectedMake(seoName));
    dispatch(saveModels(props.models));
  }, []);

  const preload: IPreload[] = [
    // { elem: props.make.imageJpg, type: "image" },
    { elem: props.make.smallJpg, type: "image" },
  ];

  return (
    <>
      <ThemeProvider theme={CarcomTheme}>
        <MetaData title={title} description={desc} keywords={keys} preload={preload} />
        <GlobalStyles />
        <DefaultLayout year={props.year} month={props.month}>
          <Title>Huge Markdowns on {name} This Month!</Title>
          <SubTitle>
            Compare Prices from Multiple {name} Dealers and <strong>Get the Lowest Price</strong>
          </SubTitle>
          <StepOne makes={props.makes} make={seoName} image={smallJpg} onSubmit={handlerSubmit} quotes={props.quotes} />
        </DefaultLayout>
      </ThemeProvider>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const makes = await fetch(`${config.apiBaseUrl}/api/makes`).then<IMake[]>((r) => r.json());
  const paths = makes.map((make: IMake) => ({
    params: { make: make.seoName },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const makes: IMake[] = await fetch(`${config.apiBaseUrl}/api/makes`).then((r) => r.json());
  const models: IModel[] = await fetch(`${config.apiBaseUrl}/api/models/${params.make}`).then((r) => r.json());
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
