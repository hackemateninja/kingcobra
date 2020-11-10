// Packages
import React from 'react';

// Styles
import { ListingWrapper, ListingContent, ListingRow, ListingColImg, ListingImg, ListingColInfo, ListingTitle, ListingFooter, ListingFooterLink } from './style';

// Components
import ListingInfo from './info'

const dealersInfo = [
	{
		url: "#",
		urlTitle: "Listing url title",
		title: "Exclusive Deals For 2020 Ford F-250 in Miami",
		firstText: "CarsDirect has Exclusive Discounts Available Just For You",
		secondText: "Click to see your discount on a Ford F-250",
		shortUrl: "www.carsdirect.com",
		btnText: "See Price"
	}
];

const Listing: React.FC = () => {
	return (
		<ListingWrapper>
			<ListingContent>
				<ListingRow>
					<ListingColImg>
						<ListingImg alt="Ford F-250" src="//img.autobytel.com/2021/ford/f-250/2-700-tb26-95219.png" />
					</ListingColImg>
					<ListingColInfo>
						<ListingTitle>Don't stop <span>researching<span>!</span></span></ListingTitle>
						{/* LISTING */}
						<ListingInfo items={dealersInfo} />
						{/* LISTING WIDGET */}
						
					</ListingColInfo>
				</ListingRow>
			</ListingContent>
			<ListingFooter>
				<ListingFooterLink href="//autoweb.com" target="_blank">Powered by: <span>AutoWeb</span></ListingFooterLink>
			</ListingFooter>
		</ListingWrapper>
	);
};

export default Listing;