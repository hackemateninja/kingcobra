// Styles
import { IPlainObject } from "@/def/IPlainObject";
import { DealersSkeletonWrapper, DealersSkeletonItem, DealersSkeletonButton } from "./style";

const DealersSkeleton: React.FC<IPlainObject> = (props) => {
  return (
    <DealersSkeletonWrapper>
      {props.onlyOne !== undefined && props.onlyOne ? (
        <DealersSkeletonItem size={200} />
      ) : (
        <>
          <DealersSkeletonItem size={200} />
          <DealersSkeletonItem size={150} />
          <DealersSkeletonItem size={180} />
          <DealersSkeletonButton />
        </>
      )}
    </DealersSkeletonWrapper>
  );
};

export default DealersSkeleton;
