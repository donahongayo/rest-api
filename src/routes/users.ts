import Router from 'koa-router';
import User from '../models/User';

export default (router: Router) => {
  router
    .get('/api/users', async (ctx) => {
      ctx.body = await User.find({});
    })
    .post('api/users', async (ctx) => {
      ctx.body = await User.create({
        email: ctx.request.body.email,
        password: ctx.request.body.password,
        name: ctx.request.body.name,
      });
    })
    .get('/api/users/:id', async (ctx) => {
      let user;

      if (ctx.params.id.length <= 2) {
        const id = Number.parseInt(ctx.params.id);
        user = await User.findOne({})
          .skip(id - 1)
          .limit(1);
      } else {
        user = await User.findById(ctx.params.id);
      }

      if (user) {
        ctx.body = {
          id: user._id,
          name: user.name,
          email: user.email,
        };
      }
    })
    .put('/api/users/:id', async (ctx) => {
      const user = await User.findByIdAndUpdate(
        ctx.params.id,
        { name: ctx.request.body.name },
        { new: true, runValidators: true }
      );
      if (user) {
        ctx.body = user;
      }
    })
    .delete('/api/users/:id', async (ctx) => {
      const user = await User.findByIdAndRemove(ctx.params.id);
      if (user) {
        ctx.status = 204;
      }
    });
};
