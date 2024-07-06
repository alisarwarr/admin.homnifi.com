import moment from 'moment';

export const formattedDate = (dateString: string) => {
  return moment(dateString).format('MMMM Do YYYY, h:mm A');
};

export const CapitalizeFirstLetter = (string: any) => {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1).toLowerCase();
};

export const getTableIndexNumber = (page: number, index: number, limit: number) => {
  return (page - 1) * limit + (index + 1);
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
      const hasPermission = submenu.permissions.some((permission) => user?.adminPermissions?.includes(permission));
      if (hasPermission) {
        submenuCount++;
      }
    });
  } else {
    submenuCount++;
  }

  return submenuCount;
};
