// Packages
import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import absoluteUrl from "next-absolute-url";

// Data
import { makes } from "@/data/makes";

// Definitions
import { IPlainObject } from "@/def/IPlainObject";
import { RootState } from "@/def/TRootReducer";
import { IPreload } from "@/def/IMetaData";
import { IModel } from "@/def/IModel";

// Layout
import DefaultLayout from "@/layout/default";

// Slices
import { setMonth } from "@/redux/slices/site";
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
    return <RedirectModel make={props.make.value} />;
  }

  const metadata = useSelector((state: RootState) => state.metadata);
  const stepOne = useSelector((state: RootState) => state.stepOne.data);
  const month = useSelector((state: RootState) => state.site.month);
  const { prefix, separator, description, keywordsPnS } = metadata.model;

  const handlerSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { selectedMake, selectedModel, zipcode } = stepOne;
    const { zip } = zipcode;
    window.open(
      `/s2/${selectedMake.value}/${selectedModel.value}/${zip}`,
      "",
      `width=${screen.width},height=${screen.height}`
    );

    router.push(`/fas/${selectedMake.value}/${selectedModel.value}/${zip}`);
  };

  useEffect(() => {
    month.length === 0 && dispatch(setMonth());
    dispatch(setMakes(makes));
    dispatch(setSelectedMake(make.value));
    dispatch(saveModels(models));
    dispatch(setSelectedModel(model.value));
  }, []);

  const { models, make, model } = props;

  const name = `${make.name} ${model.name}`;
  const title = `${setSuffix(prefix, name, ` ${separator} `)} ${separator} ${metadata.name}`;
  const desc = combineAnS(description, name);
  const prekeys = setPrefix(keywordsPnS.prefix, name, ", ");
  const sufkeys = setSuffix(keywordsPnS.suffix, name, ", ");
  const keys = `${prekeys}, ${sufkeys}`;
  const preload: IPreload[] = [{ elem: props.model.image, type: "image" }];

  return (
    <>
      <ThemeProvider theme={CarcomTheme}>
        <MetaData title={title} description={desc} keywords={keys} preload={preload} />
        <GlobalStyles />
        <DefaultLayout>
          <Title>Huge Markdowns on {name} This Month!</Title>
          <SubTitle>
            Compare Prices from Multiple {make.name} Dealers and <strong>Get the Lowest Price</strong>
          </SubTitle>
          <StepOne
            makes={makes}
            models={models}
            make={make.value}
            model={model.value}
            image={model.image}
            onSubmit={handlerSubmit}
          />
        </DefaultLayout>
      </ThemeProvider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { origin } = absoluteUrl(context.req, context.req.headers.host);
  const make = makes.filter((item) => item.value === context.query.make);
  let models: IModel[] = [];
  let model: IModel[] = [];

  if (make.length) {
    const response = await fetch(`${origin}/api/models/${context.query.make}`);
    models = await response.json();
    model = models.filter((item) => item.value === context.query.model);
  }

  return {
    props: {
      models,
      make: make.length !== 0 ? make[0] : null,
      model: model.length !== 0 ? model[0] : null,
    },
  };
};

export default Home;
