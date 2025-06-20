"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//import { formatPrice } from "@/lib/formatPrice";
import { Search, Filter, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect, useMemo } from "react";
import { ICourse } from "../../../../model/course-model";
import CourseCard from "./_components/CourseCard";

interface SortOption {
  label: string;
  value: string;
}

interface PriceOption {
  label: string;
  value: string;
}

interface CategoryOption {
  id: string;
  label: string;
  value: string;
}

interface FilterState {
  categories: string[];
  price: string[];
  sort: string;
  search: string;
}

interface ApplyFilterParams {
  type: keyof FilterState;
  value: string;
}

interface CoursesPageProps {
  initialCourses: ICourse[];
  categories: CategoryOption[];
}

const SORT_OPTIONS: SortOption[] = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest First", value: "newest" },
  { label: "Most Popular", value: "popular" },
];

const PRICE_OPTIONS: PriceOption[] = [
  { label: "Free", value: "free" },
  { label: "Paid", value: "paid" },
];

const CoursesPage: React.FC<CoursesPageProps> = ({
  initialCourses,
  categories,
}) => {
  const [filter, setFilter] = useState<FilterState>({
    categories: [],
    price: [],
    sort: "",
    search: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter((prev) => ({ ...prev, search: searchTerm }));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Apply checkbox filter
  const applyArrayFilter = ({ type, value }: ApplyFilterParams): void => {
    const isFilterApplied = filter[type].includes(value);

    if (isFilterApplied) {
      setFilter((prev) => ({
        ...prev,
        [type]: prev[type].filter((v: string) => v !== value),
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        [type]: [...prev[type], value],
      }));
    }
  };

  // Apply sort filter
  const applySortFilter = (value: string): void => {
    setFilter((prev) => ({ ...prev, sort: value }));
  };

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = [...initialCourses];

    // Apply search filter
    if (filter.search) {
      filtered = filtered.filter(
        (course) =>
          course.title?.toLowerCase().includes(filter.search.toLowerCase()) ||
          course.subtitle
            ?.toLowerCase()
            .includes(filter.search.toLowerCase()) ||
          course.category?.title
            ?.toLowerCase()
            .includes(filter.search.toLowerCase())
      );
    }

    // Apply category filter
    if (filter.categories.length > 0) {
      filtered = filtered.filter((course) =>
        filter.categories.includes(course.category?.id as string)
      );
    }

    // Apply price filter
    if (filter.price.length > 0) {
      filtered = filtered.filter((course) => {
        const isFree = !course.price || course.price === 0;
        const isPaid = course.price && course.price > 0;

        return (
          (filter.price.includes("free") && isFree) ||
          (filter.price.includes("paid") && isPaid)
        );
      });
    }

    // Apply sorting
    if (filter.sort) {
      filtered.sort((a, b) => {
        switch (filter.sort) {
          case "price-asc":
            return (a.price || 0) - (b.price || 0);
          case "price-desc":
            return (b.price || 0) - (a.price || 0);
          case "newest":
            return (
              new Date(b.createdOn || 0).getTime() -
              new Date(a.createdOn || 0).getTime()
            );
          case "popular":
            // Assuming you have an enrollments count or similar metric
            return (
              ((b.enrollments as unknown as number[])?.length || 0) -
              ((a.enrollments as unknown as number[])?.length || 0)
            );
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [initialCourses, filter]);

  // Get active filter labels
  const getActiveFilterLabel = (
    type: keyof FilterState,
    value: string
  ): string => {
    if (type === "categories") {
      const category = categories.find((cat) => cat.value === value);
      return category?.label || value;
    }
    return value;
  };

  // Clear all filters
  const clearAllFilters = (): void => {
    setFilter({
      categories: [],
      price: [],
      sort: "",
      search: "",
    });
    setSearchTerm("");
  };

  return (
    <section
      id="courses"
      className="w-full px-4 md:px-6 lg:px-8 space-y-6 dark:bg-transparent py-6"
    >
      {/* Header */}
      <div className="flex items-baseline justify-between border-gray-200 border-b pb-6 flex-col gap-4 lg:flex-row">
        <div className="relative h-10 max-lg:w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search courses..."
            className="pl-8 pr-3 py-2 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end gap-2 max-lg:w-full">
          <Select value={filter.sort} onValueChange={applySortFilter}>
            <SelectTrigger className="w-[180px] border-none !border-b focus:ring-0 focus:ring-offset-0 overflow-hidden">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort Options</SelectLabel>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem
                    className="cursor-pointer"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Filter Menus For Mobile */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger>
                <Filter className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="text-left">Filter Courses</SheetTitle>
                  <Accordion defaultValue={["categories"]} type="multiple">
                    {/* Categories filter */}
                    <AccordionItem value="categories">
                      <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          Categories
                        </span>
                      </AccordionTrigger>

                      <AccordionContent className="pt-6 animate-none">
                        <ul className="space-y-4">
                          {categories.map((option, optionIdx) => (
                            <li
                              key={option.value}
                              className="flex items-center"
                            >
                              <Checkbox
                                id={`category-${optionIdx}`}
                                onCheckedChange={() => {
                                  applyArrayFilter({
                                    type: "categories",
                                    value: option.value,
                                  });
                                }}
                                checked={filter.categories.includes(
                                  option.value
                                )}
                              />
                              <label
                                htmlFor={`category-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600 cursor-pointer"
                              >
                                {option.label}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    {/* Price filter */}
                    <AccordionItem value="price">
                      <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">Price</span>
                      </AccordionTrigger>

                      <AccordionContent className="pt-6 animate-none">
                        <ul className="space-y-4">
                          {PRICE_OPTIONS.map((option, optionIdx) => (
                            <li
                              key={option.value}
                              className="flex items-center"
                            >
                              <Checkbox
                                id={`price-${optionIdx}`}
                                onCheckedChange={() => {
                                  applyArrayFilter({
                                    type: "price",
                                    value: option.value,
                                  });
                                }}
                                checked={filter.price.includes(option.value)}
                              />
                              <label
                                htmlFor={`price-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600 cursor-pointer"
                              >
                                {option.label}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Active filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Active categories */}
        {filter.categories.length > 0 &&
          filter.categories.map((category) => (
            <Button
              key={category}
              variant="ghost"
              className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
              onClick={() =>
                applyArrayFilter({ type: "categories", value: category })
              }
            >
              {getActiveFilterLabel("categories", category)}
              <X className="w-3" />
            </Button>
          ))}
        {/* Active prices */}
        {filter.price.length > 0 &&
          filter.price.map((price) => (
            <Button
              key={price}
              variant="ghost"
              className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
              onClick={() => applyArrayFilter({ type: "price", value: price })}
            >
              {price}
              <X className="w-3" />
            </Button>
          ))}
        {/* Search filter */}
        {filter.search && (
          <Button
            variant="ghost"
            className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
            onClick={() => {
              setSearchTerm("");
              setFilter((prev) => ({ ...prev, search: "" }));
            }}
          >
            Search: &quot;{filter.search}&quot;
            <X className="w-3" />
          </Button>
        )}
        {/* Clear all filters */}
        {(filter.categories.length > 0 ||
          filter.price.length > 0 ||
          filter.search) && (
          <Button
            variant="outline"
            className="text-xs h-7 text-red-600 border-red-200 hover:bg-red-50"
            onClick={clearAllFilters}
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        Showing {filteredAndSortedCourses.length} of {initialCourses.length}{" "}
        courses
      </div>

      {/* Main content section */}
      <section className="pb-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-4">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block pr-4">
            <div className="sticky top-6 space-y-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Filters
              </h3>
              <Accordion defaultValue={["categories"]} type="multiple">
                {/* Categories filter */}
                <AccordionItem
                  value="categories"
                  className="border-b border-gray-200 pb-4"
                >
                  <AccordionTrigger className="py-4 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      Categories
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="pt-4 pb-6 animate-none">
                    <ul className="space-y-3">
                      {categories.map((option, optionIdx) => (
                        <li key={option.value} className="flex items-center">
                          <Checkbox
                            id={`desktop-category-${optionIdx}`}
                            onCheckedChange={() => {
                              applyArrayFilter({
                                type: "categories",
                                value: option.value,
                              });
                            }}
                            checked={filter.categories.includes(option.value)}
                          />
                          <label
                            htmlFor={`desktop-category-${optionIdx}`}
                            className="ml-3 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                          >
                            {option.label}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                {/* Price filter */}
                <AccordionItem
                  value="price"
                  className="border-b border-gray-200 pb-4"
                >
                  <AccordionTrigger className="py-4 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">Price</span>
                  </AccordionTrigger>

                  <AccordionContent className="pt-4 pb-6 animate-none">
                    <ul className="space-y-3">
                      {PRICE_OPTIONS.map((option, optionIdx) => (
                        <li key={option.value} className="flex items-center">
                          <Checkbox
                            id={`desktop-price-${optionIdx}`}
                            onCheckedChange={() => {
                              applyArrayFilter({
                                type: "price",
                                value: option.value,
                              });
                            }}
                            checked={filter.price.includes(option.value)}
                          />
                          <label
                            htmlFor={`desktop-price-${optionIdx}`}
                            className="ml-3 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                          >
                            {option.label}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Course grid */}
          <div className="lg:col-span-3">
            {filteredAndSortedCourses.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-2">
                  No courses found
                </div>
                <div className="text-gray-400 text-sm">
                  Try adjusting your filters or search terms
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredAndSortedCourses.map((course) => (
                  <CourseCard key={course.id as string} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

export default CoursesPage;
