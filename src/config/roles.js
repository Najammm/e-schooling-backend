const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'headerInformation', 'carousal', 'stats', 'faq', 'info', 'instructor'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
