import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = () => {
  return (
    <div className="rounded-xl">
      <Skeleton height={250} borderRadius={15} />
      <div className="mt-3">
        <Skeleton height={20} width="70%" />
        <Skeleton height={18} width="50%" className="mt-2" />
        <Skeleton height={18} width="30%" className="mt-2" />
      </div>
    </div>
  );
};

export default SkeletonCard;