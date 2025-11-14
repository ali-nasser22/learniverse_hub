"use client";

import {useMemo, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";

interface IProps {
    courses: unknown;
    categories: unknown;
}

const CoursesPageClient = ({courses, categories}: IProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    // Filter courses based on search query and selected category
    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
            // Filter by search query (checks title and subtitle)
            const matchesSearch =
                searchQuery === "" ||
                course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.subtitle?.toLowerCase().includes(searchQuery.toLowerCase());

            // Filter by category
            const matchesCategory =
                selectedCategory === "all" ||
                course.category.id === selectedCategory ||
                course.category.title === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [courses, searchQuery, selectedCategory]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Courses</h1>

            {/* Filter Section */}
            <div className="mb-8 space-y-4">
                {/* Search Input */}
                <div>
                    <label htmlFor="search" className="block text-sm font-medium mb-2">
                        Search Courses
                    </label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search by course name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Category Filter */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-2">
                        Filter by Category
                    </label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Active Filters Display */}
                <div className="flex items-center gap-2 flex-wrap">
                    {searchQuery && (
                        <span
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            Search: "{searchQuery}"
                            <button
                                onClick={() => setSearchQuery("")}
                                className="hover:text-blue-600"
                            >
                                ×
                            </button>
                        </span>
                    )}
                    {selectedCategory !== "all" && (
                        <span
                            className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            Category: {categories.find(c => c.id === selectedCategory)?.title}
                            <button
                                onClick={() => setSelectedCategory("all")}
                                className="hover:text-green-600"
                            >
                                ×
                            </button>
                        </span>
                    )}
                </div>
            </div>

            {/* Results Summary */}
            <div className="mb-4 text-gray-600">
                Showing {filteredCourses.length} of {courses.length} courses
            </div>

            {/* Courses Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                        <Link
                            href={`/courses/${course.id}`}
                            key={course.id}
                            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <Image
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-48 object-cover"
                                width={240}
                                height={240}
                            />
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                                <p className="text-gray-600 text-sm mb-3">{course.subtitle}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        {course.category.title}
                                    </span>
                                    <Badge>
                                        ${course.price}
                                    </Badge>
                                </div>
                                <div className="mt-3 text-sm text-gray-500">
                                    By: {course.instructor.firstName} {course.instructor.lastName}
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No courses found matching your criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("all");
                            }}
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursesPageClient;