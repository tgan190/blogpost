const mongoose = require ('mongoose');
const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe, maria, alex, zach;

  
  beforeEach((done) => {  
    alex = new User({ name: 'Alex' });
    joe = new User({ name: 'Joe' });
    maria = new User({ name: 'Maria' });
    zach = new User({ name: 'Zach' });
    console.log('inserting new records');
    Promise.all([joe.save(), alex.save(), maria.save(), zach.save()])
      .then(() => done());
  });

  it('finds all users with a name of joe', (done) => {    
    // var query = User.find({ name: 'Joe' });
    // User.find({ name: 'Joe' }, function (err, users) {
    User.find({ name: 'Joe' }).then(users => {
      console.log('joe: ',joe._id);
      console.log(users);
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
      
        
        // assert(users[0]._id.toString() === joe._id.toString());
       // assert(users[0].name === joe.name);
         
        // assert(users[0].name === joe.name);
        // done();
        // done();
        // console.log('toString of _id: ' + users[0]._id.toString());
          
  
    // query.select('_id name');
    // query.exec(function (err, users) {
    //   if (err) {
    //     console.log('error: ', err); 
    //   } else {
    //     console.log('joe: ',joe._id);
    //     console.log(users);
    //     assert(users[0]._id.toString() === joe._id.toString());
    //   }
    //   done();
    // });
    // query.exec()
    //   .then((users) => {
    //     assert(users[0]._id.toString() === joe._id.toString());
    //     done();
    //   }).catch ('err', () => {console.log('error: ', err); done();});
  });

  it('find a user with a particular id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user._id.toString() === joe._id.toString());
        done();
      });
  });

  it('can skip and limit the result set', (done) => {
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Maria');
        done();
      });
  });
});
