import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SearchBar = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("Search");
  const [placeholderText, setPlaceholderText] = useState(
    "Search by Github username..."
  );

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString().trim();

    if (username) {
      router.push(`/${username}`);
    }
  };

  useEffect(() => {
    setSearchText(t("base.search"));
    setPlaceholderText(t("base.placeholder"));
  }, [t]);

  return (
    <form
      onSubmit={handleSearch}
      className="inset-0 flex items-center justify-between w-full max-w-lg gap-2 px-4 py-2 border rounded-full md:-translate-x-1/2 md:-translate-y-1/2 md:absolute top-1/2 left-1/2 border-Border dark:border-PrimaryDark h-fit"
    >
      <div className="flex items-center w-full">
        <Search className="text-Placeholder" />
        <input
          type="text"
          name="username"
          placeholder={placeholderText}
          className="w-full p-2 bg-transparent placeholder:text-Placeholder dark:placeholder:text-BorderDark focus:outline-0 dark:text-white"
        />
      </div>
      <button
        type="submit"
        className="px-5 py-2 font-bold text-white transition-all duration-300 rounded-full cursor-pointer bg-Primary min-w-max hover:bg-Primary/80"
      >
        {searchText}
      </button>
    </form>
  );
};
