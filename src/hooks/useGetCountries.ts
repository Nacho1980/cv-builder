import { useEffect, useState } from "react";
import { Country } from "../types";

const useGetCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch countries.");
        }

        const data = await response.json();
        const formattedCountries = data.map((country: any) => ({
          code: country.cca2, // ISO 3166-1 alpha-2 code
          label: country.name.common, // Country name
        }));
        setCountries(formattedCountries);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};

export default useGetCountries;
