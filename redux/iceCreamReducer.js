const initialState = {
  numofIceCreams: 20,
};
const iceCreamReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIALISE":
      return {
        ...state,
        numofIceCreams: state.numofIceCreams - 1,
      };
    default:
      return state;
  }
};

export default iceCreamReducer;
