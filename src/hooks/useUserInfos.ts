const loggedUser = function getUserFromSessionStorage(): string | null {
  return sessionStorage.getItem('user');
}

export default function getUserName() {
  const userObject = loggedUser();
  if (!userObject) return { fullName: "Default User", avatarInitials: "" };

  const user = JSON.parse(userObject).message;

  const fullName = user.split('@')[0];

  const avatarInitials = fullName.length >= 2 ? fullName.substring(0, 2).toUpperCase() : fullName.toUpperCase();

  return { fullName, avatarInitials };
}
