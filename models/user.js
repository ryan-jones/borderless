const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  nationality: String,
  position: String,
  location: String,
  role: {
    	type: String,
    	enum : ['USER', 'COMPANY', 'ADMIN'],
    	default : 'USER'
  	}
	}, {
  	timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
	}
);


const User = mongoose.model("User", userSchema);


module.exports = User;
