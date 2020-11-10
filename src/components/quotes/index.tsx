// Packages
import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useMeasure } from 'react-use';

// Definitions
import { IQuote, IQuotes } from '../../definitions/IQuotes';

// Styles
import { QuotesWapper, QuotesScroll, QuotesNav, Quote, QuotePhoto, QuoteContent, QuoteText, QuoteName, QuoteDot } from './style';

const Quotes: React.FC<IQuotes> = ( props ) => {
	const [active, setActive] = useState<number>( 1 )
	const quoteScroll = useRef( null );
	const [quotes, { width }] = useMeasure();
	const {x} = useScroll( quoteScroll );

	const quoteActive = () => {
		const elemWidth = width + 15;

		switch( Math.floor( x ) / Math.floor( elemWidth ) ) {
			case 0: setActive( 1 );
				break;
			case 1: setActive( 2 );
				break;
			case 2: setActive( 3 );
				break;
			default: return null;
		}
	};

	const setClickActive = ( e: React.MouseEvent<HTMLDivElement> ) => {
		const target = e.target as HTMLDivElement;
		const id = target.id;
		quoteScroll.current.scrollLeft = parseInt( id ) *  Math.floor( width + 15 );
	}

	useEffect(() => {
		quoteActive();
	});

	return (
		<QuotesWapper ref={quotes}>
			<QuotesScroll ref={quoteScroll}>
				{props.items.map((quote: IQuote, index: number) =>
					<Quote key={index}>
						<QuotePhoto src={quote.photo} alt={quote.name} />
						<QuoteContent>
							<QuoteText>“{quote.comment}”</QuoteText>
							<QuoteName>{quote.name} - {quote.cityState}</QuoteName>
						</QuoteContent>
					</Quote>
				)}
			</QuotesScroll>
			<QuotesNav active={active}>
				{props.items.map((item: IQuote, index: number) =>
					<QuoteDot onClick={setClickActive} key={index} id={`${index}`} />
				)}
			</QuotesNav>
		</QuotesWapper>
	);
};

export default Quotes;