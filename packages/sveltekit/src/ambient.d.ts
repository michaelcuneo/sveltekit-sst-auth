type Mailer = {
  email: string,
  token: string,
  service: string,
  host: string,
  port: number,
  username: string,
  password: string,
}

type User = {
  id: string,
  email: string,
};

type UserLookup = {
  id: string,
}

type Session = {
  id: string,
  userId: string,
};

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    user: User;
    userId: string;
  };
};
