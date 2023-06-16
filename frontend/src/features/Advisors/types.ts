export type AdvisorModel = {
  advisors: Advisor[];
  reviewsRange: number | number[];
  sliderMax: number;
  reviewsOrder: ReviewsOrder;
  filter: {} | Filtering;
  sorting: {} | Sorting;
  loading: boolean;
};

export interface AdvisorProps {
  advisor: {
    name: string;
    reviews: number;
    status: boolean;
    language: string;
    id: string;
  };
}

export type AdvisorHandler = {
  setAdvisors: (advisors: Advisor[]) => void;
  setLoading: (isLoading: boolean) => void;
  setSliderMax: (maxReviews: number) => void;
  setReviewsRange: (reviewsRange: number | number[]) => void;
  setReviewsOrder: (reviewsOrder: ReviewsOrder) => void;
  setFilter: (filtering: {} | Filtering) => void;
  setSorting: (sorting: {} | Sorting) => void;
  clearAllFilters: () => void;
  onSliderCommitHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
    newValue: number
  ) => void | undefined;
  onTextfieldCommitHandler: () => void
  handleSortChange: ( e: React.ChangeEvent<HTMLInputElement>) => void
};

export type ReviewsOrder = "descending" | "ascending";

export type ReviewsInputChangeType = "lower" | "upper";

export type Filtering = {
  reviews: {
    gte: string;
    lte: string;
  };
};

export type Sorting = {
  reviews: ReviewsOrder;
};

export type AdvisorView = {
  advisors: Advisor[];
  reviewsRange: number | number[];
  loading: boolean;
  sliderMax: number;
  reviewsOrder: ReviewsOrder;
  filter: {} | Filtering;
  sorting: {} | Sorting;
};

export type Advisor = {
  id: string;
  language: string;
  name: string;
  reviews: number;
  status: boolean;
};

export type uiValues = {
  filtering?: Filtering;
  sorting?: Sorting;
  maxReviews: number;
  minReviews: number;
};
