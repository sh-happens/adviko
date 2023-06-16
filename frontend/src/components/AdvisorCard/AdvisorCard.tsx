import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { AdvisorProps } from "features/Advisors/types";

const AdvisorCard = ({advisor}: AdvisorProps ) => {
  const {name, status, language, reviews} = advisor
  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        title={<Typography variant="h6">{name}</Typography>}
      />

      <CardContent>
        <Typography variant="caption">
          {status ? "Online" : "Offline"}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
        >{`Advisor speaks ${language}`}</Typography>
        <Typography>{`There are ${reviews} reviews`}</Typography>
      </CardContent>
    </Card>
  );
};

export {AdvisorCard};
