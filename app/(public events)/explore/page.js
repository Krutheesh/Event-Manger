"use client";

//Local events missed(need user location)

import React, { useEffect } from "react";
import useGet from "@/hooks/useGet";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CATEGORIES } from "@/lib/data";
const page = () => {
  const router = useRouter();
  const { data, isLoading, error } = useGet("/event");
  const {
    data: featuredEvents,
    isLoading: loadingFeatured,
    error: errorFeatured,
  } = useGet("/event/featured");
  const {
    data: eventsPopular,
    isLoading: loadingPopular,
    error: errorPopular,
  } = useGet("/event/popular");
  const {
    data: categoryCounts,
    isLoading: loadingCounts,
    error: errorCounts,
  } = useGet("/event/category/count");
  const {
    data: eventsHyderabad,
    isLoading: loadingHyderabad,
    error: errorHyderabad,
  } = useGet("/event/location");
  //(categoryCounts, "categoryCounts");
  //(eventsHyderabad, "eventsHyderabad");
  // //(categoryCounts,"categoryCounts");
  const handleEventClick = (eventId) => {
    // Navigate to event details page
    router.push(`/events/${eventId}`);
  };

  const handleCategoryClick = (categoryId) => {
    router.push(`/explore/${categoryId}`);
  };
  const categoriesWithCounts = CATEGORIES.map((cat) => ({
    ...cat,
    count: categoryCounts?.[cat.id] || 0,
  }));
  //(categoriesWithCounts,"categoriesWithCounts");
  return (
    <>
      <div className="pb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Events</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore featured events, find what&apos;s happening locally, or browse
          events across India
        </p>
      </div>

      <h1>___________________Popular Events________________________</h1>
      <div className="flex flex-wrap justify-between p-5 m-5">
        {eventsPopular &&
          eventsPopular.map((event) => (
            <div
              key={event._id}
              className="border-2 p-4 m-2 rounded-md w-[200] "
              onClick={() => handleEventClick(event._id)}
            >
              <img src={event.coverImage} alt={event.title} width="200" />
            </div>
          ))}
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Browse by Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {categoriesWithCounts.map((category) => (
            <div
              key={category.id}
              className="py-2 group cursor-pointer hover:shadow-lg transition-all hover:border-purple-500/50"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="px-3 sm:p-6 flex items-center gap-3">
                <div className="text-3xl sm:text-4xl">{category.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1 group-hover:text-purple-400 transition-colors">
                    {category.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} Event{category.count !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h1>___________________Featured Events________________________</h1>
      <div className="flex flex-wrap justify-between p-5 m-5">
        {featuredEvents &&
          featuredEvents.map((event) => (
            <div
              key={event._id}
              className="border-2 p-4 m-2 rounded-md w-[200] "
            >
              <img src={event.coverImage} alt={event.title} width="200" />
            </div>
          ))}
      </div>
      <h1>___________________Events________________________</h1>

      <div className="flex flex-wrap justify-between p-5 m-5">
        {data &&
          data.map((event) => (
            <div
              key={event._id}
              className="border-2 p-4 m-2 rounded-md w-[200] "
            >
              <h2>{event.title}</h2>
              <img src={event.coverImage} alt={event.title} width="200" />
            </div>
          ))}
      </div>
    </>
  );
};

export default page;
