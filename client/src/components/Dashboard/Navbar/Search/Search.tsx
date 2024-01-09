import { MagnifyingGlass } from "@phosphor-icons/react";

export default function Search() {
  return (
    <form>
      <label
        className="bg-slate-700 w-fit flex items-center p-2 rounded-md gap-2"
        htmlFor="search"
      >
        <MagnifyingGlass size={20} />
        <input
          id="search"
          type="text"
          autoComplete="off"
          placeholder="Search"
          className="bg-slate-700 border-none focus:outline-none"
        />
      </label>
    </form>
  );
}
