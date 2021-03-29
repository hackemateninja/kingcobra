import dynamic from "next/dynamic";

const DynamicAdWidget = dynamic(
  () => import("@/comp/ad-widget"),
  {
    ssr: false,
  }
);

export default DynamicAdWidget;
