import { Router } from "express";
import { isValidObjectId } from "mongoose";

import { authenticateToken as authorized } from "../middlewares/auth";
import Slot, { ISlot } from "../models/slot.model";
import Booking from "../models/booking.model";

const router = Router();

router.get("/", async (req, res) => {
  // #swagger.description = 'Returns available slots for end users'
  // #swagger.responses[200] = { schema: { $ref: '#/definitions/slot_get_res' } }

  try {
    const startDay = new Date();
    startDay.setUTCHours(0, 0, 0, 0);

    const result = await Slot.find({ start: { $gte: startDay } });

    res.json(result);
  } catch (err) {
    res.status(500).send(JSON.stringify(err));
  }
});

router.get("/all", authorized, async (req, res) => {
  // #swagger.description = 'Returns all slots for admins'
  // #swagger.responses[200] = { schema: { $ref: '#/definitions/slot_get_all_res' } }

  try {
    const result = await Slot.aggregate([
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "slotId",
          as: "booking",
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).send(JSON.stringify(err));
  }
});

router.post("/", authorized, async (req, res) => {
  // #swagger.description = 'Creates empty slots by admin'
  // #swagger.responses[200] = { schema: { $ref: '#/definitions/slot_post_req' } }

  try {
    const slots: ISlot[] = req?.body?.slots;
    if (!slots?.length) {
      return res.sendStatus(400);
    }

    const slotModels = slots.map(({ start, end }) => new Slot({ start, end }));

    await Slot.bulkSave(slotModels);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(JSON.stringify(err));
  }
});

// TODO: Change this on url
router.delete("/", authorized, async (req, res) => {
  // #swagger.description = 'Removes slot by admin'
  // #swagger.responses[200] = { schema: { $ref: '#/definitions/slot_delete_req' } }

  try {
    const slotId = req?.body?.slotId;

    if (!slotId || !isValidObjectId(slotId)) {
      return res.sendStatus(400);
    }

    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(400).send("Slot not found");
    }

    if (!slot.isFree) {
      const booking = await Booking.findOne({ slotId: slotId });

      if (booking) {
        await booking.remove();
      }
    }

    await slot.remove();

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(JSON.stringify(err));
  }
});

export default router;
