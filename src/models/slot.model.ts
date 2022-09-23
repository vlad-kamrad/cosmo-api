import { Schema } from "mongoose";
import connection from "../config/db";

export interface ISlot {
  start: Date;
  end: Date;
  isFree: Boolean;
}

const SlotSchema = new Schema<ISlot>({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  isFree: { type: Boolean, default: true },
});

const Slot = connection.model<ISlot>("Slot", SlotSchema);

export default Slot;
