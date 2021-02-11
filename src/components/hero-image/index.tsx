// Packages
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

// Definitions
import { IPlainObject } from "@/def/IPlainObject";
import { RootState } from "@/def/TRootReducer";

// Slices

// Components
import Loader from "../loader";

// Styles
import { HeroImageWrapper, HeroImageContainer, HeroImageCover } from "./style";
import { isLoading } from "@/redux/slices/step-one";

const HeroImage: React.FC<IPlainObject> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  let image: string = "";

  const make = useSelector((state: RootState) => state.stepOne.data.selectedMake);
  const model = useSelector((state: RootState) => state.stepOne.data.selectedModel);
  const loading = useSelector((state: RootState) => state.stepOne.ui.imageLoading);

  if (model.image !== undefined) {
    image = model.image;
  } else if (make.image !== undefined) {
    image = make.image;
  } else {
    image = router.pathname === "/" ? "/desktop-hero-image.jpg" : "";
  }

  const hanlderLoading = () => dispatch(isLoading(false));

  return (
    <HeroImageWrapper>
      <HeroImageContainer>
        <HeroImageCover>
          <img onLoad={hanlderLoading} src={image} alt="Hero image" />
        </HeroImageCover>
      </HeroImageContainer>
      {loading && <Loader />}
    </HeroImageWrapper>
  );
};

export default HeroImage;
