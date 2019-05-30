import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addAAircraftThunk } from '../reducers/aircraftsReducer'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
});

class DisconnectedAircraftForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      editing:false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      ...this.props.activeAircraft
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.ADD_A_AIRCRAFT_DISPATCH(this.state)

    this.setState({
      make: '',
      model: '',
      year: '',
      type: '',
      cost: '',
      imageUrl: '',
      description: '',
      countryId: ''
    })
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    console.log(this.state)
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='name'> Make:
          <Input
            name="make"
            type="text"
            value={this.state.make}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor='model'>Model:
          <Input
            name="model"
            type="text"
            value={this.state.model}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor='year'>Year:
          <Input
            name="year"
            type="text"
            value={this.state.year}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <label htmlFor='type'> Type:
          <select name="type" onChange={this.handleChange}>
              <option value="none">Select</option>
              <option value="Attack">Attack</option>
              <option value="Bomber">Bomber</option>
              <option value="Versatile">Versatile</option>
              <option value="Transport">Transport</option>
              <option value="Reconoissance">Reconoissance</option>
            </select>
        </label>
        <br/>
        <label htmlFor='cost'>Cost:
            <Input
              name="cost"
              type="text"
              value={this.state.cost}
              onChange={this.handleChange}
            />
        </label>
        <br/>
        <label htmlFor='image'>Image Url:
          <Input
            name="imageUrl"
            type="text"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
        </label>
        <br/>
        <label htmlFor='description'>Description:
            <Input
              name="description"
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
            />
        </label>
        <br/>
        <label htmlFor='countryId'> Country:
          <select name="countryId" onChange={this.handleChange}>
              <option value="none">Select</option>
              <option value="1">United States of America</option>
              <option value="2">Italy</option>
              <option value="3">Japan</option>
              <option value="4">France</option>
              <option value="5">Spain</option>
              <option value="6">Germany</option>
              <option value="7">Argentina</option>
              <option value="8">Canada</option>
              <option value="9">Russia</option>
              <option value="10">Korea</option>
            </select>
        </label>
        <br />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  activeAircraft: state.aircrafts.activeAircraft
})

const mapDispatch = dispatch => ({
  ADD_A_AIRCRAFT_DISPATCH: (strings) => dispatch(addAAircraftThunk(strings))
})

const StyledAircraftForm = withStyles(styles)(DisconnectedAircraftForm);

export const AircraftsForm = connect(mapStateToProps, mapDispatch)(StyledAircraftForm)
