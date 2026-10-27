export const validateSlider = (
  body: any
) => {

  if (!body.status) {
    return "Status is Required";
  }

  return null;

};