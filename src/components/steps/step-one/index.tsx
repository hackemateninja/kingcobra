// Definitios
import { IPlainObject } from '@/def/IPlainObject';

// Components
import HeroImage from '@/comp/hero-image';
import Row from '@/comp/container/row';
import Column from '@/comp/container/column';
import Display from '@/comp/container/display';
import FormOne from '@/comp/steps/step-one/form';
import Advantages from '@/comp/advantages';
import Quotes from '@/comp/quotes';
import Text from '@/comp/text/';

const StepOne: React.FC<IPlainObject> = (props) => {
  return (
    <Row>
      <Column sm={1} md={2}>
        <HeroImage
          image={props.image}
          smallImage={props.smallImage}
          campaignImage={props.campaignImage}
          preSelectedMake={props.preSelectedMake}
          preSelectedModel={props.preSelectedModel}
        />
        <Display hide="mobile">
          <Quotes items={props.quotes} />
          <Text center={true} text="authorized">
            Search <strong>Authorized</strong> Dealers Ready to Offer You Their <strong>Lowest</strong> Price!
          </Text>
        </Display>
      </Column>
      <Column sm={1} md={2}>
        <FormOne
          makes={props.makes}
          models={props.models}
          preSelectedMake={props.preSelectedMake}
          preSelectedModel={props.preSelectedModel}
          onSubmit={props.onSubmit}
          buttonText={props.formButtonText}
          isCampaign={props.isCampaign}
          campaign={props.campaign}
        />
        <Advantages />
        <Display hide="desktop">
          <Quotes items={props.quotes} />
          <Text center={true} text="authorized">
            <span>
              Search <strong>Authorized</strong> Dealers
            </span>{' '}
            Ready to Offer You Their <strong>Lowest</strong> Price!
          </Text>
        </Display>
      </Column>
    </Row>
  );
};

export default StepOne;
