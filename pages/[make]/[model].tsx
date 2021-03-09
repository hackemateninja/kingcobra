// Packages
import { useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

// Definitions
import { IPlainObject } from "@/def/IPlainObject";
import { RootState } from "@/def/TRootReducer";
import { IPreload } from "@/def/IMetaData";
import { IModel } from "@/def/IModel";
import { IMake } from "@/def/IMake";

// Layout
import DefaultLayout from "@/layout/default";

// Slices
import { setMakes, setSelectedMake, saveModels, setSelectedModel } from "@/redux/slices/step-one";

// Components
import StepOne from "@/comp/steps/step-one";
import RedirectModel from "@/comp/redirect/model";
import Redirect from "@/comp/redirect";
import Title from "@/comp/title";
import SubTitle from "@/comp/subtitle";
import MetaData from "@/comp/meta-data";

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

const Home: React.FC<IPlainObject> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  if (!props.make) {
    return <Redirect />;
  }

  if (!props.model) {
    return <RedirectModel make={props.make.seoName} />;
  }

  const metadata = useSelector((state: RootState) => state.metadata);
  const stepOne = useSelector((state: RootState) => state.stepOne.data);
  const { prefix, separator, description, keywordsPnS } = metadata.model;

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

  const { makes, models, make, model } = props;

  useEffect(() => {
    dispatch(setMakes(makes));
    dispatch(setSelectedMake(make.seoName));
    dispatch(saveModels(models));
    dispatch(setSelectedModel(model.seoName));
  }, []);

  const name = `${make.name} ${model.name}`;
  const title = `${setSuffix(prefix, name, ` ${separator} `)} ${separator} ${metadata.name}`;
  const desc = combineAnS(description, name);
  const prekeys = setPrefix(keywordsPnS.prefix, name, ", ");
  const sufkeys = setSuffix(keywordsPnS.suffix, name, ", ");
  const keys = `${prekeys}, ${sufkeys}`;
  const preload: IPreload[] = [
    { elem: props.model.imageJpg, type: "image" },
    { elem: props.model.smallJpg, type: "image" },
  ];

  return (
    <>
      <ThemeProvider theme={CarcomTheme}>
        <MetaData title={title} description={desc} keywords={keys} preload={preload} />
        <GlobalStyles />
        <DefaultLayout year={props.year} month={props.month}>
          <Title>Huge Markdowns on {name} This Month!</Title>
          <SubTitle>
            Compare Prices from Multiple {make.name} Dealers and <strong>Get the Lowest Price</strong>
          </SubTitle>
          <StepOne
            makes={makes}
            models={models}
            make={make.seoName}
            model={model.seoName}
            image={model.imageJpg}
            onSubmit={handlerSubmit}
            quotes={props.quotes}
          />
        </DefaultLayout>
      </ThemeProvider>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const makes = await fetch(`${config.apiBaseUrl}/api/makes`).then<IMake[]>((r) => r.json());
  const models = await fetch(`${config.apiBaseUrl}/api/models`).then<IModel[]>((r) => r.json());
  const paths = models.map((model: IModel) => {
    const make = makes.find((m) => m.id === model.makeId);
    return { params: { make: make.seoName, model: model.seoName } };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const makes: IMake[] = await fetch(`${config.apiBaseUrl}/api/makes`).then((r) => r.json());
  const make = makes.find((item) => item.seoName === params.make);
  const models: IModel[] = await fetch(`${config.apiBaseUrl}/api/models/`).then((r) => r.json());
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
