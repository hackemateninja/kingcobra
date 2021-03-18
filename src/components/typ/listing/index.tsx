// Packages
import React, { useState } from "react";
import useScript from "@/src/hooks/useScript";

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
            <div
              onClick={handlerChange}
              className="content"
              dangerouslySetInnerHTML={{
                __html: `<div class="awlistings" aw-implement="1721" aw-category="1" 
                    aw-make="${props.make}" 
                    aw-model="${props.model}" 
                    aw-zipcode="${props.zipcode}"
                    aw-utrack="${props.utss}"
                  ></div>`,
              }}
            ></div>
            {useScript("//cdn.awadserver.com/widget/js/awloader.min.js", "3411")}
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
