import { sign } from 'jsonwebtoken';

export enum Role {
  Basic = 'basic',
  Premium = 'premium',
}

const users = [
  {
    id: 123,
    role: 'basic',
    name: 'Basic Thomas',
    username: 'basic-thomas',
    password: 'sR-_pcoow-27-6PAwCD8',
  },
  {
    id: 434,
    role: 'premium',
    name: 'Premium Jim',
    username: 'premium-jim',
    password: 'GBLtTyq3E_UNjFnpo9m6',
  },
];

export const getUserByRole = (role: Role) => users.find((u) => u.role === role);

export const createJWT = (role: Role): string => {
  const user = getUserByRole(role);

  return sign(
    {
      userId: user.id,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      issuer: 'https://www.netguru.com/',
      subject: `${user.id}`,
      expiresIn: 30 * 60,
    },
  );
};
