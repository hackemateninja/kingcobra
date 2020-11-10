// Definitions
import { IPlainObject } from '../../definitions/IPlainObject'; 
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// Styles
import { HeroImageWrapper, HeroImageContainer, HeroImageCover, Placeholder } from './style';

// Components
import { RootState } from '../../../store/reducers';

const HeroImage: React.FC<IPlainObject> = (props) => {
	let image = useSelector((state: RootState) => state.formData.image);
	return (
		<HeroImageWrapper>
			<HeroImageContainer>
				<HeroImageCover>
					{/* <source srcSet="/hero-image.webp" type="image/webp" /> */}
					{/* <source srcSet="/hero-image.jpg" type="image/jpeg" /> */}
					<img src={image} alt="Hero image" />
				</HeroImageCover>
			</HeroImageContainer>
		</HeroImageWrapper>
	);
};

export default HeroImage;