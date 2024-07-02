export const roles = new Map([
  ["ADMIN", "2"],
  ["SUPERADMIN", "1"],
]);

export const reverseRoles = new Map([
  ["2", "ADMIN"],
  ["1", "SUPERADMIN"],
]);
  
  export const roleLists = Array.from(roles.keys());
  