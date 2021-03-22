import dynamic from "next/dynamic";

const DynamicAdWidget = dynamic(
  () => import("@/comp/ad-widget"), // replace '@components/map' with your component's location
  {
    ssr: false, // This line is important. It's what prevents server-side render
  }
);

export default DynamicAdWidget;
