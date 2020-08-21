import Router from 'koa-router';
import User from '../models/User';
import KoaAuth from 'koa-basic-auth';
import mJwt from '../middleware/jwt';
import auth from '../middleware/auth';

const router = new Router();
const username = 'hello';
const password = 'donah';

router.post(
  '/api/auth',
  KoaAuth({ name: username, pass: password }),
  async (ctx) => {
    //console.log('token: ' + mJwt);
    ctx.body = {
      token: mJwt,
    };
  },
);

router.get('/api/users', async (ctx) => {
  await User.find()
    .then((data) => {
      ctx.body = data;
    })
    .catch((err) => {
      ctx.body = 'error ' + err;
    });
});

router.get('/api/user/:id', async (ctx) => {
  await User.findOne({ _id: ctx.params.id })
    .then((users) => {
      if (users) {
        ctx.body = users;
      } else {
        ctx.body = 'No data available';
      }
    })
    .catch((err) => {
      ctx.body = 'error ' + err;
    });
});

router.post('/api/users', async (ctx) => {
  await User.create(ctx.request.body)
    .then((data) => {
      ctx.body = {
        id: data.id,
        email: data.email,
        name: data.name,
      };
    })
    .catch((err) => {
      ctx.body = 'error ' + err;
    });
});

router.patch('/api/user/:id', async (ctx) => {
  const documentQuery = { _id: ctx.params.id };
  const valuesToUpdate = ctx.request.body;
  await User.updateOne(documentQuery, valuesToUpdate)
    .then(() => {
      ctx.body = {
        _id: ctx.params.id,
        email: ctx.request.body.email,
        name: ctx.request.body.name,
      };
    })
    .catch((err) => {
      ctx.body = 'ersror ' + err;
    });
});

export default router;
