import { Dishes, Rating } from "@prisma/client";

export const calculatePriceAverage = (dishes: Dishes[]) => {
    if (dishes.length === 0) {
        return 0;
    }

    const total = dishes.reduce((sum, dish) => sum + parseFloat(dish.price.toString()), 0);
    const average = total / dishes.length;
    const roundedAverage = Math.round(average / 2) * 2;

    return roundedAverage;
};

export const calculateRatingAverage = (rating: Rating[]) => {
    if (rating.length === 0) {
        return 0;
    }

    const total = rating.reduce((sum, rating) => sum + parseFloat(rating.rating.toString()), 0);
    const average = total / rating.length;
    const roundedAverage = parseFloat(average.toFixed(1));

    return roundedAverage;
};

export const getStatsFromRatings = (ratings: Rating[]) => {
    const ratingCounts: Record<string, number> = {
      "5": 0,
      "4": 0,
      "3": 0,
      "2": 0,
      "1": 0,
    };
  
    ratings.forEach((rating) => {
      const ratingValue = rating.rating.toString();
      if (ratingCounts.hasOwnProperty(ratingValue)) {
        ratingCounts[ratingValue]++;
      }
    });
  
    return ratingCounts;
  };