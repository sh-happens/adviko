const Advisor = require("../models/Advisor");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllAdvisors = asyncHandler(async (req, res, next) => {
  let query;

  let uiValues = {
    filtering: {},
    sorting: {},
  };

  const reqQuery = { ...req.query };

  const removeFields = ["sort"];

  removeFields.forEach((val) => delete reqQuery[val]);

  const filterKeys = Object.keys(reqQuery);
  const filterValues = Object.values(reqQuery);

  filterKeys.forEach(
    (val, idx) => (uiValues.filtering[val] = filterValues[idx])
  );

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = Advisor.find(JSON.parse(queryStr));

  if (req.query.sort) {
    const sortByArr = req.query.sort.split(", ");

    sortByArr.forEach((val) => {
      let order;

      if (val[0] === "-") {
        order = "descending";
      } else {
        order = "ascending";
      }
      uiValues.sorting[val.replace("-", "")] = order;
    });

    const sortByStr = sortByArr.join(" ");

    query = query.sort(sortByStr);
  } else {
    query = query.sort("-reviews");
  }

  const advisors = await query;

  const maxReviews = await Advisor.find()
    .sort({ reviews: -1 })
    .limit(1)
    .select("-_id reviews");

  const minReviews = await Advisor.find()
    .sort({ reviews: 1 })
    .limit(1)
    .select("-_id reviews");

  uiValues.maxReviews = maxReviews[0].reviews
  uiValues.minReviews = minReviews[0].reviews

  res.status(200).json({
    success: true,
    data: advisors,
    uiValues,
  });
});

exports.createNewAdvisor = asyncHandler(async (req, res, next) => {
  const advisor = await Advisor.create(req.body);

  res.status(201).json({
    success: true,
    data: advisor,
  });
});

exports.updateAdvisorById = asyncHandler(async (req, res, next) => {
  let advisor = await Advisor.findById(req.params.id);

  if (!advisor) {
    return next(
      new ErrorResponse(`Advisor with id ${req.params.id} was not found`, 404)
    );
  }

  advisor = await Advisor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: advisor,
  });
});

exports.deleteAdvisorById = asyncHandler(async (req, res, next) => {
  let advisor = await Advisor.findById(req.params.id);

  if (!advisor) {
    return next(
      new ErrorResponse(`Advisor with id ${req.params.id} was not found`, 404)
    );
  }

  await advisor.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
