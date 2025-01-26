CREATE TABLE "DRL_Hotel" (
	"id" serial PRIMARY KEY NOT NULL,
	"connect_id" integer,
	"name" text,
	"chain" varchar,
	"zipcode" integer,
	"lng" double precision,
	CONSTRAINT "DRL_Hotel_connect_id_unique" UNIQUE("connect_id")
);
--> statement-breakpoint
CREATE TABLE "DRL_Platform" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "DRL_Rfp" (
	"id" serial PRIMARY KEY NOT NULL,
	"rfp_launchpad_id" varchar,
	"event_name" text NOT NULL,
	"event_internal_name" text NOT NULL,
	"event_start_date" timestamp NOT NULL,
	"event_end_date" timestamp NOT NULL,
	"agreement_type" text NOT NULL,
	"agreement_path" varchar NOT NULL,
	CONSTRAINT "DRL_Rfp_rfp_launchpad_id_unique" UNIQUE("rfp_launchpad_id")
);
--> statement-breakpoint
CREATE TABLE "DRL_Rooming_List" (
	"id" serial PRIMARY KEY NOT NULL,
	"rfp_id" integer NOT NULL,
	"status_id" integer NOT NULL,
	"platform_id" integer NOT NULL,
	"hotel_id" integer NOT NULL,
	"cutoff_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "DRL_Rooming_List_Bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"rooming_list_id" integer NOT NULL,
	"hotel_confirmation_code" varchar,
	"booking_external_id" serial NOT NULL,
	"primary_guest" varchar,
	"roommates" varchar,
	"guests" integer,
	"hotel_name" varchar,
	"room_name" varchar,
	"check_in" timestamp NOT NULL,
	"check_out" timestamp NOT NULL,
	"total_nights" integer,
	"order_id" varchar,
	"notes" varchar,
	"crewfare_confirmation_code" varchar,
	"room_external_id" varchar
);
--> statement-breakpoint
CREATE TABLE "DRL_Status" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "DRL_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"hotel_id" integer,
	"email" varchar
);
--> statement-breakpoint
ALTER TABLE "DRL_Rooming_List" ADD CONSTRAINT "DRL_Rooming_List_rfp_id_DRL_Rfp_id_fk" FOREIGN KEY ("rfp_id") REFERENCES "public"."DRL_Rfp"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DRL_Rooming_List" ADD CONSTRAINT "DRL_Rooming_List_status_id_DRL_Status_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."DRL_Status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DRL_Rooming_List" ADD CONSTRAINT "DRL_Rooming_List_platform_id_DRL_Platform_id_fk" FOREIGN KEY ("platform_id") REFERENCES "public"."DRL_Platform"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DRL_Rooming_List" ADD CONSTRAINT "DRL_Rooming_List_hotel_id_DRL_Hotel_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."DRL_Hotel"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DRL_Rooming_List_Bookings" ADD CONSTRAINT "DRL_Rooming_List_Bookings_rooming_list_id_DRL_Rooming_List_id_fk" FOREIGN KEY ("rooming_list_id") REFERENCES "public"."DRL_Rooming_List"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DRL_user" ADD CONSTRAINT "DRL_user_hotel_id_DRL_Hotel_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."DRL_Hotel"("id") ON DELETE no action ON UPDATE no action;