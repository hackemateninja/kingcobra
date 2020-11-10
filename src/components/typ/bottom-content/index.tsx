// Packages
import { useState } from 'react';

// Styles
import { BottomContentWrapper, BottomTitle, BottomDescription, BottomRow, BottomCol, BottomFormTitle, BottomForm, BottomSide, BottomImg, BottomText, BottomLink } from './style';

// Components
import Container from '../container';
import Select from '../form-elements/select';
import Button from '../button';

const options = [
	{id: '1', value: 'make-one', name: 'Make One'},
	{id: '2', value: 'make-two', name: 'Make Two'}
];

const BottomContent: React.FC = () => {
	const [cue, setCue] = useState<string>( 'make' );
	const handlerMake = ( e: React.ChangeEvent<HTMLSelectElement> ) => e.target.value.length === 0 ? setCue( e.target.id ) : setCue( 'model' );
	return (
		<BottomContentWrapper>
			<Container>
				<BottomTitle>Keep the deals coming</BottomTitle>
				<BottomDescription>Either you have another car in mind or want to get more deals, we can help you out.</BottomDescription>
				<BottomRow>
					<BottomCol>
						<BottomFormTitle>Have another car model in mind? Get the closeout price quote too!</BottomFormTitle>
						<BottomForm>
							<Select
								id="make"
								value=""
								name="make"
								label="Make"
								cue={false}
								error={false}
								message="Select a"
								options={options}
								handlerChange={handlerMake}
							/>
							<Select
								id="model"
								value=""
								name="model"
								label="Model"
								cue={cue === "model"}
								error={false}
								message="Select a"
								options={[]}
								handlerChange={() => {}}
							/>
							<Button>Connect me to Dealers</Button>
						</BottomForm>
					</BottomCol>
					<BottomCol>
						<BottomSide>
							<BottomImg><use xlinkHref="#abtl-logo" /></BottomImg>
							<BottomText>Research with one of our partners to get more deals on the table!</BottomText>
							<BottomLink href="https://www.autobytel.com" target="_blank">Click Here</BottomLink>
						</BottomSide>
					</BottomCol>
				</BottomRow>
			</Container>
		</BottomContentWrapper>
	);
};

export default BottomContent;