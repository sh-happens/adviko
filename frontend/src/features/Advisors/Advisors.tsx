import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";

import { AdvisorCard } from "components/AdvisorCard";
import { TestIds } from "test/utils/testIds";
import { useAdvisors } from "./model/useAdvisors";
import { useStyles } from "./styles";


const Advisors = () => {
  const classes = useStyles();

  const { view, setReviewsRange, handleReviewsInputChange, handleSortChange, handleClearAllFilters, onSliderCommitHandler,onTextfieldCommitHandler } = useAdvisors()

  return (
    <Container className={classes.root}>
      <Paper  data-testid={TestIds.Advisor} className={classes.paper}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography data-testid={TestIds.Filtering}  gutterBottom>Filtering</Typography>
            <div className={classes.filters}>
              <Slider
                min={0}
                max={view.sliderMax}
                value={view.reviewsRange}
                disabled={view.loading}
                valueLabelDisplay="auto"
                onChange={(e, newValue) => setReviewsRange(newValue)}
                // @ts-ignore
                onChangeCommitted={onSliderCommitHandler}
              />
              <div className={classes.reviewsRangeInputs}>
                <TextField
                  size="small"
                  id="lower"
                  label="Min reviews"
                  variant="outlined"
                  type="number"
                  disabled={view.loading}
                  // @ts-ignore
                  value={view.reviewsRange[0]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleReviewsInputChange(e, "lower")}
                  onBlur={onTextfieldCommitHandler}
                />

                <TextField
                  size="small"
                  id="upper"
                  label="Max reviews"
                  variant="outlined"
                  type="number"
                  disabled={view.loading}
                  // @ts-ignore
                  value={view.reviewsRange[1]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleReviewsInputChange(e, "upper")}
                  onBlur={onTextfieldCommitHandler}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography data-testid={TestIds.Sorting}  gutterBottom>Sort by</Typography>

            <FormControl component="fieldset" className={classes.filters}>
              <RadioGroup
                aria-label="reviews-order"
                name="reviews-order"
                value={view.reviewsOrder}
                onChange={handleSortChange}
              >
                <FormControlLabel
                  value="descending"
                  disabled={view.loading}
                  control={<Radio />}
                  label="Reviews number descending"
                />

                <FormControlLabel
                  value="ascending"
                  disabled={view.loading}
                  control={<Radio />}
                  label="Reviews number ascending"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Button size="small" color="primary" onClick={handleClearAllFilters}>
          Clear All
        </Button>
      </Paper>

      <Grid container spacing={2}>
        {view.loading ? (
          <div className={classes.loader}>
            <CircularProgress size="3rem" />
          </div>
        ) : (
         view.advisors.map((advisor) => (
            <Grid item key={advisor.id} xs={12} sm={6} md={4} lg={3}>
              <AdvisorCard advisor={advisor} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export { Advisors};
