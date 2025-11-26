'use client';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Breadcrumb from '@/src/components/Breadcrumb';
import ImageWithSkeleton from '@/src/components/ImageWithSkeleton';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';
const ITEMS_PER_PAGE = 10; // 10 records per page

export default function CountryMealsPage() {
    const params = useParams();
    const router = useRouter();
    const country = params.country;

    const [currentPage, setCurrentPage] = useState(1);

    const { data: meals = [], isLoading, error } = useQuery({
        queryKey: ['mealsByCountry', country],
        queryFn: async () => {
            if (!country) return [];
            const res = await axios.get(`${API_BASE}/filter.php?a=${country}`);
            return res.data.meals ?? [];
        },
        enabled: !!country,
    });

    // Frontend pagination logic
    const totalPages = Math.ceil(meals.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedMeals = meals.slice(startIndex, endIndex);

    const handleMealClick = (id: string) => {
        router.push(`/meal/${id}`);
    };

    // Skeleton loader helper
    const renderSkeletons = (count: number) =>
        Array.from({ length: count }).map((_, idx) => (
            <div key={idx} className="border rounded p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            </div>
        ));

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb />

            <h1 className="text-3xl font-bold mb-6">{country} Meals</h1>

            {error && <p className="text-red-500 mb-4">Error loading meals</p>}

            {/* Meals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {isLoading
                    ? renderSkeletons(ITEMS_PER_PAGE)
                    : paginatedMeals.map((meal: any) => (
                        <div
                            key={meal.idMeal}
                            className="border rounded p-4 hover:shadow-lg cursor-pointer transition"
                            onClick={() => handleMealClick(meal.idMeal)}
                        >
                            <ImageWithSkeleton
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                className="w-full h-48 object-cover rounded mb-2"
                            />
                            <h3 className="font-semibold">{meal.strMeal}</h3>
                        </div>
                    ))}
            </div>

            {/* Pagination Controls */}
            {!isLoading && totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
                    <button
                        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                }`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
