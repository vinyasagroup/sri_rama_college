export const validateMarquee = (
  data: any
) => {

  if (!data.marqueeText) {
    return "Marquee Text Required";
  }

  return null;

};