import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const MintAddressesSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const MintAddresses =
  mongoose.models.MintAddresses ||
  mongoose.model("MintAddresses", MintAddressesSchema);

export default MintAddresses;
