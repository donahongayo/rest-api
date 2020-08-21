import jwt from 'jsonwebtoken';

const username = 'hello';
const password = 'donah';
const secret = Buffer.from(`${username}` + ':' + `${password}`).toString(
  'base64',
);

export default jwt.sign({ sub: 1 }, secret);
