import React, {Component} from 'react'
import { connect } from 'react-redux'
import { 
  getAircraftsThunk, 
  removeAAircraftThunk, 
  editAAircraftActionCreator,
  setActiveAircraft
} from '../reducers/aircraftsReducer'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';

import {Link} from 'react-router-dom'

class DisconnectedAllAircrafts extends Component {
  componentDidMount () {
    this.props.getAircrafts()
  }

  render () {
    return (
      <div>
      <h4>List of All Aircrafts</h4>
      {!this.props.aircrafts ? (
          <div>[]</div>
        ) : (
          this.props.aircrafts.map(aircraft => (
            <div key={aircraft.id}>
              <Grid item xs={8}>
                <Link to={`/aircrafts/${aircraft.id}`}>{aircraft.make}</Link>
                  {aircraft.country ? (
                    <div>Owned by: {aircraft.country.name}</div>
                  ): (
                    <div>Owned by: unavailable </div>
                  )}
                  <div>
                    <Link to={`/aircrafts/update/${aircraft.id}`}><CreateTwoToneIcon /></Link>
                    <Link to="/">
                      <DeleteTwoToneIcon 
                        onClick={()=> this.props.removeAAircraftDispatch(aircraft.id)}
                      />
                    </Link>
                  </div>
              </Grid>
            </div>
          ))
        )}
        <br />
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => {
            console.log("PING PING: ", setActiveAircraft )
            this.props.setActiveAircraft(this.props.aircrafts[0])
          }}
          component={Link} 
          to="/aircrafts_form">
            Add A New Aircraft
        </Button>
        <br />
        <Link to="/">Back</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  aircrafts: state.aircrafts.allAircrafts
})

const mapDispatchToProps = dispatch => ({
  getAircrafts: () => dispatch(getAircraftsThunk()),
  removeAAircraftDispatch: (id) => dispatch(removeAAircraftThunk(id)),
  setActiveAircraft: (aircraft) => dispatch(setActiveAircraft(aircraft))
})

export const AllAircrafts = connect(mapStateToProps, mapDispatchToProps)(DisconnectedAllAircrafts)
