const expect = require('chai').expect;
const request = require('supertest');

describe('GET /notes', () => {
  it('should get all notes saved', (done) => {
    request('http://localhost:3000').get('/notes')
      .then((res) => {
        const body = res.body;
        expect(body.length).to.not.equal(0);
        done();
      })
      .catch((err) => done(err));
  });

  it('should create a new note', (done) => {
    request('http://localhost:3000').post('/notes')
      .send({ title: 'NOTE', content: "AAA" })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('title');
        expect(body).to.contain.property('content');
        done();
      })
      .catch((err) => done(err));
  });

  it('should require content to create a note', (done) => {
    request('http://localhost:3000').post('/notes')
      .send({ title: 'NOTE' })
      .then((res) => {
        const body = res.body;
        expect(body.message)
          .to.equal('Note content can not be empty')
        done();
      })
      .catch((err) => done(err));
  });
})
