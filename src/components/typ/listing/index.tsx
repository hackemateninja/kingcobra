// Packages
import React, { useState } from "react";

// Definitions
import { IListing } from "@/def/IListings";

// Styles
import {
  ListingWrapper,
  ListingContent,
  ListingRow,
  ListingColImg,
  ListingImg,
  ListingColInfo,
  ListingTitle,
  ListingFooter,
  ListingFooterLink,
  ListingSide,
  ListingMark,
} from "./style";

// Components
import DynamicAdWidget from "@/comp/dynamic-ad-widget";

const Listing: React.FC<IListing> = (props) => {
  const [bg, setBg] = useState<number>(1);
  const handlerChange = (e: React.MouseEvent<HTMLDivElement>) => setBg(bg + 1);
  const titleChange = () => {
    switch (bg) {
      case 2:
        return (
          <ListingTitle>
            The more you compare, the more you can Save<ListingMark>!</ListingMark>
          </ListingTitle>
        );
      case 3:
        return (
          <ListingTitle>
            Learn and Save more<ListingMark>!</ListingMark>
          </ListingTitle>
        );
      case 4:
        return (
          <ListingTitle>
            Check what our Partners have to offer<ListingMark>!</ListingMark>
          </ListingTitle>
        );
      default:
        return (
          <ListingTitle>
            Don't stop{" "}
            <ListingSide>
              researching<ListingMark>!</ListingMark>
            </ListingSide>
          </ListingTitle>
        );
    }
  };

  return (
    <ListingWrapper>
      <ListingContent bg={bg}>
        <ListingRow>
          <ListingColImg bg={bg}>
            <ListingImg alt={props.alt} src={props.image} />
          </ListingColImg>
          <ListingColInfo bg={bg}>
            {titleChange()}
            {/* LISTING */}
            {/* LISTING WIDGET */}
            <DynamicAdWidget
              make={props.make}
              model={props.model}
              zip={props.zipcode}
              utss={props.utss}
              category="1"
              implement="1721"
              onClick={handlerChange}
            />
          </ListingColInfo>
        </ListingRow>
      </ListingContent>
      <ListingFooter>
        <ListingFooterLink href="//autoweb.com" target="_blank">
          Powered by: <span>AutoWeb</span>
        </ListingFooterLink>
      </ListingFooter>
    </ListingWrapper>
  );
};

export default Listing;
