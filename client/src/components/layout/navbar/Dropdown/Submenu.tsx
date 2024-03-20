interface SubmenuProps {
  label: string;
  items: string[];
  isOpen: boolean;
  onMouseOver: () => void;
  closeSubmenu: () => void;
}
function Submenu({
  label,
  items,
  isOpen,
  onMouseOver,
  closeSubmenu,
}: SubmenuProps) {
  const submenuClasses = isOpen
    ? "opacity-100 scale-100 visible"
    : "opacity-0 scale-0 invisible";

  return (
    <div onMouseOver={onMouseOver}>
      <button>
        <span
          className={`uppercase ${isOpen && "underline underline-offset-4"}`}
        >
          {label}
        </span>
      </button>
      <div
        onMouseLeave={closeSubmenu}
        className={`absolute shadow-md bg-white w-full inset-x-0 mt-4 flex items-center justify-center  
          origin-top transition ease-in-out duration-500 ${submenuClasses}`}
      >
        <ul
          className={`grid grid-cols-4 gap-4 w-3/4 px-4 py-5 transition-all duration-500 ${submenuClasses}`}
        >
          {items.map((item, index) => (
            <li
              className="hover:bg-gray-100 p-2 rounded cursor-pointer"
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Submenu;
