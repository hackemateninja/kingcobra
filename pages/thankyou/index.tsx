// Packages
import { useEffect } from "react";
import { GetServerSideProps, GetStaticProps } from "next";
import { ThemeProvider } from "styled-components";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { config } from "@/util/config";

// Definitions
import { RootState } from "@/def/TRootReducer";
import { IMake } from "@/def/IMake";
import { IPlainObject } from "@/def/IPlainObject";

// Slices
import { setMakes } from "@/redux/slices/step-one";
import { setSelectedMakes } from "@/redux/slices/thankyou";

// Styles
import GlobalStyles from "@/theme/global";
import CarcomTheme from "@/theme/carcom/typ";

// Utilities
import setPrefix from "@/util/prefix";

// Components
import Typ from "@/comp/typ/typ";
import TypHeader from "@/comp/typ/header";
import TypTopContent from "@/comp/typ/top-content";
import TypListing from "@/comp/typ/listing";
import TypBottomContent from "@/comp/typ/bottom-content";
import TypFooter from "@/comp/typ/footer";
import SVGs from "@/comp/typ/svgs";
import MetaData from "@/comp/meta-data";

const listingInfo = [
  {
    url: "#",
    urlTitle: "Listing url title",
    title: "Exclusive Deals For 2020 Ford F-250 in Miami",
    firstText: "CarsDirect has Exclusive Discounts Available Just For You",
    secondText: "Click to see your discount on a Ford F-250",
    shortUrl: "www.carsdirect.com",
    btnText: "See Price",
  },
];

const Thanks: React.FC<IPlainObject> = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const metadata = useSelector((state: RootState) => state.metadata);
  const { prefix, separator } = metadata.thankyou;

  const title = setPrefix(prefix, "", separator);

  const selectedInfo = useSelector((state: RootState) => state.stepOne.data);
  const make = useSelector((state: RootState) => state.thankyou.data.make);
  const model = useSelector((state: RootState) => state.thankyou.data.model);
  const zipcode = useSelector((state: RootState) => state.thankyou.data.zipcode);
  const name = useSelector((state: RootState) => state.stepTwo.data.first);
  const lastname = useSelector((state: RootState) => state.stepTwo.data.last);
  const dealers = useSelector((state: RootState) => state.stepTwo.data.selectedDealers);
  const selectedMakes = useSelector((state: RootState) => state.thankyou.data.selectedMakes);
  const image = model.imagePng ?? model.imageJpg ?? "/defaultImage.png";

  const handlerSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    let url: string;

    if (zipcode === undefined) {
      url = `/${selectedInfo.selectedMake.seoName}/${selectedInfo.selectedModel.seoName}/`;
    } else {
      url = `/s2/${selectedInfo.selectedMake.seoName}/${selectedInfo.selectedModel.seoName}/${zipcode}?sl=true`;
    }

    router.push(url);
  };

  useEffect(() => {
    dispatch(setMakes(props.makes));
    dispatch(setSelectedMakes([...selectedMakes, make]));
  }, []);

  const values = selectedMakes.map((m) => m.seoName);
  const makesList = props.makes.filter((m) => !values.includes(m.seoName));

  return (
    <ThemeProvider theme={CarcomTheme}>
      <MetaData title={title} />
      <GlobalStyles />
      <Typ>
        <TypHeader />
        <div>
          <TypTopContent name={name} last={lastname} make={make.name} model={model.name} dealers={dealers} />
          <TypListing
            image={image}
            alt={`${make.name} ${model.name}`}
            listingInfo={listingInfo}
            make={make.name}
            model={model.name}
            zipcode={zipcode}
          />
          <TypBottomContent makes={makesList} onSubmit={handlerSubmit} />
          <TypFooter />
        </div>
      </Typ>
      <SVGs />
    </ThemeProvider>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const makes = await fetch(`${config.apiBaseUrl}/api/makes`).then<IMake[]>((r) => r.json());
  return { props: { makes }, revalidate: 86400 };
};

export default Thanks;
