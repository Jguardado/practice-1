import axios from 'axios'


// ACTION TYPES
const GET_AIRCRAFTS = 'GET_AIRCRAFTS'
const GET_A_AIRCRAFT = 'GET_A_AIRCRAFT'
const ADD_A_AIRCRAFT = 'ADD_A_AIRCRAFT'
const UPDATE_A_AIRCRAFT = 'UPDATE_A_AIRCRAFT'
const REMOVE_A_AIRCRAFT = 'REMOVE_A_AIRCRAFT'
const SET_ACTIVE_AIRCRAFT = "SET_ACTIVE_AIRCRAFT"


// ACTION CREATOR
export const gotAircraftsActionCreator = (data) => ({
  type: GET_AIRCRAFTS,
  aircrafts:data
});

export const gotAAircraftActionCreator = data => ({
  type: GET_A_AIRCRAFT,
  aircrafts: data
});

export const addAAircraftActionCreator = (strings) => ({
  type: ADD_A_AIRCRAFT,
  newAircraft: strings
});

export const updateAAircraftActionCreator = (id, data) => ({
  type: UPDATE_A_AIRCRAFT,
  id: id,
  data: data
});

export const deleteAAircraftActionCreator = (data) => ({
  type: REMOVE_A_AIRCRAFT,
  id: data.id
});

export const setActiveAircraft = (payload) => ({
  type: SET_ACTIVE_AIRCRAFT,
  payload
});

// THUNK CREATORS
export const getAircraftsThunk = () => {
  return async (dispatch) => {
    try{
      const response = await axios.get('/api/aircrafts')
      dispatch(gotAircraftsActionCreator(response.data))
    }
    catch(err){
      console.error(err, "your get aircrafts thunky thunk is broken shawty!")
    }
  }
}

export const getAAircraftThunk = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/aircrafts/${id}`)
      dispatch(gotAAircraftActionCreator(response.data))
    }
    catch (err) {
      console.error(err, "your get a single aircraft thunky thunk is broken")
    }
  }
}

export const addAAircraftThunk = (obj) => {
  return async (dispatch) => {
    try{
      const response = await axios.post("/api/aircrafts/", obj)
      dispatch(addAAircraftActionCreator(response.data))
    }
    catch(err){
      console.error(err, "your add a aircraft thunky thunk is broken")
    }
  }
}

export const updateAAircraftThunk = (aircraftId, obj) => {
  return async (dispatch) => {
    try{
      const response = await axios.put(`/api/aircrafts/${aircraftId}`, obj)
      dispatch(updateAAircraftActionCreator(response.data))
    }
    catch(err){
      console.log(err, "your update thunky thunk is broken")
    }
  }
}


export const removeAAircraftThunk = (aircraftId) => {
  return async (dispatch) => {
    try{
      const response = await axios.delete(`/api/aircrafts/${aircraftId}`)
      dispatch(deleteAAircraftActionCreator(response.data))
    }
    catch(err){
      console.log(err, "your delete thunky thunk is broken")
    }
  }
}

const initialState = {
  allAircrafts: [],
  singleAircraft: {}
}


// REDUCER
const reducer = (state = initialState, action) => {
  switch(action.type){
    case SET_ACTIVE_AIRCRAFT:
      return {
        ...state,
        activeAircraft: action.payload
      }
    case GET_AIRCRAFTS:
      return {
        ...state,
        allAircrafts: action.aircrafts
      }
    case GET_A_AIRCRAFT:
      return {
        ...state,
        singleAircraft: action.aircrafts
      }
    case ADD_A_AIRCRAFT:
       return {
          ...state,
          allAircrafts:[...state.allAircrafts, action.newAircraft]
        }
    case UPDATE_A_AIRCRAFT:
       return state.allAircrafts.map((item)=>{
        if(item.id === action.id) {
          return {
             allAircrafts:[...state.allAircrafts]
          }
        }
        else return item
      })
    case REMOVE_A_AIRCRAFT:
      return state.allAircrafts.filter((item) => item.id !== parseInt(action.id))
    default:
      return state
  }
}


export default reducer
