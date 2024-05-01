import { MagnifyingGlass } from "@phosphor-icons/react";

export default function Search() {
  return (
    <form>
      <label
        className="w-fit flex items-center p-2 rounded-md gap-2 bg-slate-100"
        htmlFor="search"
      >
        <MagnifyingGlass size={20} />
        <input
          id="search"
          type="text"
          autoComplete="off"
          placeholder="Search"
          className="border-none focus:outline-none bg-slate-100"
        />
      </label>
    </form>
  );
}
