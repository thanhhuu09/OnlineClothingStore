import { Skeleton } from "@mui/material";

const ProductCardSkeleton = () => {
  return (
    <div>
      <Skeleton variant="rectangular" width={200} height={200} />

      {/* Skeleton for title */}
      <Skeleton variant="text" width={150} height={20} />

      {/* Skeleton for price */}
      <Skeleton variant="text" width={80} height={20} />
    </div>
  );
};

export default ProductCardSkeleton;
