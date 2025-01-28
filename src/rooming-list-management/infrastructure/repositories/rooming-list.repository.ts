import { db } from "@/drizzle/db";
import { rfp, roomingList, roomingListBookings } from "@/drizzle/schema";
import { IRoomingListRepository } from "@/src/rooming-list-management/application/repositories/rooming-list.repository.interface";
import { RoomingListWithEvent } from "@/src/rooming-list-management/entities/models/rooming-list";
import { and, count, eq, ilike, inArray, max, min, or } from "drizzle-orm";

export class RoomingListRepository implements IRoomingListRepository {
  async getRoomingLists(
    query: string,
    statusFilter: number[]
  ): Promise<RoomingListWithEvent[]> {
    try {
      return (await db
        .select({
          id: roomingList.id,
          status_id: roomingList.status_id,
          rfp_id: roomingList.rfp_id,
          cutoff_date: roomingList.cutoff_date,
          bookings: count(roomingListBookings.rooming_list_id),
          min_booking_date: min(roomingListBookings.booking_date),
          max_booking_date: max(roomingListBookings.booking_date),
          platform_id: roomingList.platform_id,
          hotel_id: roomingList.hotel_id,
          created_at: roomingList.created_at,
          modified_at: roomingList.modified_at,
          drl_rfp: {
            rfp_launchpad_id: rfp.rfp_launchpad_id!,
            event_name: rfp.event_name!,
            event_internal_name: rfp.event_internal_name!,
            event_start_date: rfp.event_start_date!,
            event_end_date: rfp.event_end_date!,
            agreement_type: rfp.agreement_type!,
            agreement_path: rfp.agreement_path!,
          }!,
        })
        .from(roomingList)
        .leftJoin(rfp, eq(roomingList.rfp_id, rfp.id))
        .leftJoin(
          roomingListBookings,
          eq(roomingList.id, roomingListBookings.rooming_list_id)
        )
        .where(
          and(
            or(
              ilike(rfp.event_name, `%${query}%`),
              ilike(rfp.event_internal_name, `%${query}%`),
              ilike(rfp.agreement_type, `%${query}%`)
            ),
            statusFilter.length
              ? inArray(roomingList.status_id, statusFilter)
              : undefined
          )
        )
        .groupBy(
          rfp.event_name,
          rfp.event_internal_name,
          rfp.agreement_type,
          rfp.agreement_path,
          rfp.event_start_date,
          rfp.event_end_date,
          roomingList.id,
          rfp.rfp_launchpad_id
        )
        .orderBy(rfp.event_name)) as RoomingListWithEvent[];
    } catch (err) {
      throw err;
    }
  }
}
