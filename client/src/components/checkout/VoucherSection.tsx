export default function VoucherSection() {
  return (
    <div className="border w-96 mt-6 p-4 rounded-lg bg-white shadow-md">
      <p className="text-lg font-semibold mb-2">Sử dụng mã khuyến mãi</p>
      <form action="" method="post">
        <input
          type="text"
          placeholder="Nhập mã giảm giá"
          className="w-full p-2 border rounded-lg mb-2 focus:ring-1 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-primary-700 text-primary-100 p-2 rounded-lg active:bg-primary-950 hover:bg-primary-800"
        >
          Áp dụng
        </button>
      </form>
    </div>
  );
}
