// Packages
import { useEffect, useState } from 'react';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';

// Components
import Loader from '../loader';

// Context
import { useAppContext } from '@/ctx/app-context';

// Styles
import { HeroImageWrapper, HeroImageContainer, HeroImageCover } from './style';

const HeroImage: React.FC<IPlainObject> = (props) => {
  const {
    state: { selectedMake, selectedModel },
  } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [selectedMake, selectedModel]);

  const handleImageLoading = (input) => {
    // onLoad replacement for SSR
    if (!input) return;

    const img = input;

    const updateFunc = () => setIsLoading(false);
    img.onload = updateFunc;

    if (img.complete) {
      updateFunc();
    }
  };

  const isCampaignImage =
    selectedMake && props.models && props.isCampaign ? props?.models[0].mediumJpg : selectedMake.mediumJpg;
  const isCampaignImageSmall =
    selectedMake && props.models && props.isCampaign ? props?.models[0].smallJpg : selectedMake.smallJpg;

  const image =
    selectedModel.mediumJpg ??
    isCampaignImage ??
    props.campaignImage ??
    props.preSelectedModel?.mediumJpg ??
    props.preSelectedMake?.mediumJpg ??
    props.image ??
    '/hero-image.jpg';
  const smallImage =
    selectedModel.smallJpg ??
    isCampaignImageSmall ??
    props.campaignImage ??
    props.preSelectedModel?.smallJpg ??
    props.preSelectedMake?.smallJpg ??
    props.smallImage ??
    '/hero-image.jpg';

  return (
    <HeroImageWrapper>
      <HeroImageContainer>
        <HeroImageCover>
          <img
            ref={handleImageLoading}
            sizes="(max-width: 320px) 280px, (max-width: 480px) 440px, 800px"
            srcSet={`${smallImage || image} 320w, ${smallImage || image} 480w, ${image} 800w`}
            src={smallImage || image}
            alt="Hero"
          />
        </HeroImageCover>
      </HeroImageContainer>
      {isLoading && <Loader />}
    </HeroImageWrapper>
  );
};

export default HeroImage;
