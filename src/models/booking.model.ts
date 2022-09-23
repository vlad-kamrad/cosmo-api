import { Schema } from "mongoose";
import connection from "../config/db";

export interface IBooking {
  slotId: Schema.Types.ObjectId;
  clientName: string;
  services: String;
  location: String;
  phone: String;
}

const BookingModelSchema = new Schema<IBooking>({
  slotId: { type: Schema.Types.ObjectId, required: true },
  clientName: { type: String, required: true },
  services: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
});

const Booking = connection.model<IBooking>("Booking", BookingModelSchema);

export default Booking;
