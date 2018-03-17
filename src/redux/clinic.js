import { CLINICS } from './const';
import { API_URL } from 'service/const';


const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const REMOVE = 'REMOVE'; 

const initialState = {
  clinics: CLINICS
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE:
      return { ...state, clinic: action.clinics  };
    default: 
      return state;
  }
}

export const loadClinics = () => {
  return async dispatch => {
    try {
      const clinics = await load_clinics();
      dispatch({ type: UPDATE, clinics });
    } catch (e) {
      console.log('error')
    }
  }
}

export const createClinic = (clinic) => {
  return { type: CREATE, clinic };
}

export const updateClinic = (clinics) => {
  return { type: UPDATE, clinics };
}

export const removeClinic = () => {
  return { type: REMOVE };
}

const URL = API_URL + '/api/clinics/';

export const load_clinics = async () => {
  const response = await fetch(URL, { method: 'GET'})
  console.log('load_clinics',  response.json())

  return response.json();
}