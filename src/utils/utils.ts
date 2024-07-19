import moment from 'moment';

export const formattedDate = (dateString: string) => {
  return moment(dateString).format('MMMM Do YYYY, h:mm A');
};

export const CapitalizeFirstLetter = (string: any) => {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1).toLowerCase();
};

export const CapitalizeAllLetters = (s: any) =>
  s?.charAt(0).toUpperCase() + s?.slice(1).toUpperCase();
export const lowerCaseAllLetters = (s: any) =>
  s?.charAt(0).toLowerCase() + s?.slice(1).toLowerCase();

export const getTableIndexNumber = (
  page: number,
  index: number,
  limit: number
) => {
  return (page - 1) * limit + (index + 1);
};

export const capitalizeFirstLetterOfObjectValues = (obj: any) => {
  const result: any = {};
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      result[key] = obj[key].charAt(0).toUpperCase() + obj[key].slice(1);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
};

export const convertObjectValuesToUpper = (value: any) => {
  if (typeof value !== 'object' || value === null) {
    throw new Error('Input value must be a non-null object');
  }

  const result: any = {};
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      result[key] =
        typeof value[key] === 'string' ? value[key].toUpperCase() : value[key];
    }
  }
  return result;
};

export const copyToClipboard = (text: string, setCopied: any) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    })
    .catch((err) => console.error('Could not copy text: ', err));
};

export const calculateSubmenuCount = (menu, user) => {
  let submenuCount = -1;

  if (menu.options.length > 0) {
    menu.options.forEach((submenu) => {
      const hasPermission = submenu.permissions.some((permission) =>
        user?.adminPermissions?.includes(permission)
      );
      if (hasPermission) {
        submenuCount++;
      }
    });
  } else {
    submenuCount++;
  }

  return submenuCount;
};
