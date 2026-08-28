import { Search } from "lucide-react";

interface SearchFormProps {
  defaultValue: string;
  placeholder: string;
  label: string;
}

export function SearchForm({
  defaultValue,
  placeholder,
  label,
}: SearchFormProps) {
  return (
    <form className="flex w-full gap-2 sm:w-auto" role="search">
      <label className="sr-only" htmlFor="catalog-search">
        {label}
      </label>
      <div className="relative min-w-0 flex-1 sm:w-72">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
          size={17}
        />
        <input
          id="catalog-search"
          name="q"
          type="search"
          defaultValue={defaultValue}
          placeholder={placeholder}
          maxLength={100}
          className="h-10 w-full rounded-md border border-slate-300 bg-white pr-3 pl-10 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />
      </div>
      <button
        type="submit"
        className="h-10 rounded-md bg-slate-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
      >
        Search
      </button>
    </form>
  );
}
