// Packages
import { useEffect, useRef, useState } from 'react';
import { useScroll, useMeasure } from 'react-use';
import useSmoothScroll from 'react-smooth-scroll-hook';

// Definitions
import { IQuote, IQuotes } from '@/def/IQuotes';

// Styles
import {
  QuotesWrapper,
  QuotesScroll,
  QuotesNav,
  Quote,
  QuotePhoto,
  QuoteContent,
  QuoteText,
  QuoteName,
  QuoteDot,
} from './style';

const Quotes: React.FC<IQuotes> = (props) => {
  const eventListeners = useRef<(event: Event) => void>();
  const [active, setActive] = useState<number>(1);
  const scroll = useRef(null);
  const [quotes, { width }] = useMeasure();
  const { x } = useScroll(scroll);

  const quoteActive = () => {
    const elemWidth = width + 15;

    switch (Math.floor(x) / Math.floor(elemWidth)) {
      case 0:
        setActive(1);
        break;
      case 1:
        setActive(2);
        break;
      case 2:
        setActive(3);
        break;
      default:
        return null;
    }
  };

  const { scrollTo } = useSmoothScroll({
    ref: scroll,
    direction: 'x',
    speed: 30,
  });

  const touchDevice = () => {
    return !!('ontouchstart' in window || navigator.maxTouchPoints);
  };

  const setActiveQuote = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const id = `#quote-${target.dataset.id}`;

    !touchDevice() && scrollTo(id);
  };

  useEffect(() => {
    const fixScrollResize = () => {
      if (scroll.current.scrollLeft !== null) {
        scroll.current.scrollLeft = (active - 1) * Math.floor(width + 15);
      }
    };

    window.removeEventListener('resize', eventListeners.current, false);
    eventListeners.current = fixScrollResize;
    window.addEventListener('resize', eventListeners.current, false);

    return () => {
      window.removeEventListener('resize', eventListeners.current, false);
    };
  }, []);

  useEffect(() => {
    quoteActive();
  });

  return (
    <QuotesWrapper ref={quotes}>
      <QuotesScroll ref={scroll}>
        {props.items.map((quote: IQuote, index: number) => (
          <Quote key={index} id={`quote-${index}`}>
            <QuotePhoto width="46" height="46" src={quote.photo} alt={quote.name} />
            <QuoteContent>
              <QuoteText>“{quote.comment}”</QuoteText>
              <QuoteName>
                {quote.name} - {quote.cityState}
              </QuoteName>
            </QuoteContent>
          </Quote>
        ))}
      </QuotesScroll>
      <QuotesNav active={active}>
        {props.items.map((item: IQuote, index: number) => (
          <QuoteDot onClick={setActiveQuote} key={index} data-id={index} />
        ))}
      </QuotesNav>
    </QuotesWrapper>
  );
};

export default Quotes;
