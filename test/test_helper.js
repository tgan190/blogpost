const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/users_test')

  mongoose.connection
    .once('open', () => { console.log('db connected'); done();})
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

beforeEach((done) => {
  const ptype= mongoose.connection;
  const { users, comments, blogposts } = mongoose.connection;
  console.log('dropping collections');
  ptype.dropCollection('users',() => {
    ptype.dropCollection('comments',() => {
      ptype.dropCollection('blogposts',() => {
        done();  
      });
    });

  });

  // const { users, comments, blogposts } = mongoose.connection.collections;
  // users.drop(() => {
  //   comments.drop(() => {
  //     blogposts.drop(() => {
  //       done();
  //     });
  //   });
  // });

});

after (() => {
  mongoose.connection.close();
});
