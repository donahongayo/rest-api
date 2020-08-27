import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src';
import config from '../src/config/config';
import mJwt from '../src/middleware/jwt';

const should = chai.should();
chai.use(chaiHttp);

describe('/GET', function () {
  describe('Get All Users', function () {
    it('should fetch all users', function (done) {
      chai
        .request(server)
        .get('/api/users')
        .set('Authorization', `Bearer ${mJwt}`)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('Get User', function () {
    it('should fetch one user', function (done) {
      chai
        .request(server)
        .get('/api/user/5f3f0bcdc122f2b339978eef')
        .set('Authorization', `Bearer ${mJwt}`)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          done();
        });
    });
  });
});

describe('/POST', function () {
  describe('Token', function () {
    it('should return token', async () => {
      const basicAuth = Buffer.from(
        `${config.username}:${config.password}`
      ).toString('base64');
      chai
        .request(server)
        .post('/api/auth')
        .set('Authorization', `Basic ${basicAuth}`)
        .send()
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
        });
    });
  });

  describe('Create user', function () {
    it('should add new user', function (done) {
      chai
        .request(server)
        .post('/api/users')
        .set('Authorization', `Bearer ${mJwt}`)
        .send({ email: 'user@email.com', password: 'password', name: 'myname' })
        .set('Accept', 'application/json')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('Update user', function () {
    it('should update user', function (done) {
      chai
        .request(server)
        .patch('/api/user/5f3f0bcdc122f2b339978eef')
        .send({ name: 'user', password: 'password' })
        .set('Authorization', `Bearer ${mJwt}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          done();
        });
    });
  });
});
