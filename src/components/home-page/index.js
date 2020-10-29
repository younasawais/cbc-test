import React, { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { geolocated } from "react-geolocated";
import { useHistory } from "react-router";

import {
  TextField,
  CardHeader,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GET_CITY_BY_NAME } from "../../api/gql-queries";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  cardRoot: {
    minWidth: 275,
    marginTop: 13,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 15,
  },
}));

const HomePage = ({
  city: { name, country, weather: { temperature } = {} } = {},
  isGeolocationEnabled,
  coords,
  getCityByNameSuccess,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [searchQuery, setSearchQuery] = React.useState("");
  const { loading, error, data } = useQuery(GET_CITY_BY_NAME, {
    variables: { name: searchQuery, config: { units: "metric" } },
  });

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchWeatherFromCoords = async () => {
    const { latitude = "", longitude = "" } = coords;
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=04b2c96b6815629f16c9461535435bcd&units=metric`
    );

    if (data && data.current) {
      getCityByNameSuccess({
        name: "Unknown",
        country: data.timezone,
        weather: { temperature: { actual: data.current.temp } },
      });
    }
  };

  if (!name && isGeolocationEnabled && coords) {
    fetchWeatherFromCoords();
  }

  useEffect(() => {
    if (data && data.getCityByName) {
      getCityByNameSuccess(data.getCityByName);
    }
  }, [data]);

  return (
    <Container maxWidth="sm" component="div">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="City Name"
          value={searchQuery}
          onChange={handleChange}
        />
      </form>
      <Card className={classes.cardRoot}>
        {temperature && (
          <CardHeader title={`${Math.round(temperature.actual)}°`} />
        )}
        {error && <Typography component="h2">{error}</Typography>}
        <CardContent component="div">
          {loading && <CircularProgress />}
          {name && (
            <Typography
              className={classes.title}
              component="h2"
              color="textSecondary"
              gutterBottom
            >
              {name}
            </Typography>
          )}
          {country && (
            <Typography
              className={classes.pos}
              component="h2"
              color="textSecondary"
            >
              {country}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button onClick={() => history.go(0)} size="small">
            Refresh Page
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

HomePage.propTypes = {
  city: PropTypes.shape({
    name: PropTypes.string,
    country: PropTypes.string,
    id: PropTypes.string,
  }),
  getCityByNameSuccess: PropTypes.func,
};

HomePage.defaultProps = {
  city: {},
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(HomePage);
