import Card from "@/components/dashboard/card/Card";
import Transactions from "@/components/dashboard/Transactions/Transactions";
// Dummy data
const cards = [
  {
    id: 1,
    title: "Total Users",
    number: 10.928,
    change: 12,
  },
  {
    id: 2,
    title: "Stock",
    number: 8.236,
    change: -2,
  },
  {
    id: 3,
    title: "Revenue",
    number: 6.642,
    change: 18,
  },
];
// Main dashboard page
export default function Page() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5">
        {cards.map((card) => (
          <Card key={card.id} item={card} />
        ))}
      </div>
      <Transactions />
    </div>
  );
}
