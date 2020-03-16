const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavouritesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = FavouritesSchema = mongoose.model(
  "favourites",
  FavouritesSchema
);
