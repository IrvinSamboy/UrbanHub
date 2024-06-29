import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    admin: {
      type: Boolean,
      default: false
    },
    saved: [],
    photo: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    admin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("users", UserSchema)

export default UserModel