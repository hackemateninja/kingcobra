// Packages
import React from 'react';

// Definitions
import { IPlainObject } from '../../definitions/IPlainObject';

// Components
import CarInfoList from './list';

// Styles
import { CarInfoWrapper, CarInfoImage, CarInfoContent, CarInfoText } from './style';

const CarInfo: React.FC<IPlainObject> = ( props ) => {
	return (
		<CarInfoWrapper>
			<CarInfoImage src="//img.autobytel.com/2021/ford/f-150/2-550-three-quarters-view101-95190.jpg" alt="Ford F-150" />
			<CarInfoContent>
				<CarInfoText green>Base MSRP. $27,000</CarInfoText>
				<CarInfoText>Fill out the form to find <strong>offers</strong> from your <strong>preferred</strong> dealers!</CarInfoText>

				<CarInfoList device="desktop" />
			</CarInfoContent>
		</CarInfoWrapper>
	);
};

export default CarInfo;