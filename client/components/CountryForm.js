import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addACountryThunk } from '../reducers/countriesReducer'
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

class DisconnectedCountryForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      name: '',
      GFI: '',
      flagUrl: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.ADD_A_COUNTRY_DISPATCH(this.state)
    this.props.history.push('/countries');

    this.setState({
          name: '',
          GFI: '',
          flagUrl: ''
        })
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='name'> Name:
          <Input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>

        <br />

        <label htmlFor='gfi'>GFI:
          <Input
            name="GFI"
            type="text"
            value={this.state.GFI}
            onChange={this.handleChange}
          />
        </label>

        <br />

        <label htmlFor='flagUrl'>Flag Url:
          <Input
            name="flagUrl"
            type="text"
            value={this.state.flagUrl}
            onChange={this.handleChange}
          />
        </label>

        <br/>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>

      </form>
    )
  }
}



const mapDispatch = dispatch => ({
  ADD_A_COUNTRY_DISPATCH: (strings) => dispatch(addACountryThunk(strings))
})

export default withStyles(styles)(DisconnectedCountryForm);


export const CountryForm = connect(null, mapDispatch)(DisconnectedCountryForm)
