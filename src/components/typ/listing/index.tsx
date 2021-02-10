// Packages
import React from "react";

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
  ListingFooter,
  ListingFooterLink,
} from "./style";

// Components
import useScript from "@/src/hooks/useScript";

const Listing: React.FC<IListing> = (props) => {
  return (
    <ListingWrapper>
      <ListingContent>
        <ListingRow>
          <ListingColImg>
            <ListingImg alt={props.alt} src={props.image} />
          </ListingColImg>
          <ListingColInfo>
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html:
                  `<div class="awlistings" aw-implement="1721" aw-category="1" aw-make="` +
                  props.make +
                  `" aw-model="` +
                  props.model +
                  `" aw-zipcode="` +
                  props.zip +
                  `"></div>`,
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
