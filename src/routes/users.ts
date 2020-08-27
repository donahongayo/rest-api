import Router from 'koa-router';
import User from '../models/User';
import KoaAuth from 'koa-basic-auth';
import mJwt from '../middleware/jwt';
import config from '../config/config';
import authenticateJWT from '../middleware/auth';

const router = new Router();

router.post(
  '/api/auth',
  KoaAuth({ name: config.username, pass: config.password }),
  async (ctx) => {
    ctx.body = {
      token: mJwt,
    };
  }
);

router.get('/api/users', authenticateJWT, async (ctx) => {
  await User.find()
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

router.get('/api/user/:id', authenticateJWT, async (ctx) => {
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
    .then((users) => {
      ctx.body = {
        id: users.id,
        email: users.email,
        name: users.name,
      };
    })
    .catch((err) => {
      ctx.body = 'error ' + err;
    });
});

router.patch('/api/user/:id', authenticateJWT, async (ctx) => {
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
