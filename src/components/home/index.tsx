// Packages
import { useRouter } from 'next/router';

// Definitions
import { IPlainObject } from '@/def/IPlainObject';
import { IZipCode } from '@/def/IZipCode';
import { IMake } from '@/def/IMake';
import { IModel } from '@/def/IModel';

// Context
import { useAppContext } from '@/ctx/app-context';

// Data
import metadataSource from '@/data/metadata';

// Layout
import DefaultLayout from '@/layout/default';

// Styles
import GlobalStyles from '@/theme/global';

// Components
import MetaData from '@/comp/meta-data';
import Title from '@/comp/title';
import SubTitle from '@/comp/subtitle';
import StepOne from '@/comp/steps/step-one';

// Utilities
import { config } from '@/util/config';

const Home: React.FC<IPlainObject> = (props) => {
  const { month, year, quotes, makes, models, preSelectedMake, preSelectedModel, metadata, campaign, isCampaign} = props;
  const { setSelectedMake, setSelectedModel, setZipCodeInfo } = useAppContext();

  const router = useRouter();

  // Default page content
  const defaultTitle = <>Huge {month} Closeout on All New Vehicles</>;
  const defaultSubtitle = (
    <>
      Compare Prices from Multiple Dealers and <strong>Get the Lowest Price</strong>
    </>
  );
  const defaultButtonText = 'Check Local Prices';
  const defaultHeroImage = '/hero-image.jpg';

  // Page content
  const title = props.title || defaultTitle;
  const subTitle = props.subTitle || defaultSubtitle;
  const formButtonText = props.formButtonText || defaultButtonText;
  const campaignImage = props.campaignImage;
  const banner = props.banner;

  // Default metadata
  const { prefix, separator, description, keywords } = metadataSource.home;
  const metaTitle = `${prefix.join(` ${separator} `)} ${separator} ${metadataSource.name}`;
  const preload = [{ type: 'image', elem: campaignImage || defaultHeroImage }];

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>,
    selectedMake: IMake,
    selectedModel: IModel,
    zipCodeInfo: IZipCode
  ) => {
    const { primary_sid, thankyou_sid, utsu, utss } = router.query;

    const params = new URLSearchParams();
    if (utsu) params.append('utsu', utsu as string);
    if (utss) params.append('utss', utss as string);
    if (primary_sid) params.append('primary_sid', primary_sid as string);
    if (thankyou_sid) params.append('thankyou_sid', thankyou_sid as string);

    let paramsString = params.toString();
    paramsString = paramsString.length ? `?${paramsString}` : '';

    const currentCampaign = campaign || config.defaultCampaignName;

    setSelectedMake(selectedMake);
    setSelectedModel(selectedModel);
    setZipCodeInfo(zipCodeInfo);

    window.open(
      `/${currentCampaign}/s2/${selectedMake.seoName}/${selectedModel.seoName}/${zipCodeInfo.zip}${paramsString}`,
      '',
      `width=${screen.width},height=${screen.height}`
    );

    router.push(
      `/${currentCampaign}/fas/${selectedMake.seoName}/${selectedModel.seoName}/${zipCodeInfo.zip}${paramsString}`
    );
  };

  return (
    <>
      <MetaData
        title={metadata?.title || metaTitle}
        description={metadata?.description || description.join('')}
        keywords={metadata?.keywords || keywords}
        preload={metadata?.preload || preload}
      />
      <GlobalStyles />
      <DefaultLayout year={year} month={month}>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
        <StepOne
          campaignImage={campaignImage}
          onSubmit={handleSubmit}
          makes={makes}
          models={models}
          image={defaultHeroImage}
          quotes={quotes}
          formButtonText={formButtonText}
          preSelectedMake={preSelectedMake}
          preSelectedModel={preSelectedModel}
          isCampaign={isCampaign}
          campaign={campaign}
        />
      </DefaultLayout>
    </>
  );
};

export default Home;
