export default function Header() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center p-4">
      <h1 className="text-5xl font-extrabold text-center">
        BỘ SƯU TẬP THỜI TRANG NAM
      </h1>
      <p className="text-gray-600 w-1/3 text-center">
        Khám phá ngay những bộ trang phục nam thời thượng của chúng tôi để biến
        phong cách của bạn từ bình thường thành đỉnh cao.
      </p>
      <ul className="flex items-center justify-center gap-4">
        <li>Áo thun</li>
        <li>Áo khoác</li>
        <li>Tất</li>
        <li>Hoodie</li>
      </ul>
    </div>
  );
}
