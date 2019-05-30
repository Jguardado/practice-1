import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { HashRouter, Route, Switch} from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';


import { AllAircrafts }from './AllAircrafts'
import { AllCountries } from './AllCountries'
import { AircraftsForm } from './AircraftsForm'
import { CountryForm } from './CountryForm'
import { FiveCountries } from './FiveCountries'
import { SingleAircraft } from './SingleAircraft'
import { SingleCountry } from './SingleCountry'
// import { UpdateAircraft } from './UpdateAircraft'
// import { UpdateCountry } from './UpdateCountry'

const styles = {
  root: {
    flexGrow: 1,
  },
};

function Root(props) {
  const { classes } = props;

  return (

    <HashRouter>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link component={RouterLink} to="/" variant="h6" color="inherit">
              Home
            </Link>
            <hr />
            <Link component={RouterLink} to="/aircrafts" variant="h6" color="inherit">
              Aircrafts
            </Link>
            <hr />
            <Link component={RouterLink} to="/countries" variant="h6" color="inherit">
              Countries
            </Link>
            <hr />
            <Link component={RouterLink} to="/countries/topFive" variant="h6" color="inherit">
              Top 5 Countries
            </Link>
          </Toolbar>
        </AppBar>
        <div>
          <h1>Welcome Fanatics!</h1>
        </div>
        <Switch>
          <Route exact path="/aircrafts" component={AllAircrafts}/>
          <Route exact path="/aircrafts/:id" component={SingleAircraft}/>
          <Route exact path="/aircrafts_form" component={AircraftsForm} />
          <Route exact path="/countries" component={AllCountries} />
          <Route exact path="/countries/topFive" component={FiveCountries} />
          <Route exact path="/countries/:id" component={SingleCountry}/>
          <Route exact path="/country_form" component={CountryForm} />

        </Switch>
      </div>
    </HashRouter>
  );
}

{/* <Route exact path="/aircrafts/update/:id" component={UpdateAircraft} /> */}
{/* <Route exact path="/countries/update/:id" component={UpdateCountry} /> */}
Root.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Root);
