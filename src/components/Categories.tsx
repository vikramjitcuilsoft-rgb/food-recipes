'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Breadcrumb from './Breadcrumb';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

interface CategoriesProps {
    className?: string; // optional, for custom styling
}

export default function Categories({ className }: CategoriesProps) {
    const router = useRouter();

    const { data: categories = [], isLoading, error } = useQuery<Category[], Error>({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axios.get(`${API_BASE}/categories.php`);
            return res.data.categories ?? [];
        },
    });

    const handleCategoryClick = (category: string) => {
        router.push(`/category/${category}`);
    };

    // Skeleton loader
    const renderSkeletons = (count: number) =>
        Array.from({ length: count }).map((_, idx) => (
            <div key={idx} className="border rounded p-4 animate-pulse">
                <div className="w-full h-32 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            </div>
        ));

    if (error) return <p className="text-red-500">Error loading categories</p>;

    return (
        <div className={`flex flex-wrap gap-4 mb-6 ${className || ''}`}>
            {isLoading
                ? renderSkeletons(6)
                : categories.map((cat) => (
                    <button
                        key={cat.idCategory}
                        className="flex flex-col items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
                        onClick={() => handleCategoryClick(cat.strCategory)}
                    >
                        <img
                            src={cat.strCategoryThumb}
                            alt={cat.strCategory}
                            className="w-16 h-16 object-cover rounded-full mb-1"
                        />
                        <span>{cat.strCategory}</span>
                    </button>
                ))}
        </div>
    );
}
