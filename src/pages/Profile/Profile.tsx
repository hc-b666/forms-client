interface IProfile {
  user: IUserProfile;
}

export function Profile({ user }: IProfile) {
  return (
    <div className="col-span-1">
      <h3>{user.firstName} {user.lastName}</h3>
      <h3>Email: {user.email}</h3>
      <h3>Username: {user.username}</h3>
    </div>
  );
}
