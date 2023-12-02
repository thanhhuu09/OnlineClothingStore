import { Button } from "@mui/material";
import Header from "@/components/Header";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <>
      <Header />
      <h1 className="text-center text-4xl text-primary-700 font-extrabold p-16">
        SẢN PHẨM BÁN CHẠY
      </h1>
      <FeaturedProducts />
    </>
  );
}
