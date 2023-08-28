
export const UPDATE_HOUSE = 'UPDATE_HOUSE';
export const UPDATE_PATRONUS = 'UPDATE_PATRONUS';

export const updateHouse = (house) => {
  return {
    type: UPDATE_HOUSE,
    payload: house,
  };
};
export const updatePatronus = (patronus) => {
    return {
      type: UPDATE_PATRONUS,
      payload: patronus,
    };
  };