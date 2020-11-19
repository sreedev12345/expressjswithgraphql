const user = require('./user.js');
var graphqlResolver = {
  createUser: async args=>{
  	const newuser = new user ({
  		username : args.username
  	})
  	const data = await newuser.save();
  	return data;
  },
  users: async() =>{
  	const find = await user.find({})
  	console.log('sreedev',find);
  	return find
  },
  updateUser:async (args)=>{
  	console.log(args)
  }
};


module.exports = graphqlResolver;