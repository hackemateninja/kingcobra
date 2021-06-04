// Packages
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { RootState } from '@/def/TRootReducer';

// Slices
import { isLoading } from '@/redux/slices/step-one';

// Components
import Loader from '../loader';

// Styles
import { HeroImageWrapper, HeroImageContainer, HeroImageCover } from './style';

const HeroImage: React.FC<IPlainObject> = (props) => {
  const dispatch = useDispatch();

  const make = useSelector((state: RootState) => state.stepOne.data.selectedMake);
  const model = useSelector((state: RootState) => state.stepOne.data.selectedModel);
  const stepOneUi = useSelector((state: RootState) => state.stepOne.ui);
  const dataLoading = useSelector((state: RootState) => state.site.ui.dataLoading);
  const { imageLoading: loading } = stepOneUi;
  const handleImageLoading = (input) => {
    // onLoad replacement for SSR
    if (!input) return;

    const img = input;
    const updateFunc = () => {
      dispatch(isLoading(false));
    };
    img.onload = updateFunc;
    if (img.complete) {
      updateFunc();
    }
  };
  const image = model.mediumJpg ?? make.mediumJpg ?? props.campaignImage ?? props.image ?? '/hero-image.jpg';
  const smallImage = model.smallJpg ?? make.smallJpg ?? props.campaignImage ?? props.smallImage ?? '/hero-image.jpg';

  return dataLoading ? (
    <HeroImageWrapper>
      <HeroImageContainer>
        <HeroImageCover>
          <Skeleton height="100%" />
        </HeroImageCover>
      </HeroImageContainer>
    </HeroImageWrapper>
  ) : (
    <HeroImageWrapper>
      <HeroImageContainer>
        <HeroImageCover>
          <img
            ref={handleImageLoading}
            sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px"
            srcSet={`${smallImage} 320w, ${smallImage} 480w, ${image} 800w`}
            src={smallImage}
            alt="Hero"
          />
        </HeroImageCover>
      </HeroImageContainer>
      {loading && <Loader />}
    </HeroImageWrapper>
  );
};

export default HeroImage;
