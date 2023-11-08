import Image from "next/image";

export default function Header() {
  return (
    <div className="grid grid-cols-2 gap-6 p-12 bg-gradient-to-br from-secondary-200 to-primary-100 pb-0">
      <div className="my-auto">
        <h1 className="font-bold text-[56px] leading-[72px] text-primary-800 mb-6">
          Thể hiện phong cách riêng biệt với bộ sưu tập độc quyền từ{" "}
          <span className="text-secondary-400">Coconut</span>
        </h1>
        <p className="font-medium text-base leading-7 text-primary-700 mb-6">
          Bộ sưu tập độc quyền của chúng tôi là sự kết hợp hoàn hảo giữa sự sáng
          tạo và xu hướng.
        </p>
        <button className="text-white text-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2">
          Mua ngay
        </button>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="relative w-full h-[500px]">
        <Image
          src="/images/banner_header.png"
          alt="banner_header"
          fill
          objectFit="contain"
        />
      </div>
    </div>
  );
}
