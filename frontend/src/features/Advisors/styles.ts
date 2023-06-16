import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  loader: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    marginBottom: "1rem",
    padding: "13px",
  },
  filters: {
    padding: "0 1.5rem",
  },
  reviewsRangeInputs: {
    display: "flex",
    justifyContent: "space-between",
  },
});
