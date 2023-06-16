import { AdvisorsViewModel } from "./AdvisorsViewModel";

const model = {
  advisors: [
    {
      id: "648824f9fc13ae16a4900948",
      name: "Brinna Butten",
      reviews: 100,
      status: false,
      language: "Italian",
    },
  ],
  reviewsRange: [23, 45],
  loading: false,
  sliderMax: 100,
  reviewsOrder: "ascending",
  filter: {
    reviews: {
      gte: "0",
      lte: "85",
    },
  },
  sorting: "upper",
};

const handlers = {
  setAdvisors: jest.fn(),
  setLoading: jest.fn(),
  setSliderMax: jest.fn(),
  setReviewsRange: jest.fn(),
  setReviewsOrder: jest.fn(),
  setFilter: jest.fn(),
  setSorting: jest.fn(),
  clearAllFilters: jest.fn(),
  onSliderCommitHandler: jest.fn(),
  onTextfieldCommitHandler: jest.fn(),
  handleSortChange: jest.fn(),
};

describe("AdvisorViewModel", () => {
  it("should return the correct view when providing a model", () => {
    // @ts-ignore
    const actual = new AdvisorsViewModel(model, handlers).create().view;

    const expected = {
      advisors: [
        {
          id: "648824f9fc13ae16a4900948",
          name: "Brinna Butten",
          reviews: 100,
          status: false,
          language: "Italian",
        },
      ],
      reviewsRange: [23, 45],
      loading: false,
      sliderMax: 100,
      reviewsOrder: "ascending",
      filter: {
        reviews: {
          gte: "0",
          lte: "85",
        },
      },
      sorting: "upper",
    };

    expect(actual).toEqual(expected);
  });
});
