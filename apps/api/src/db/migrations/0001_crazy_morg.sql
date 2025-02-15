ALTER TABLE "Rooming_List_Bookings" DROP CONSTRAINT "Rooming_List_Bookings_roomingListId_Rooming_Lists_roomingListId_fk";
--> statement-breakpoint
ALTER TABLE "Rooming_List_Bookings" DROP CONSTRAINT "Rooming_List_Bookings_bookingId_Bookings_bookingId_fk";
--> statement-breakpoint
ALTER TABLE "Rooming_List_Bookings" ADD CONSTRAINT "Rooming_List_Bookings_roomingListId_Rooming_Lists_roomingListId_fk" FOREIGN KEY ("roomingListId") REFERENCES "public"."Rooming_Lists"("roomingListId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Rooming_List_Bookings" ADD CONSTRAINT "Rooming_List_Bookings_bookingId_Bookings_bookingId_fk" FOREIGN KEY ("bookingId") REFERENCES "public"."Bookings"("bookingId") ON DELETE cascade ON UPDATE no action;