import { useEffect } from "react";

// Definitions
import { IAdWidget } from "@/def/IAdWidget";

// Hooks
import useScript from "@/src/hooks/useScript";

// Components
import MetaData from "../meta-data";

declare const window: any;

const AdWidget: React.FC<IAdWidget> = (props) => {
  const { title, implement, make, model, zip, utss, category, onClick } = props;

  useScript("//cdn.awadserver.com/widget/js/awloader.min.js", category);

  useEffect(() => {
    if (make && model && zip) {
      window && window.AutoWeb && window.AutoWeb.reload(make, model, zip);
    }
  }, [make, model, zip]);

  return (
    <>
      {title && <MetaData title={title} />}
      <div
        onClick={onClick}
        className="content"
        dangerouslySetInnerHTML={{
          __html: `<div class="awlistings" 
                aw-implement="${implement}" 
                aw-category="${category}" 
                aw-make="${make}"
                aw-model="${model}" 
                aw-zipcode="${zip}"
                aw-utrack="${utss}"
            ></div>`,
        }}
      ></div>
    </>
  );
};

export default AdWidget;
