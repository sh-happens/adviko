import axios, { Canceler } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Advisor, Filtering, ReviewsOrder, Sorting, uiValues } from "../types";
import { AdvisorsViewModel } from "./AdvisorsViewModel";

const useAdvisors = () => {
  const history = useHistory();
  const location = useLocation();

  const params = location.search ? location.search : null;

  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [sliderMax, setSliderMax] = useState<number>(100);
  const [reviewsRange, setReviewsRange] = useState<number | number[]>([0, 100]);
  const [reviewsOrder, setReviewsOrder] = useState<ReviewsOrder>("descending");

  const [filter, setFilter] = useState<{} | Filtering>("");
  const [sorting, setSorting] = useState<{} | Sorting>("");

  useEffect(() => {
    let cancel: Canceler;

    const fetchAdvisors = async () => {
      setLoading(true);
      try {
        let query: any;

        if (params && !filter) {
          query = params;
        } else {
          query = filter;
        }

        if (sorting) {
          if (query.length === 0) {
            query = `?sort=${sorting}`;
          } else {
            query = query + "&sort=" + sorting;
          }
        }

        const { data } = await axios({
          method: "GET",
          url: `/api/advisors${query}`,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

        setAdvisors(data.data);
        setLoading(false);
        updateUiValues(data.uiValues);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.log(error.response.data);
      }
    };

    fetchAdvisors();

    return () => cancel();
  }, [filter, params, sorting]);

  const updateUiValues = (uiValues: uiValues) => {
    setSliderMax(uiValues.maxReviews);

    if (uiValues.filtering?.reviews) {
      let reviewsFilter = uiValues.filtering.reviews;

      setReviewsRange([Number(reviewsFilter.gte), Number(reviewsFilter.lte)]);
    }

    if (uiValues.sorting?.reviews) {
      let reviewsSort = uiValues.sorting?.reviews;

      setReviewsOrder(reviewsSort);
    }
  };

  const onSliderCommitHandler = (
    e: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    buildRangeFilter(newValue);
  };

  const onTextfieldCommitHandler = () => {
    buildRangeFilter(reviewsRange);
  };

  const buildRangeFilter = (newValue: number | number[]) => {
    // @ts-ignore
    const urlFilter = `?reviews[gte]=${newValue[0]}&reviews[lte]=${newValue[1]}`;

    setFilter(urlFilter);
    history.push(urlFilter);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewsOrder(e.target.value as ReviewsOrder);

    if (e.target.value === "ascending") {
      setSorting("reviews");
    } else if (e.target.value === "descending") {
      setSorting("-reviews");
    }
  };


  const clearAllFilters = () => {
    setFilter("");
    setSorting("");
    setReviewsRange([0, 100]);
    history.push("/");
  };

  return useMemo(
    () =>
      new AdvisorsViewModel(
        {
          advisors,
          loading,
          sliderMax,
          reviewsRange,
          reviewsOrder,
          filter,
          sorting,
        },
        {
          setSliderMax,
          setLoading,
          setReviewsRange,
          setReviewsOrder,
          setFilter,
          setSorting,
          setAdvisors,
          clearAllFilters,
          onSliderCommitHandler,
          onTextfieldCommitHandler,
          handleSortChange
        }
      ).create(),
    [advisors, loading, sliderMax, reviewsRange, reviewsOrder, filter, sorting]
  );
};

export { useAdvisors };
