var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('kv_controller', function() {

    describe('GET /object', function() {

      it('should return a default string', function(done) {

        request(server)
          .get('/object')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            console.log(res);
            res.body.should.eql('Hello, stranger!');

            done();
          });
      });

      // it('should accept a name parameter', function(done) {

      //   request(server)
      //     .get('/hello')
      //     .query({ name: 'Scott'})
      //     .set('Accept', 'application/json')
      //     .expect('Content-Type', /json/)
      //     .expect(200)
      //     .end(function(err, res) {
      //       should.not.exist(err);

      //       res.body.should.eql('Hello, Scott!');

      //       done();
      //     });
      // });

    });

  });

});
