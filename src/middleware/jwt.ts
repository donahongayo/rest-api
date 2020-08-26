import jwt from 'jsonwebtoken';

const username = 'hello';
const password = 'donah';

const secret = `${username}` + ':' + `${password}`;

const token = jwt.sign(
  {
    username: 'donah',
  },
  secret
);

export default token;
