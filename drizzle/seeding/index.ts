import { RoomingListByEvent } from "@/src/rooming-list-management/entities/models/rooming-list";
import { db } from "../db";
import {
  hotel,
  platform,
  rfp,
  roomingList,
  roomingListBookings,
  status,
} from "../schema";
import test_data from "./test-data.json";

import { RoomingListBookings } from "@/src/rooming-list-management/entities/models/rooming-list-bookings";
import { eq } from "drizzle-orm";

type SeedData = Array<
  RoomingListByEvent & {
    drl_rooming_list_bookings: RoomingListBookings[];
  }
>;

const seedData = async (jsonData: SeedData) => {
  try {
    const statusData = await db.select().from(status).where(eq(status.id, 1));

    if (statusData.length === 0) {
      await db.insert(status).values([
        { id: 1, name: "received" },
        { id: 2, name: "completed" },
        { id: 3, name: "archived" },
        { id: 4, name: "updated" },
      ]);
    }

    for (const data of jsonData) {
      const rfpData = data.drl_rfp;
      const rfpRecord = await db
        .select()
        .from(rfp)
        .where(eq(rfp.rfp_launchpad_id, rfpData.rfp_launchpad_id));
      if (rfpRecord.length === 0) {
        await db.insert(rfp).values({
          id: data.rfp_id,
          rfp_launchpad_id: rfpData.rfp_launchpad_id,
          event_name: rfpData.event_name,
          event_internal_name: rfpData.event_internal_name,
          event_start_date: new Date(rfpData.event_start_date),
          event_end_date: new Date(rfpData.event_end_date),
          agreement_type: rfpData.agreement_type,
          agreement_path: rfpData.agreement_path,
        });
      }

      const hotelRecord = await db
        .select()
        .from(hotel)
        .where(eq(hotel.id, data.hotel_id));
      if (hotelRecord.length === 0) {
        await db.insert(hotel).values({
          id: data.hotel_id,
          name: `Hotel ${data.hotel_id}`,
        });
      }

      const platformRecord = await db
        .select()
        .from(platform)
        .where(eq(platform.id, data.platform_id));
      if (platformRecord.length === 0) {
        await db.insert(platform).values({
          id: data.platform_id,
          name: `Platform ${data.platform_id}`,
        });
      }

      const roomingListId = await db
        .insert(roomingList)
        .values({
          id: data.id,
          rfp_id: data.rfp_id,
          status_id: data.status_id,
          platform_id: data.platform_id,
          hotel_id: data.hotel_id,
          cutoff_date: new Date(data.cutoff_date),
          created_at: new Date(data.created_at),
          modified_at: new Date(data.modified_at),
        })
        .returning({ id: roomingList.id });

      for (const booking of data.drl_rooming_list_bookings) {
        const checkIn = new Date(booking.check_in);
        const checkOut = new Date(booking.check_out);
        const totalNights = Math.ceil(
          (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
        );

        await db.insert(roomingListBookings).values({
          rooming_list_id: roomingListId[0].id,
          primary_guest: booking.primary_guest,
          roommates: booking.roommates,
          guests: booking.guests,
          room_name: booking.room_name,
          check_in: checkIn,
          check_out: checkOut,
          total_nights: totalNights,
          room_external_id: booking.room_code,
        });
      }
    }

    console.log("Data seeded successfully");
  } catch (err: unknown) {
    throw new Error(`seed already executed: ${err} `);
  }
};

(async () => {
  await seedData(test_data as unknown as SeedData);
})();
