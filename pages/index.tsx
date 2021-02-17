// Packages
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

// Data
import { makes } from "@/data/makes";

// Definitions
import { IPlainObject } from "@/def/IPlainObject";
import { RootState } from "@/src/definitions/TRootReducer";
import { IPreload } from "@/def/IMetaData"

// Layout
import DefaultLayout from "@/layout/default";

// Styles
import GlobalStyles from "@/theme/global";
import CarcomTheme from "@/theme/carcom";

// Slices
import { setMonth } from "@/redux/slices/site";
import { setMakes } from "@/redux/slices/step-one";

// Components
import Title from "@/comp/title";
import SubTitle from "@/comp/subtitle";
import StepOne from "@/comp/steps/step-one";
import MetaData from "@/comp/meta-data";

const Home: React.FC<IPlainObject> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const metadata = useSelector((state: RootState) => state.metadata);
  const month = useSelector((state: RootState) => state.site.month);
  const stepOne = useSelector((state: RootState) => state.stepOne.data);

  const { prefix, separator, description, keywords } = metadata.home;
  const title = `${prefix.join(` ${separator} `)} ${separator} ${metadata.name}`;

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
    dispatch(setMakes(makes));
    month.length === 0 && dispatch(setMonth());
  }, []);

  const preload: IPreload[] = [{ type: "image", elem: "/hero-image.jpg" }]

  return (
    <ThemeProvider theme={CarcomTheme}>
      <MetaData title={title} description={description.join("")} keywords={keywords} preload={preload} />
      <GlobalStyles />
      <DefaultLayout>
        <Title>Huge {month} Closeout on All New Vehicles</Title>
        <SubTitle>
          Compare Prices from Multiple Dealers and <strong>Get the Lowest Price</strong>
        </SubTitle>
        <StepOne onSubmit={handlerSubmit} makes={makes} image={"/hero-image.jpg"} />
      </DefaultLayout>
    </ThemeProvider>
  );
};

export default Home;
