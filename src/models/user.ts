import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      
    },
    carBrand: {
      type: String,
    },
    carLicencePlate: {
      type: String,
    },
    rides: [{ type: mongoose.Schema.Types.ObjectId, ref: "ride" }],
  },
  { timestamps: true }
);

const User = models.user || mongoose.model("user", UserSchema);

export default User;
