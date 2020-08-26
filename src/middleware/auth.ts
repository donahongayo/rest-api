import jwt from 'jsonwebtoken';
import koa from 'koa';

const username = 'hello';
const password = 'donah';
const secret = `${username}` + ':' + `${password}`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const authenticateJWT = (req: koa.Request, next: koa.Next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log(token);
    jwt.verify(token, secret, (err) => {
      if (err) {
        console.log(err);

        return false;
      }
      return true;
      next();
    });
  } else {
    return false;
  }
};

export default authenticateJWT;
