import { Router } from "express";
import { isValidObjectId } from "mongoose";

import Booking, { IBooking } from "../models/booking.model";
import Slot from "../models/slot.model";

const router = Router();

router.post("/", async (req, res) => {
  // #swagger.description = 'Create booking by slot id'
  // #swagger.requestBody = { required: true, schema: { $ref: "#/definitions/booking_post_req" } }

  try {
    const booking: IBooking = req?.body;

    if (!booking?.slotId || !isValidObjectId(booking.slotId)) {
      return res.sendStatus(400);
    }

    const { clientName, services, location, phone } = booking || {};

    const slot = await Slot.findById(booking.slotId);
    if (!slot || !slot.isFree) {
      return res.status(400).send("Slot not found or booked");
    }

    const bookingRecord = new Booking({
      slotId: booking.slotId,
      clientName,
      services,
      location,
      phone,
    });

    await bookingRecord.validate();

    await bookingRecord.save();

    slot.isFree = false;
    await slot.save();

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(JSON.stringify(err));
  }
});

export default router;
