import Link from "next/link";

interface PropsMenuLink {
  path: string;
  icon: React.ReactNode;
  title: string;
}
export default function MenuLink({ path, icon, title }: PropsMenuLink) {
  return (
    <Link
      href={path}
      className="flex items-center gap-2 ml-2 my-2 p-3 hover:bg-slate-100 rounded-md"
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
}
