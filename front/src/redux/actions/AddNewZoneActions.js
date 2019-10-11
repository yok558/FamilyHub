import { GET_CHECK_ZONES, ADD_CHECKPOINT } from '../actionNames/AddNewZoneActionNames';

export const addNewCheckpoint = (data) => async (dispatch) => {
  console.log(data);

  const {
 latitude, longitude, name, familyId, description, cookies 
} = data;
  try {
    const response = await fetch('http://134.209.82.36:3000/api/coordinates/location', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache',
        credentials: 'same-origin',
        Cookie: `connect.sid=${cookies}`,
      },
      body: JSON.stringify({
        latitude,
        longitude,
        name,
        FamilyId: familyId,
        description,
      }),
    });
    const myJson = await response.json();
    console.log(myJson);
    dispatch({ type: ADD_CHECKPOINT, payload: data });
  } catch (e) {
    console.log(e);
  }
};