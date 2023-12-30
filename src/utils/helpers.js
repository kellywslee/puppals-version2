// To calculate distance from two geolocations
export const calDistance = ([lat1, lng1], [lat2, lng2]) => {
  const toRad = (value) => {
    return (value * Math.PI) / 180;
  };

  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// To calculate age from birthday
export const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const currentDate = new Date();
  let ageInMonths = (currentDate.getFullYear() - birthDate.getFullYear()) * 12;
  ageInMonths -= birthDate.getMonth();
  ageInMonths += currentDate.getMonth();

  const years = Math.floor(ageInMonths / 12);
  const months = ageInMonths % 12;

  if (years === 0) {
    return `${months} mo${months !== 1 ? 's' : ''}`;
  } else {
    return `${years} yr${years !== 1 ? 's' : ''}`;
  }
};

// To capitaliza all letters of a string
export const capitalizeAllLetters = (string) => {
  return string.toUpperCase();
};

// To capitalize first letter of a string and lowercase the rest
export const capFirstLowerRest = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// To make camel case to Title Case
export const camelToTitle = (string) => {
  const words = string.split(/(?=[A-Z])/);
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
