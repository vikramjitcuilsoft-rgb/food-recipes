'use client';

import { useCountries } from '../hooks/useCountries';
import { useLatestMeals } from '../hooks/useLatestMeals';
import { useRandomMeals } from '../hooks/useRandomMeals';
import { usePopularMeals } from '../hooks/usePopularIngredients';
import { useRouter } from 'next/navigation';
import { countryCodeMap } from '../utils/country-list';
import Categories from '../components/Categories';

export default function Home() {
  const router = useRouter();

  const { data: countries = [], isLoading: countriesLoading, error: countriesError } = useCountries();
  const { data: latestMeals = [], isLoading: latestLoading, error: latestError } = useLatestMeals();
  const { data: randomMeals = [], isLoading: randomLoading, error: randomError } = useRandomMeals(10);
  const { data: popularMeals = [], isLoading: popularLoading, error: popularError } = usePopularMeals();

  const handleMealClick = (id: string) => {
    router.push(`/meal/${id}`);
  };

  // Helper to render skeleton items
  const renderSkeletons = (count: number) =>
    Array.from({ length: count }).map((_, idx) => (
      <div key={idx} className="border rounded p-4 animate-pulse">
        <div className="w-full h-48 bg-gray-300 rounded mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      </div>
    ));

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">

      {/* Browse by Category */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
        <Categories />
      </section>

      {/* Browse by Country */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Browse by Country</h2>
        {countriesLoading && <p>Loading countries...</p>}
        {countriesError && <p>Error loading countries</p>}
        <div className="flex flex-wrap gap-4 mb-6">
          {countries.map((country) => {
            const code = countryCodeMap[country.strArea] ?? 'un';
            return (
              <button
                key={country.strArea}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                onClick={() => router.push(`/country/${country.strArea}`)}
              >
                <img
                  src={`https://flagcdn.com/24x18/${code}.png`}
                  alt={country.strArea}
                  className="w-6 h-4 object-cover rounded-sm"
                />
                {country.strArea}
              </button>
            );
          })}
        </div>
      </section>

      {/* Latest Meals */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Meals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestLoading
            ? renderSkeletons(6)
            : latestMeals.map((meal) => (
                <div key={meal.idMeal} className="border rounded p-4 hover:shadow-lg transition cursor-pointer" onClick={() => handleMealClick(meal.idMeal)}>
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                  <h3 className="font-semibold">{meal.strMeal}</h3>
                </div>
              ))}
        </div>
        {latestError && <p className="text-red-500 mt-2">Error loading latest meals</p>}
      </section>

      {/* Popular Meals */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Popular Meals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularLoading
            ? renderSkeletons(6)
            : popularMeals.map((meal) => (
                <div key={meal.idMeal} className="border rounded p-4 hover:shadow-lg transition cursor-pointer" onClick={() => handleMealClick(meal.idMeal)}>
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                  <h3 className="font-semibold">{meal.strMeal}</h3>
                </div>
              ))}
        </div>
        {popularError && <p className="text-red-500 mt-2">Error loading popular meals</p>}
      </section>

      {/* Random Meals */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Random Meals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {randomLoading
            ? renderSkeletons(6)
            : Array.from(new Map(randomMeals.map(meal => [meal.idMeal, meal])).values()).map(meal => (
                <div
                  key={meal.idMeal}
                  className="border rounded p-4 hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleMealClick(meal.idMeal)}
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                  <h3 className="font-semibold">{meal.strMeal}</h3>
                </div>
              ))}
        </div>
        {randomError && <p className="text-red-500 mt-2">Error loading random meals</p>}
      </section>

    </div>
  );
}
