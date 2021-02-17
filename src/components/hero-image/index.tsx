// Packages
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Definitions
import { IPlainObject } from "@/def/IPlainObject";
import { RootState } from "@/def/TRootReducer";

// Slices
import { isLoading } from "@/redux/slices/step-one";

// Components
import Loader from "../loader";

// Styles
import { HeroImageWrapper, HeroImageContainer, HeroImageCover } from "./style";

const HeroImage: React.FC<IPlainObject> = (props) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(props.image || "/hero-image.jpg");

  const make = useSelector((state: RootState) => state.stepOne.data.selectedMake);
  const model = useSelector((state: RootState) => state.stepOne.data.selectedModel);
  const loading = useSelector((state: RootState) => state.stepOne.ui.imageLoading);

  useEffect(() => {
    if (make.image !== undefined) {
      setImage(make.image);
    }

    dispatch(isLoading(false))
  }, [make]);

  useEffect(() => {
    if (model.image !== undefined) {
      setImage(model.image);
    }    

    dispatch(isLoading(false))
  }, [model]);

  const hanlderLoading = () => dispatch(isLoading(false));

  return (
    <HeroImageWrapper>
      <HeroImageContainer>
        <HeroImageCover>
          <img onLoad={hanlderLoading} src={image} decoding="async" alt="Hero image" />
        </HeroImageCover>
      </HeroImageContainer>
      {loading && <Loader />}
    </HeroImageWrapper>
  );
};

export default HeroImage;
