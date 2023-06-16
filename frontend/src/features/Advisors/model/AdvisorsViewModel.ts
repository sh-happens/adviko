import { Builder } from "builder-pattern";

import {
  AdvisorModel,
  AdvisorHandler,
  AdvisorView,
  ReviewsInputChangeType,
  ReviewsOrder,
} from "../types";


export class AdvisorsViewModel {
  private _view!: AdvisorView;

  private model: AdvisorModel;

  private handlers: AdvisorHandler;

  constructor(model: AdvisorModel, handlers: AdvisorHandler) {
    this.model = model;
    this.handlers = handlers;
  }

  get view(): AdvisorView {
    return this._view;
  }

  setReviewsRange = (val: number | number[]) => {
    this.handlers.setReviewsRange(val);
  };

  setReviewsOrder = (val: ReviewsOrder) => {
    this.handlers.setReviewsOrder(val)
  }

  handleReviewsInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: ReviewsInputChangeType
  ) => {
    let newRange;

    if (type === "lower") {
      newRange = [...[this.model.reviewsRange]];
      newRange[0] = Number(e.target.value);
      this.setReviewsRange(newRange as number | number[]);
    }

    if (type === "upper") {
      newRange = [...[this.model.reviewsRange]];
      newRange[1] = Number(e.target.value);

      this.setReviewsRange(newRange as number | number[]);
    }
  };

  handleClearAllFilters = () => {
    this.handlers.clearAllFilters()
  }
 
  onSliderCommitHandler = (e: React.ChangeEvent<HTMLInputElement>,
    newValue: number) => {
    this.handlers.onSliderCommitHandler(e, newValue)
  }

  onTextfieldCommitHandler = () => {
    this.handlers.onTextfieldCommitHandler()
  }

  handleSortChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
    this.handlers.handleSortChange(e)
  }

  create(): AdvisorsViewModel {
    this._view = Builder<AdvisorView>()
      .advisors(this.model.advisors)
      .reviewsRange(this.model.reviewsRange)
      .loading(this.model.loading)
      .sliderMax(this.model.sliderMax)
      .reviewsOrder(this.model.reviewsOrder)
      .filter(this.model.filter)
      .sorting(this.model.sorting)
      .build();

    return this;
  }
}
