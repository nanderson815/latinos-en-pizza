import { useSearchParams } from "@remix-run/react";

export const LocaleToggle = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const locale = searchParams.get("locale");
  const toggleLocale = () => {
    setSearchParams({ locale: locale === "en-US" ? "es" : "en-US" });
  };
  return (
    <button
      type="button"
      className="rounded-md border border-gray-300 bg-white px-2 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={toggleLocale}
    >
      {locale === "en-US" ? "Español" : "English"}
    </button>
  );
};
