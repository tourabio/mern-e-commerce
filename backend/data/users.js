import bycrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bycrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Brad',
    email: 'Brad@example.com',
    password: bycrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'Jane@example.com',
    password: bycrypt.hashSync('123456', 10),
  },
]
export default users
