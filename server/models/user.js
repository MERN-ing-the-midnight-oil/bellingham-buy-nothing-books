const mongoose = require("mongoose");
const Book = require("./book");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	// Ensure other fields like email, street1, street2, and zipCode are removed if not needed
	lendingLibrary: [Book.schema],
	borrowedBooks: [Book.schema],
	requestedBooks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
		},
	],
	communities: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Community",
		},
	],
});

module.exports = mongoose.model("User", UserSchema);
