CREATE TABLE "Bookings" (
	"bookingId" serial PRIMARY KEY NOT NULL,
	"hotelId" integer NOT NULL,
	"eventId" integer NOT NULL,
	"guestName" varchar NOT NULL,
	"guestPhoneNumber" varchar NOT NULL,
	"checkInDate" timestamp NOT NULL,
	"checkOutDate" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Rooming_Lists" (
	"roomingListId" serial PRIMARY KEY NOT NULL,
	"eventId" integer NOT NULL,
	"eventName" text NOT NULL,
	"hotelId" integer NOT NULL,
	"rfpName" text NOT NULL,
	"cutOffDate" timestamp NOT NULL,
	"status" varchar NOT NULL,
	"agreement_type" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Rooming_List_Bookings" (
	"roomingListId" integer NOT NULL,
	"bookingId" integer NOT NULL,
	CONSTRAINT "Rooming_List_Bookings_bookingId_roomingListId_pk" PRIMARY KEY("bookingId","roomingListId")
);
--> statement-breakpoint
ALTER TABLE "Rooming_List_Bookings" ADD CONSTRAINT "Rooming_List_Bookings_roomingListId_Rooming_Lists_roomingListId_fk" FOREIGN KEY ("roomingListId") REFERENCES "public"."Rooming_Lists"("roomingListId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Rooming_List_Bookings" ADD CONSTRAINT "Rooming_List_Bookings_bookingId_Bookings_bookingId_fk" FOREIGN KEY ("bookingId") REFERENCES "public"."Bookings"("bookingId") ON DELETE no action ON UPDATE no action;