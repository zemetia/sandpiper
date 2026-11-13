import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_pages_blocks_home_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_home_hero_links_link_appearance" AS ENUM('primary', 'outline', 'link');
  CREATE TYPE "public"."enum_pages_blocks_home_hero_order_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_menu_board_menu_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_plate_parade_source" AS ENUM('featured', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_coffee_orbit_note_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_mural_story_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_gram_wall_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_review_thread_reviews_tone" AS ENUM('paper', 'blue', 'sunny');
  CREATE TYPE "public"."enum_pages_blocks_sun_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_catering_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_catering_hero_links_link_appearance" AS ENUM('primary', 'outline', 'link');
  CREATE TYPE "public"."enum_pages_blocks_catering_hero_facts_icon" AS ENUM('timer', 'users', 'truck', 'briefcase', 'party', 'graduation', 'coffee', 'sandwich', 'croissant', 'calendar', 'leaf', 'heart', 'star');
  CREATE TYPE "public"."enum_pages_blocks_catering_use_cases_cases_icon" AS ENUM('timer', 'users', 'truck', 'briefcase', 'party', 'graduation', 'coffee', 'sandwich', 'croissant', 'calendar', 'leaf', 'heart', 'star');
  CREATE TYPE "public"."enum_pages_blocks_gift_card_hero_buy_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_gift_card_hero_balance_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_gift_card_steps_steps_icon" AS ENUM('card', 'mail', 'coffee', 'gift', 'search', 'heart');
  CREATE TYPE "public"."enum_pages_blocks_gift_card_panels_panels_tone" AS ENUM('sunny', 'paper');
  CREATE TYPE "public"."enum_pages_blocks_gift_card_panels_panels_icon" AS ENUM('card', 'mail', 'coffee', 'gift', 'search', 'heart');
  CREATE TYPE "public"."enum_pages_blocks_gift_card_panels_panels_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_about_kitchen_pillars_icon" AS ENUM('sandwich', 'utensils', 'coffee', 'croissant', 'phone', 'mail', 'pin', 'instagram', 'sunrise', 'clock', 'bike', 'bag', 'handHeart', 'heart', 'star');
  CREATE TYPE "public"."enum_pages_blocks_about_team_members_tone" AS ENUM('blue', 'berry');
  CREATE TYPE "public"."enum_pages_blocks_about_team_hiring_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_about_closing_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_about_closing_links_link_appearance" AS ENUM('primary', 'outline', 'link');
  CREATE TYPE "public"."enum_pages_blocks_contact_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_contact_hero_links_link_appearance" AS ENUM('primary', 'outline', 'link');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_details_icon" AS ENUM('sandwich', 'utensils', 'coffee', 'croissant', 'phone', 'mail', 'pin', 'instagram', 'sunrise', 'clock', 'bike', 'bag', 'handHeart', 'heart', 'star');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_callout_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_contact_find_facts_icon" AS ENUM('sandwich', 'utensils', 'coffee', 'croissant', 'phone', 'mail', 'pin', 'instagram', 'sunrise', 'clock', 'bike', 'bag', 'handHeart', 'heart', 'star');
  CREATE TYPE "public"."enum_pages_blocks_contact_find_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_order_hero_menu_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_order_choices_delivery_apps_app" AS ENUM('doordash', 'ubereats', 'grubhub');
  CREATE TYPE "public"."enum_pages_blocks_order_choices_pickup_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_menu_browser_pickup_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_menu_browser_delivery_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_links_link_appearance" AS ENUM('primary', 'outline', 'link');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('split', 'fullBleed', 'minimal');
  CREATE TYPE "public"."enum_pages_blocks_content_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_media_content_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_media_content_links_link_appearance" AS ENUM('primary', 'outline', 'link');
  CREATE TYPE "public"."enum_pages_blocks_media_content_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_menu_highlights_source" AS ENUM('featured', 'category', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('primary', 'outline', 'link');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_home_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_home_hero_links_link_appearance" AS ENUM('primary', 'outline', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_home_hero_order_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_menu_board_menu_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_plate_parade_source" AS ENUM('featured', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_coffee_orbit_note_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_mural_story_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_gram_wall_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_review_thread_reviews_tone" AS ENUM('paper', 'blue', 'sunny');
  CREATE TYPE "public"."enum__pages_v_blocks_sun_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_catering_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_catering_hero_links_link_appearance" AS ENUM('primary', 'outline', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_catering_hero_facts_icon" AS ENUM('timer', 'users', 'truck', 'briefcase', 'party', 'graduation', 'coffee', 'sandwich', 'croissant', 'calendar', 'leaf', 'heart', 'star');
  CREATE TYPE "public"."enum__pages_v_blocks_catering_use_cases_cases_icon" AS ENUM('timer', 'users', 'truck', 'briefcase', 'party', 'graduation', 'coffee', 'sandwich', 'croissant', 'calendar', 'leaf', 'heart', 'star');
  CREATE TYPE "public"."enum__pages_v_blocks_gift_card_hero_buy_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_gift_card_hero_balance_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_gift_card_steps_steps_icon" AS ENUM('card', 'mail', 'coffee', 'gift', 'search', 'heart');
  CREATE TYPE "public"."enum__pages_v_blocks_gift_card_panels_panels_tone" AS ENUM('sunny', 'paper');
  CREATE TYPE "public"."enum__pages_v_blocks_gift_card_panels_panels_icon" AS ENUM('card', 'mail', 'coffee', 'gift', 'search', 'heart');
  CREATE TYPE "public"."enum__pages_v_blocks_gift_card_panels_panels_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_about_kitchen_pillars_icon" AS ENUM('sandwich', 'utensils', 'coffee', 'croissant', 'phone', 'mail', 'pin', 'instagram', 'sunrise', 'clock', 'bike', 'bag', 'handHeart', 'heart', 'star');
  CREATE TYPE "public"."enum__pages_v_blocks_about_team_members_tone" AS ENUM('blue', 'berry');
  CREATE TYPE "public"."enum__pages_v_blocks_about_team_hiring_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_about_closing_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_about_closing_links_link_appearance" AS ENUM('primary', 'outline', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_hero_links_link_appearance" AS ENUM('primary', 'outline', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_details_icon" AS ENUM('sandwich', 'utensils', 'coffee', 'croissant', 'phone', 'mail', 'pin', 'instagram', 'sunrise', 'clock', 'bike', 'bag', 'handHeart', 'heart', 'star');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_callout_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_find_facts_icon" AS ENUM('sandwich', 'utensils', 'coffee', 'croissant', 'phone', 'mail', 'pin', 'instagram', 'sunrise', 'clock', 'bike', 'bag', 'handHeart', 'heart', 'star');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_find_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_order_hero_menu_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_order_choices_delivery_apps_app" AS ENUM('doordash', 'ubereats', 'grubhub');
  CREATE TYPE "public"."enum__pages_v_blocks_order_choices_pickup_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_menu_browser_pickup_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_menu_browser_delivery_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_link_appearance" AS ENUM('primary', 'outline', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('split', 'fullBleed', 'minimal');
  CREATE TYPE "public"."enum__pages_v_blocks_content_width" AS ENUM('narrow', 'wide');
  CREATE TYPE "public"."enum__pages_v_blocks_media_content_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_media_content_links_link_appearance" AS ENUM('primary', 'outline', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_media_content_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_menu_highlights_source" AS ENUM('featured', 'category', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('primary', 'outline', 'link');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_menu_items_tags" AS ENUM('signature', 'new', 'vegan', 'vegetarian', 'glutenFree', 'dairyFree', 'spicy', 'nuts');
  CREATE TYPE "public"."enum_menu_items_availability" AS ENUM('available', 'soldOut', 'seasonal');
  CREATE TYPE "public"."enum_menu_items_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__menu_items_v_version_tags" AS ENUM('signature', 'new', 'vegan', 'vegetarian', 'glutenFree', 'dairyFree', 'spicy', 'nuts');
  CREATE TYPE "public"."enum__menu_items_v_version_availability" AS ENUM('available', 'soldOut', 'seasonal');
  CREATE TYPE "public"."enum__menu_items_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__menu_items_v_published_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_subscribers_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_catering_requests_fulfillment" AS ENUM('pickup', 'delivery');
  CREATE TYPE "public"."enum_catering_requests_status" AS ENUM('new', 'quoted', 'booked', 'closed');
  CREATE TYPE "public"."enum_catering_requests_locale" AS ENUM('en', 'id');
  CREATE TYPE "public"."enum_contact_messages_status" AS ENUM('new', 'replied', 'closed');
  CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TYPE "public"."enum_site_settings_socials_platform" AS ENUM('instagram', 'tiktok', 'facebook', 'x', 'youtube', 'gofood', 'grabfood');
  CREATE TYPE "public"."enum_site_settings_currency" AS ENUM('IDR', 'USD');
  CREATE TYPE "public"."enum_site_settings_announcement_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_icon" AS ENUM('home', 'bag', 'cloche', 'gift', 'info', 'mail', 'menu', 'coffee', 'pin');
  CREATE TYPE "public"."enum_header_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_cta_appearance" AS ENUM('primary', 'outline', 'link');
  CREATE TYPE "public"."enum_header_promo_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "pages_blocks_home_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_home_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_home_hero_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_home_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_home_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"menu_item_id" integer,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_home_hero_slides_locales" (
  	"pitch" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_home_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pill_image_id" integer,
  	"polaroid_image_id" integer,
  	"order_link_type" "enum_pages_blocks_home_hero_order_link_type" DEFAULT 'reference',
  	"order_link_new_tab" boolean,
  	"order_link_reference_id" integer,
  	"order_link_url" varchar,
  	"autoplay" numeric DEFAULT 7,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_home_hero_locales" (
  	"line1" varchar,
  	"line2" varchar,
  	"accent" varchar,
  	"line3" varchar,
  	"body" varchar,
  	"polaroid_caption" varchar,
  	"stamp_label" varchar,
  	"stamp_value" varchar,
  	"order_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_ribbons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_menu_board" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 5,
  	"menu_link_type" "enum_pages_blocks_menu_board_menu_link_type" DEFAULT 'reference',
  	"menu_link_new_tab" boolean,
  	"menu_link_reference_id" integer,
  	"menu_link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_menu_board_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"sticker_label" varchar,
  	"menu_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_plate_parade" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_pages_blocks_plate_parade_source" DEFAULT 'featured',
  	"limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_plate_parade_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"drag_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_coffee_orbit" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"note_link_type" "enum_pages_blocks_coffee_orbit_note_link_type" DEFAULT 'reference',
  	"note_link_new_tab" boolean,
  	"note_link_reference_id" integer,
  	"note_link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_coffee_orbit_locales" (
  	"heading_bold" varchar,
  	"heading_light" varchar,
  	"note_heading" varchar,
  	"note_link_label" varchar,
  	"seal_top" varchar,
  	"seal_middle" varchar,
  	"seal_bottom" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_mural_story_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_mural_story_callouts_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_mural_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum_pages_blocks_mural_story_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_mural_story_locales" (
  	"heading_bold" varchar,
  	"heading_light" varchar,
  	"body" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gram_wall" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"handle" varchar,
  	"link_type" "enum_pages_blocks_gram_wall_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gram_wall_locales" (
  	"subline" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_review_thread_ratings" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"score" varchar,
  	"platform" varchar
  );
  
  CREATE TABLE "pages_blocks_review_thread_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author" varchar,
  	"source" varchar,
  	"tone" "enum_pages_blocks_review_thread_reviews_tone" DEFAULT 'paper'
  );
  
  CREATE TABLE "pages_blocks_review_thread_reviews_locales" (
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_review_thread" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_review_thread_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_visit_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"map_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_visit_hours_locales" (
  	"big_text" varchar,
  	"script" varchar,
  	"address" varchar,
  	"details" varchar,
  	"directions_label" varchar,
  	"street_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_sun_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_sun_cta_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_sun_cta_locales" (
  	"side_text" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"link_label" varchar,
  	"stamp_label" varchar,
  	"stamp_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_catering_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_catering_hero_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_catering_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_hero_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_catering_hero_facts_icon" DEFAULT 'star'
  );
  
  CREATE TABLE "pages_blocks_catering_hero_facts_locales" (
  	"value" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photos_main_id" integer,
  	"photos_side_id" integer,
  	"photos_small_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_catering_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"stamp_label" varchar,
  	"stamp_value" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_ribbon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_catering_menu_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_menu_categories_items_locales" (
  	"name" varchar,
  	"price" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_menu_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_catering_menu_categories_locales" (
  	"title" varchar,
  	"short_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_catering_menu_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_use_cases_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_catering_use_cases_cases_icon" DEFAULT 'star'
  );
  
  CREATE TABLE "pages_blocks_catering_use_cases_cases_locales" (
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_use_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_catering_use_cases_locales" (
  	"heading_bold" varchar,
  	"heading_light" varchar,
  	"script" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_steps_steps_locales" (
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_catering_steps_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_quote_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_quote_faqs_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_catering_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"phone" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_catering_quote_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"call_label" varchar,
  	"call_prompt" varchar,
  	"pickup_label" varchar,
  	"pickup_address" varchar,
  	"form_title" varchar,
  	"submit_label" varchar,
  	"fine_print" varchar,
  	"success_heading" varchar,
  	"success_body" varchar,
  	"faq_heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gift_card_hero_amounts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"selected" boolean
  );
  
  CREATE TABLE "pages_blocks_gift_card_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"buy_link_type" "enum_pages_blocks_gift_card_hero_buy_link_type" DEFAULT 'reference',
  	"buy_link_new_tab" boolean,
  	"buy_link_reference_id" integer,
  	"buy_link_url" varchar,
  	"balance_link_type" "enum_pages_blocks_gift_card_hero_balance_link_type" DEFAULT 'reference',
  	"balance_link_new_tab" boolean,
  	"balance_link_reference_id" integer,
  	"balance_link_url" varchar,
  	"card_back_amount" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gift_card_hero_locales" (
  	"eyebrow" varchar,
  	"line1" varchar,
  	"line2" varchar,
  	"body" varchar,
  	"any_amount" varchar,
  	"buy_link_label" varchar,
  	"balance_link_label" varchar,
  	"card_label" varchar,
  	"card_address" varchar,
  	"tag_label" varchar,
  	"tag_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gift_card_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_gift_card_steps_steps_icon" DEFAULT 'card'
  );
  
  CREATE TABLE "pages_blocks_gift_card_steps_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gift_card_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gift_card_steps_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gift_card_panels_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_pages_blocks_gift_card_panels_panels_tone" DEFAULT 'sunny',
  	"icon" "enum_pages_blocks_gift_card_panels_panels_icon" DEFAULT 'gift',
  	"link_type" "enum_pages_blocks_gift_card_panels_panels_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_gift_card_panels_panels_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"link_label" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gift_card_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gift_card_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gift_card_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gift_card_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gift_card_faq_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_hero_polaroids" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_about_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"stamp_top" varchar,
  	"stamp_value" varchar,
  	"stamp_bottom" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_belief_plates" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"tag" varchar
  );
  
  CREATE TABLE "pages_blocks_about_belief" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_kitchen_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_pages_blocks_about_kitchen_pillars_icon" DEFAULT 'star'
  );
  
  CREATE TABLE "pages_blocks_about_kitchen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"photos_main_id" integer,
  	"photos_round_id" integer,
  	"photos_small_id" integer,
  	"stamp_top" varchar,
  	"stamp_value" varchar,
  	"stamp_bottom" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_gallery_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_about_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"name" varchar,
  	"role" varchar,
  	"tone" "enum_pages_blocks_about_team_members_tone" DEFAULT 'blue',
  	"note" varchar
  );
  
  CREATE TABLE "pages_blocks_about_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"hiring_heading" varchar,
  	"hiring_body" varchar,
  	"hiring_enable_link" boolean,
  	"hiring_link_type" "enum_pages_blocks_about_team_hiring_link_type" DEFAULT 'reference',
  	"hiring_link_new_tab" boolean,
  	"hiring_link_reference_id" integer,
  	"hiring_link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_team_locales" (
  	"hiring_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_closing_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_about_closing_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_about_closing_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_about_closing_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_closing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" varchar,
  	"heading" varchar,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_contact_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_contact_hero_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_contact_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_hero_hours_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"show_call" boolean DEFAULT true,
  	"hours_eyebrow" varchar,
  	"hours_value" varchar,
  	"photo_id" integer,
  	"caption" varchar,
  	"stamp_top" varchar,
  	"stamp_value" varchar,
  	"stamp_bottom" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_contact_form_details_icon" DEFAULT 'star',
  	"label" varchar,
  	"value" varchar,
  	"description" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"submit_label" varchar,
  	"note" varchar,
  	"success_heading" varchar,
  	"success_body" varchar,
  	"details_heading" varchar,
  	"callout_eyebrow" varchar,
  	"callout_text" varchar,
  	"callout_link_type" "enum_pages_blocks_contact_form_callout_link_type" DEFAULT 'reference',
  	"callout_link_new_tab" boolean,
  	"callout_link_reference_id" integer,
  	"callout_link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_locales" (
  	"callout_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_find_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_contact_find_facts_icon" DEFAULT 'star',
  	"title" varchar,
  	"detail" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_find" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"use_map_url" boolean DEFAULT true,
  	"link_type" "enum_pages_blocks_contact_find_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"main_photo_id" integer,
  	"side_photo_id" integer,
  	"stamp_top" varchar,
  	"stamp_value" varchar,
  	"stamp_bottom" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_find_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_order_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"eyebrow_short" varchar,
  	"line1" varchar,
  	"line2" varchar,
  	"body" varchar,
  	"toggle_pickup" varchar,
  	"toggle_delivery" varchar,
  	"menu_link_type" "enum_pages_blocks_order_hero_menu_link_type" DEFAULT 'reference',
  	"menu_link_new_tab" boolean,
  	"menu_link_reference_id" integer,
  	"menu_link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_order_hero_locales" (
  	"menu_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_order_choices_pickup_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_order_choices_delivery_apps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"app" "enum_pages_blocks_order_choices_delivery_apps_app" DEFAULT 'doordash',
  	"name" varchar,
  	"promo_code" varchar,
  	"description" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_order_choices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pickup_title" varchar,
  	"pickup_tag" varchar,
  	"pickup_body" varchar,
  	"pickup_link_type" "enum_pages_blocks_order_choices_pickup_link_type" DEFAULT 'reference',
  	"pickup_link_new_tab" boolean,
  	"pickup_link_reference_id" integer,
  	"pickup_link_url" varchar,
  	"pickup_note" varchar,
  	"delivery_title" varchar,
  	"delivery_tag" varchar,
  	"delivery_body" varchar,
  	"delivery_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_order_choices_locales" (
  	"pickup_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_menu_browser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"opens_at" varchar,
  	"closes_at" varchar,
  	"hours_label" varchar,
  	"address" varchar,
  	"meta_short" varchar,
  	"search_placeholder" varchar,
  	"pickup_link_type" "enum_pages_blocks_menu_browser_pickup_link_type" DEFAULT 'reference',
  	"pickup_link_new_tab" boolean,
  	"pickup_link_reference_id" integer,
  	"pickup_link_url" varchar,
  	"delivery_link_type" "enum_pages_blocks_menu_browser_delivery_link_type" DEFAULT 'reference',
  	"delivery_link_new_tab" boolean,
  	"delivery_link_reference_id" integer,
  	"delivery_link_url" varchar,
  	"categories_label" varchar,
  	"show_sold_out" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_menu_browser_locales" (
  	"pickup_link_label" varchar,
  	"delivery_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_hero_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_hero_variant" DEFAULT 'split',
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" "enum_pages_blocks_content_width" DEFAULT 'narrow',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_locales" (
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_media_content_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_media_content_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_media_content_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_media_content_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_media_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_position" "enum_pages_blocks_media_content_image_position" DEFAULT 'left',
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_content_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_menu_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_pages_blocks_menu_highlights_source" DEFAULT 'featured',
  	"category_id" integer,
  	"limit" numeric DEFAULT 6,
  	"show_menu_link" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_menu_highlights_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_full_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"show_sold_out" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_full_menu_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials_quotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author" varchar,
  	"source" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_quotes_locales" (
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_visit_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_visit_us_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'primary'
  );
  
  CREATE TABLE "pages_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"menu_items_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_home_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_home_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_home_hero_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_home_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"menu_item_id" integer,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_hero_slides_locales" (
  	"pitch" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_home_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"pill_image_id" integer,
  	"polaroid_image_id" integer,
  	"order_link_type" "enum__pages_v_blocks_home_hero_order_link_type" DEFAULT 'reference',
  	"order_link_new_tab" boolean,
  	"order_link_reference_id" integer,
  	"order_link_url" varchar,
  	"autoplay" numeric DEFAULT 7,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_hero_locales" (
  	"line1" varchar,
  	"line2" varchar,
  	"accent" varchar,
  	"line3" varchar,
  	"body" varchar,
  	"polaroid_caption" varchar,
  	"stamp_label" varchar,
  	"stamp_value" varchar,
  	"order_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_ribbons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_menu_board" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"limit" numeric DEFAULT 5,
  	"menu_link_type" "enum__pages_v_blocks_menu_board_menu_link_type" DEFAULT 'reference',
  	"menu_link_new_tab" boolean,
  	"menu_link_reference_id" integer,
  	"menu_link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_menu_board_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"sticker_label" varchar,
  	"menu_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_plate_parade" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__pages_v_blocks_plate_parade_source" DEFAULT 'featured',
  	"limit" numeric DEFAULT 6,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_plate_parade_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"drag_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_coffee_orbit" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"note_link_type" "enum__pages_v_blocks_coffee_orbit_note_link_type" DEFAULT 'reference',
  	"note_link_new_tab" boolean,
  	"note_link_reference_id" integer,
  	"note_link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_coffee_orbit_locales" (
  	"heading_bold" varchar,
  	"heading_light" varchar,
  	"note_heading" varchar,
  	"note_link_label" varchar,
  	"seal_top" varchar,
  	"seal_middle" varchar,
  	"seal_bottom" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_mural_story_callouts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_mural_story_callouts_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_mural_story" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"link_type" "enum__pages_v_blocks_mural_story_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_mural_story_locales" (
  	"heading_bold" varchar,
  	"heading_light" varchar,
  	"body" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gram_wall" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"handle" varchar,
  	"link_type" "enum__pages_v_blocks_gram_wall_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gram_wall_locales" (
  	"subline" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_review_thread_ratings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"score" varchar,
  	"platform" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_review_thread_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"author" varchar,
  	"source" varchar,
  	"tone" "enum__pages_v_blocks_review_thread_reviews_tone" DEFAULT 'paper',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_review_thread_reviews_locales" (
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_review_thread" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_review_thread_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_visit_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"map_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_visit_hours_locales" (
  	"big_text" varchar,
  	"script" varchar,
  	"address" varchar,
  	"details" varchar,
  	"directions_label" varchar,
  	"street_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_sun_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_sun_cta_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_sun_cta_locales" (
  	"side_text" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"link_label" varchar,
  	"stamp_label" varchar,
  	"stamp_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_catering_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_catering_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_catering_hero_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_catering_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_catering_hero_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_catering_hero_facts_icon" DEFAULT 'star',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_catering_hero_facts_locales" (
  	"value" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_catering_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photos_main_id" integer,
  	"photos_side_id" integer,
  	"photos_small_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_catering_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"stamp_label" varchar,
  	"stamp_value" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_catering_ribbon" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_catering_menu_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_catering_menu_categories_items_locales" (
  	"name" varchar,
  	"price" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_catering_menu_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_catering_menu_categories_locales" (
  	"title" varchar,
  	"short_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_catering_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_catering_menu_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"intro" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_catering_use_cases_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_catering_use_cases_cases_icon" DEFAULT 'star',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_catering_use_cases_cases_locales" (
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_catering_use_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_catering_use_cases_locales" (
  	"heading_bold" varchar,
  	"heading_light" varchar,
  	"script" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_catering_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_catering_steps_steps_locales" (
  	"title" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_catering_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_catering_steps_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_catering_quote_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_catering_quote_faqs_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_catering_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_catering_quote_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"call_label" varchar,
  	"call_prompt" varchar,
  	"pickup_label" varchar,
  	"pickup_address" varchar,
  	"form_title" varchar,
  	"submit_label" varchar,
  	"fine_print" varchar,
  	"success_heading" varchar,
  	"success_body" varchar,
  	"faq_heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gift_card_hero_amounts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"selected" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gift_card_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"buy_link_type" "enum__pages_v_blocks_gift_card_hero_buy_link_type" DEFAULT 'reference',
  	"buy_link_new_tab" boolean,
  	"buy_link_reference_id" integer,
  	"buy_link_url" varchar,
  	"balance_link_type" "enum__pages_v_blocks_gift_card_hero_balance_link_type" DEFAULT 'reference',
  	"balance_link_new_tab" boolean,
  	"balance_link_reference_id" integer,
  	"balance_link_url" varchar,
  	"card_back_amount" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gift_card_hero_locales" (
  	"eyebrow" varchar,
  	"line1" varchar,
  	"line2" varchar,
  	"body" varchar,
  	"any_amount" varchar,
  	"buy_link_label" varchar,
  	"balance_link_label" varchar,
  	"card_label" varchar,
  	"card_address" varchar,
  	"tag_label" varchar,
  	"tag_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gift_card_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_gift_card_steps_steps_icon" DEFAULT 'card',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gift_card_steps_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gift_card_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gift_card_steps_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gift_card_panels_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "enum__pages_v_blocks_gift_card_panels_panels_tone" DEFAULT 'sunny',
  	"icon" "enum__pages_v_blocks_gift_card_panels_panels_icon" DEFAULT 'gift',
  	"link_type" "enum__pages_v_blocks_gift_card_panels_panels_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gift_card_panels_panels_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"link_label" varchar,
  	"note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gift_card_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gift_card_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gift_card_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gift_card_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gift_card_faq_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_about_hero_polaroids" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"stamp_top" varchar,
  	"stamp_value" varchar,
  	"stamp_bottom" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_belief_plates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_belief" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_kitchen_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum__pages_v_blocks_about_kitchen_pillars_icon" DEFAULT 'star',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_kitchen" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"photos_main_id" integer,
  	"photos_round_id" integer,
  	"photos_small_id" integer,
  	"stamp_top" varchar,
  	"stamp_value" varchar,
  	"stamp_bottom" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_gallery_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"name" varchar,
  	"role" varchar,
  	"tone" "enum__pages_v_blocks_about_team_members_tone" DEFAULT 'blue',
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"hiring_heading" varchar,
  	"hiring_body" varchar,
  	"hiring_enable_link" boolean,
  	"hiring_link_type" "enum__pages_v_blocks_about_team_hiring_link_type" DEFAULT 'reference',
  	"hiring_link_new_tab" boolean,
  	"hiring_link_reference_id" integer,
  	"hiring_link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_team_locales" (
  	"hiring_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_about_closing_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_about_closing_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_about_closing_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_closing_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_about_closing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" varchar,
  	"heading" varchar,
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_contact_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_contact_hero_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_hero_hours_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"show_call" boolean DEFAULT true,
  	"hours_eyebrow" varchar,
  	"hours_value" varchar,
  	"photo_id" integer,
  	"caption" varchar,
  	"stamp_top" varchar,
  	"stamp_value" varchar,
  	"stamp_bottom" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_contact_form_details_icon" DEFAULT 'star',
  	"label" varchar,
  	"value" varchar,
  	"description" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"submit_label" varchar,
  	"note" varchar,
  	"success_heading" varchar,
  	"success_body" varchar,
  	"details_heading" varchar,
  	"callout_eyebrow" varchar,
  	"callout_text" varchar,
  	"callout_link_type" "enum__pages_v_blocks_contact_form_callout_link_type" DEFAULT 'reference',
  	"callout_link_new_tab" boolean,
  	"callout_link_reference_id" integer,
  	"callout_link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_locales" (
  	"callout_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_find_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_contact_find_facts_icon" DEFAULT 'star',
  	"title" varchar,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_find" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"use_map_url" boolean DEFAULT true,
  	"link_type" "enum__pages_v_blocks_contact_find_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"main_photo_id" integer,
  	"side_photo_id" integer,
  	"stamp_top" varchar,
  	"stamp_value" varchar,
  	"stamp_bottom" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_find_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_order_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"eyebrow_short" varchar,
  	"line1" varchar,
  	"line2" varchar,
  	"body" varchar,
  	"toggle_pickup" varchar,
  	"toggle_delivery" varchar,
  	"menu_link_type" "enum__pages_v_blocks_order_hero_menu_link_type" DEFAULT 'reference',
  	"menu_link_new_tab" boolean,
  	"menu_link_reference_id" integer,
  	"menu_link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_order_hero_locales" (
  	"menu_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_order_choices_pickup_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_order_choices_delivery_apps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"app" "enum__pages_v_blocks_order_choices_delivery_apps_app" DEFAULT 'doordash',
  	"name" varchar,
  	"promo_code" varchar,
  	"description" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_order_choices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"pickup_title" varchar,
  	"pickup_tag" varchar,
  	"pickup_body" varchar,
  	"pickup_link_type" "enum__pages_v_blocks_order_choices_pickup_link_type" DEFAULT 'reference',
  	"pickup_link_new_tab" boolean,
  	"pickup_link_reference_id" integer,
  	"pickup_link_url" varchar,
  	"pickup_note" varchar,
  	"delivery_title" varchar,
  	"delivery_tag" varchar,
  	"delivery_body" varchar,
  	"delivery_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_order_choices_locales" (
  	"pickup_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_menu_browser" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"opens_at" varchar,
  	"closes_at" varchar,
  	"hours_label" varchar,
  	"address" varchar,
  	"meta_short" varchar,
  	"search_placeholder" varchar,
  	"pickup_link_type" "enum__pages_v_blocks_menu_browser_pickup_link_type" DEFAULT 'reference',
  	"pickup_link_new_tab" boolean,
  	"pickup_link_reference_id" integer,
  	"pickup_link_url" varchar,
  	"delivery_link_type" "enum__pages_v_blocks_menu_browser_delivery_link_type" DEFAULT 'reference',
  	"delivery_link_new_tab" boolean,
  	"delivery_link_reference_id" integer,
  	"delivery_link_url" varchar,
  	"categories_label" varchar,
  	"show_sold_out" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_menu_browser_locales" (
  	"pickup_link_label" varchar,
  	"delivery_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_hero_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_hero_variant" DEFAULT 'split',
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"width" "enum__pages_v_blocks_content_width" DEFAULT 'narrow',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_locales" (
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_media_content_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_media_content_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_media_content_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_content_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_media_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_position" "enum__pages_v_blocks_media_content_image_position" DEFAULT 'left',
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_content_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_menu_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__pages_v_blocks_menu_highlights_source" DEFAULT 'featured',
  	"category_id" integer,
  	"limit" numeric DEFAULT 6,
  	"show_menu_link" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_menu_highlights_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_full_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_sold_out" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_full_menu_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_quotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"author" varchar,
  	"source" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_quotes_locales" (
  	"quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_visit_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_visit_us_locales" (
  	"heading" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_locales" (
  	"heading" varchar,
  	"body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar,
  	"locale" "_locales"
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"menu_items_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "menu_items_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_menu_items_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "menu_items_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"price" numeric
  );
  
  CREATE TABLE "menu_items_variants_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "menu_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"price" numeric,
  	"compare_at_price" numeric,
  	"image_id" integer,
  	"slug" varchar,
  	"category_id" integer,
  	"availability" "enum_menu_items_availability" DEFAULT 'available',
  	"badge" varchar,
  	"featured" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_menu_items_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "menu_items_locales" (
  	"name" varchar,
  	"description" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "menu_items_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_menu_items_v_version_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__menu_items_v_version_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_menu_items_v_version_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"price" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_menu_items_v_version_variants_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_menu_items_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_price" numeric,
  	"version_compare_at_price" numeric,
  	"version_image_id" integer,
  	"version_slug" varchar,
  	"version_category_id" integer,
  	"version_availability" "enum__menu_items_v_version_availability" DEFAULT 'available',
  	"version_badge" varchar,
  	"version_featured" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__menu_items_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__menu_items_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_menu_items_v_locales" (
  	"version_name" varchar,
  	"version_description" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_menu_items_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"image_id" integer,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"locale" "enum_subscribers_locale" DEFAULT 'en',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "catering_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"event_date" timestamp(3) with time zone,
  	"headcount" numeric,
  	"budget" varchar,
  	"occasion" varchar,
  	"fulfillment" "enum_catering_requests_fulfillment" DEFAULT 'pickup',
  	"notes" varchar,
  	"status" "enum_catering_requests_status" DEFAULT 'new',
  	"locale" "enum_catering_requests_locale" DEFAULT 'en',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_messages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"topic" varchar,
  	"message" varchar NOT NULL,
  	"status" "enum_contact_messages_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT 'Sandpiper team' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"menu_items_id" integer,
  	"categories_id" integer,
  	"media_id" integer,
  	"subscribers_id" integer,
  	"catering_requests_id" integer,
  	"contact_messages_id" integer,
  	"users_id" integer,
  	"payload_folders_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_socials_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"time" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_hours_locales" (
  	"days" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Sandpiper' NOT NULL,
  	"currency" "enum_site_settings_currency" DEFAULT 'IDR' NOT NULL,
  	"logo_id" integer,
  	"email" varchar,
  	"phone" varchar,
  	"whatsapp" varchar,
  	"map_url" varchar,
  	"announcement_enabled" boolean,
  	"announcement_link_type" "enum_site_settings_announcement_link_type" DEFAULT 'reference',
  	"announcement_link_new_tab" boolean,
  	"announcement_link_reference_id" integer,
  	"announcement_link_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"tagline" varchar,
  	"address" varchar,
  	"announcement" varchar,
  	"announcement_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"icon" "enum_header_nav_items_icon"
  );
  
  CREATE TABLE "header_nav_items_locales" (
  	"link_label" varchar NOT NULL,
  	"badge" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_info_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "header_info_bar_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header_ticker" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "header_ticker_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_type" "enum_header_cta_type" DEFAULT 'reference',
  	"cta_new_tab" boolean,
  	"cta_reference_id" integer,
  	"cta_url" varchar,
  	"cta_appearance" "enum_header_cta_appearance" DEFAULT 'primary',
  	"promo_link_type" "enum_header_promo_link_type" DEFAULT 'reference',
  	"promo_link_new_tab" boolean,
  	"promo_link_reference_id" integer,
  	"promo_link_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_locales" (
  	"cta_label" varchar,
  	"cta_badge" varchar,
  	"contact_heading" varchar,
  	"promo_eyebrow" varchar,
  	"promo_heading" varchar,
  	"promo_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_reference_id" integer,
  	"link_url" varchar
  );
  
  CREATE TABLE "footer_nav_items_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"wordmark" varchar,
  	"newsletter_enabled" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"blurb" varchar,
  	"explore_heading" varchar,
  	"visit_heading" varchar,
  	"copyright" varchar,
  	"note" varchar,
  	"newsletter_heading" varchar,
  	"newsletter_body" varchar,
  	"newsletter_placeholder" varchar,
  	"newsletter_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_home_hero_links" ADD CONSTRAINT "pages_blocks_home_hero_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero_links" ADD CONSTRAINT "pages_blocks_home_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero_links_locales" ADD CONSTRAINT "pages_blocks_home_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero_slides" ADD CONSTRAINT "pages_blocks_home_hero_slides_menu_item_id_menu_items_id_fk" FOREIGN KEY ("menu_item_id") REFERENCES "public"."menu_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero_slides" ADD CONSTRAINT "pages_blocks_home_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero_slides" ADD CONSTRAINT "pages_blocks_home_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero_slides_locales" ADD CONSTRAINT "pages_blocks_home_hero_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero" ADD CONSTRAINT "pages_blocks_home_hero_pill_image_id_media_id_fk" FOREIGN KEY ("pill_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero" ADD CONSTRAINT "pages_blocks_home_hero_polaroid_image_id_media_id_fk" FOREIGN KEY ("polaroid_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero" ADD CONSTRAINT "pages_blocks_home_hero_order_link_reference_id_pages_id_fk" FOREIGN KEY ("order_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero" ADD CONSTRAINT "pages_blocks_home_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_hero_locales" ADD CONSTRAINT "pages_blocks_home_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ribbons" ADD CONSTRAINT "pages_blocks_ribbons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_board" ADD CONSTRAINT "pages_blocks_menu_board_menu_link_reference_id_pages_id_fk" FOREIGN KEY ("menu_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_board" ADD CONSTRAINT "pages_blocks_menu_board_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_board_locales" ADD CONSTRAINT "pages_blocks_menu_board_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_menu_board"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plate_parade" ADD CONSTRAINT "pages_blocks_plate_parade_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_plate_parade_locales" ADD CONSTRAINT "pages_blocks_plate_parade_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_plate_parade"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_coffee_orbit" ADD CONSTRAINT "pages_blocks_coffee_orbit_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_coffee_orbit" ADD CONSTRAINT "pages_blocks_coffee_orbit_note_link_reference_id_pages_id_fk" FOREIGN KEY ("note_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_coffee_orbit" ADD CONSTRAINT "pages_blocks_coffee_orbit_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_coffee_orbit_locales" ADD CONSTRAINT "pages_blocks_coffee_orbit_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_coffee_orbit"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mural_story_callouts" ADD CONSTRAINT "pages_blocks_mural_story_callouts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_mural_story_callouts" ADD CONSTRAINT "pages_blocks_mural_story_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mural_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mural_story_callouts_locales" ADD CONSTRAINT "pages_blocks_mural_story_callouts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mural_story_callouts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mural_story" ADD CONSTRAINT "pages_blocks_mural_story_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_mural_story" ADD CONSTRAINT "pages_blocks_mural_story_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_mural_story" ADD CONSTRAINT "pages_blocks_mural_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mural_story_locales" ADD CONSTRAINT "pages_blocks_mural_story_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mural_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gram_wall" ADD CONSTRAINT "pages_blocks_gram_wall_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gram_wall" ADD CONSTRAINT "pages_blocks_gram_wall_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gram_wall_locales" ADD CONSTRAINT "pages_blocks_gram_wall_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gram_wall"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_review_thread_ratings" ADD CONSTRAINT "pages_blocks_review_thread_ratings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_review_thread"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_review_thread_reviews" ADD CONSTRAINT "pages_blocks_review_thread_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_review_thread"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_review_thread_reviews_locales" ADD CONSTRAINT "pages_blocks_review_thread_reviews_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_review_thread_reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_review_thread" ADD CONSTRAINT "pages_blocks_review_thread_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_review_thread_locales" ADD CONSTRAINT "pages_blocks_review_thread_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_review_thread"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_visit_hours" ADD CONSTRAINT "pages_blocks_visit_hours_map_image_id_media_id_fk" FOREIGN KEY ("map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_visit_hours" ADD CONSTRAINT "pages_blocks_visit_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_visit_hours_locales" ADD CONSTRAINT "pages_blocks_visit_hours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_visit_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sun_cta" ADD CONSTRAINT "pages_blocks_sun_cta_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_sun_cta" ADD CONSTRAINT "pages_blocks_sun_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_sun_cta_locales" ADD CONSTRAINT "pages_blocks_sun_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_sun_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_hero_links" ADD CONSTRAINT "pages_blocks_catering_hero_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_hero_links" ADD CONSTRAINT "pages_blocks_catering_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_hero_links_locales" ADD CONSTRAINT "pages_blocks_catering_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_hero_facts" ADD CONSTRAINT "pages_blocks_catering_hero_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_hero_facts_locales" ADD CONSTRAINT "pages_blocks_catering_hero_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_hero_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_hero" ADD CONSTRAINT "pages_blocks_catering_hero_photos_main_id_media_id_fk" FOREIGN KEY ("photos_main_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_hero" ADD CONSTRAINT "pages_blocks_catering_hero_photos_side_id_media_id_fk" FOREIGN KEY ("photos_side_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_hero" ADD CONSTRAINT "pages_blocks_catering_hero_photos_small_id_media_id_fk" FOREIGN KEY ("photos_small_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_hero" ADD CONSTRAINT "pages_blocks_catering_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_hero_locales" ADD CONSTRAINT "pages_blocks_catering_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_ribbon" ADD CONSTRAINT "pages_blocks_catering_ribbon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_menu_categories_items" ADD CONSTRAINT "pages_blocks_catering_menu_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_menu_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_menu_categories_items_locales" ADD CONSTRAINT "pages_blocks_catering_menu_categories_items_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_menu_categories_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_menu_categories" ADD CONSTRAINT "pages_blocks_catering_menu_categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_menu_categories" ADD CONSTRAINT "pages_blocks_catering_menu_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_menu_categories_locales" ADD CONSTRAINT "pages_blocks_catering_menu_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_menu_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_menu" ADD CONSTRAINT "pages_blocks_catering_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_menu_locales" ADD CONSTRAINT "pages_blocks_catering_menu_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_use_cases_cases" ADD CONSTRAINT "pages_blocks_catering_use_cases_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_use_cases_cases_locales" ADD CONSTRAINT "pages_blocks_catering_use_cases_cases_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_use_cases_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_use_cases" ADD CONSTRAINT "pages_blocks_catering_use_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_use_cases_locales" ADD CONSTRAINT "pages_blocks_catering_use_cases_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_steps_steps" ADD CONSTRAINT "pages_blocks_catering_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_steps_steps_locales" ADD CONSTRAINT "pages_blocks_catering_steps_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_steps" ADD CONSTRAINT "pages_blocks_catering_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_steps_locales" ADD CONSTRAINT "pages_blocks_catering_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_quote_faqs" ADD CONSTRAINT "pages_blocks_catering_quote_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_quote_faqs_locales" ADD CONSTRAINT "pages_blocks_catering_quote_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_quote_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_quote" ADD CONSTRAINT "pages_blocks_catering_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_catering_quote_locales" ADD CONSTRAINT "pages_blocks_catering_quote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_catering_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gift_card_hero_amounts" ADD CONSTRAINT "pages_blocks_gift_card_hero_amounts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gift_card_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gift_card_hero" ADD CONSTRAINT "pages_blocks_gift_card_hero_buy_link_reference_id_pages_id_fk" FOREIGN KEY ("buy_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gift_card_hero" ADD CONSTRAINT "pages_blocks_gift_card_hero_balance_link_reference_id_pages_id_fk" FOREIGN KEY ("balance_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gift_card_hero" ADD CONSTRAINT "pages_blocks_gift_card_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gift_card_hero_locales" ADD CONSTRAINT "pages_blocks_gift_card_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gift_card_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gift_card_steps_steps" ADD CONSTRAINT "pages_blocks_gift_card_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gift_card_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gift_card_steps_steps_locales" ADD CONSTRAINT "pages_blocks_gift_card_steps_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gift_card_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gift_card_steps" ADD CONSTRAINT "pages_blocks_gift_card_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gift_card_steps_locales" ADD CONSTRAINT "pages_blocks_gift_card_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gift_card_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gift_card_panels_panels" ADD CONSTRAINT "pages_blocks_gift_card_panels_panels_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gift_card_panels_panels" ADD CONSTRAINT "pages_blocks_gift_card_panels_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gift_card_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gift_card_panels_panels_locales" ADD CONSTRAINT "pages_blocks_gift_card_panels_panels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gift_card_panels_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gift_card_panels" ADD CONSTRAINT "pages_blocks_gift_card_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gift_card_faq_items" ADD CONSTRAINT "pages_blocks_gift_card_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gift_card_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gift_card_faq_items_locales" ADD CONSTRAINT "pages_blocks_gift_card_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gift_card_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gift_card_faq" ADD CONSTRAINT "pages_blocks_gift_card_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gift_card_faq_locales" ADD CONSTRAINT "pages_blocks_gift_card_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gift_card_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_hero_polaroids" ADD CONSTRAINT "pages_blocks_about_hero_polaroids_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_hero_polaroids" ADD CONSTRAINT "pages_blocks_about_hero_polaroids_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_hero" ADD CONSTRAINT "pages_blocks_about_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_belief_plates" ADD CONSTRAINT "pages_blocks_about_belief_plates_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_belief_plates" ADD CONSTRAINT "pages_blocks_about_belief_plates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_belief"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_belief" ADD CONSTRAINT "pages_blocks_about_belief_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_kitchen_pillars" ADD CONSTRAINT "pages_blocks_about_kitchen_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_kitchen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_kitchen" ADD CONSTRAINT "pages_blocks_about_kitchen_photos_main_id_media_id_fk" FOREIGN KEY ("photos_main_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_kitchen" ADD CONSTRAINT "pages_blocks_about_kitchen_photos_round_id_media_id_fk" FOREIGN KEY ("photos_round_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_kitchen" ADD CONSTRAINT "pages_blocks_about_kitchen_photos_small_id_media_id_fk" FOREIGN KEY ("photos_small_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_kitchen" ADD CONSTRAINT "pages_blocks_about_kitchen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_gallery_photos" ADD CONSTRAINT "pages_blocks_about_gallery_photos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_gallery_photos" ADD CONSTRAINT "pages_blocks_about_gallery_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_gallery" ADD CONSTRAINT "pages_blocks_about_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_team_members" ADD CONSTRAINT "pages_blocks_about_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_team_members" ADD CONSTRAINT "pages_blocks_about_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_team" ADD CONSTRAINT "pages_blocks_about_team_hiring_link_reference_id_pages_id_fk" FOREIGN KEY ("hiring_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_team" ADD CONSTRAINT "pages_blocks_about_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_team_locales" ADD CONSTRAINT "pages_blocks_about_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_closing_links" ADD CONSTRAINT "pages_blocks_about_closing_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_closing_links" ADD CONSTRAINT "pages_blocks_about_closing_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_closing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_closing_links_locales" ADD CONSTRAINT "pages_blocks_about_closing_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_closing_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_closing" ADD CONSTRAINT "pages_blocks_about_closing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_hero_links" ADD CONSTRAINT "pages_blocks_contact_hero_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_hero_links" ADD CONSTRAINT "pages_blocks_contact_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_hero_links_locales" ADD CONSTRAINT "pages_blocks_contact_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_hero_hours_rows" ADD CONSTRAINT "pages_blocks_contact_hero_hours_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_hero" ADD CONSTRAINT "pages_blocks_contact_hero_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_hero" ADD CONSTRAINT "pages_blocks_contact_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_details" ADD CONSTRAINT "pages_blocks_contact_form_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_callout_link_reference_id_pages_id_fk" FOREIGN KEY ("callout_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_locales" ADD CONSTRAINT "pages_blocks_contact_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_find_facts" ADD CONSTRAINT "pages_blocks_contact_find_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_find"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_find" ADD CONSTRAINT "pages_blocks_contact_find_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_find" ADD CONSTRAINT "pages_blocks_contact_find_main_photo_id_media_id_fk" FOREIGN KEY ("main_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_find" ADD CONSTRAINT "pages_blocks_contact_find_side_photo_id_media_id_fk" FOREIGN KEY ("side_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_find" ADD CONSTRAINT "pages_blocks_contact_find_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_find_locales" ADD CONSTRAINT "pages_blocks_contact_find_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_find"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_order_hero" ADD CONSTRAINT "pages_blocks_order_hero_menu_link_reference_id_pages_id_fk" FOREIGN KEY ("menu_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_order_hero" ADD CONSTRAINT "pages_blocks_order_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_order_hero_locales" ADD CONSTRAINT "pages_blocks_order_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_order_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_order_choices_pickup_steps" ADD CONSTRAINT "pages_blocks_order_choices_pickup_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_order_choices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_order_choices_delivery_apps" ADD CONSTRAINT "pages_blocks_order_choices_delivery_apps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_order_choices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_order_choices" ADD CONSTRAINT "pages_blocks_order_choices_pickup_link_reference_id_pages_id_fk" FOREIGN KEY ("pickup_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_order_choices" ADD CONSTRAINT "pages_blocks_order_choices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_order_choices_locales" ADD CONSTRAINT "pages_blocks_order_choices_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_order_choices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_browser" ADD CONSTRAINT "pages_blocks_menu_browser_pickup_link_reference_id_pages_id_fk" FOREIGN KEY ("pickup_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_browser" ADD CONSTRAINT "pages_blocks_menu_browser_delivery_link_reference_id_pages_id_fk" FOREIGN KEY ("delivery_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_browser" ADD CONSTRAINT "pages_blocks_menu_browser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_browser_locales" ADD CONSTRAINT "pages_blocks_menu_browser_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_menu_browser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_links_locales" ADD CONSTRAINT "pages_blocks_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_locales" ADD CONSTRAINT "pages_blocks_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_content_links" ADD CONSTRAINT "pages_blocks_media_content_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_content_links" ADD CONSTRAINT "pages_blocks_media_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_content_links_locales" ADD CONSTRAINT "pages_blocks_media_content_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_content_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_content" ADD CONSTRAINT "pages_blocks_media_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_content" ADD CONSTRAINT "pages_blocks_media_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_content_locales" ADD CONSTRAINT "pages_blocks_media_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_highlights" ADD CONSTRAINT "pages_blocks_menu_highlights_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_highlights" ADD CONSTRAINT "pages_blocks_menu_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_menu_highlights_locales" ADD CONSTRAINT "pages_blocks_menu_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_menu_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_full_menu" ADD CONSTRAINT "pages_blocks_full_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_full_menu_locales" ADD CONSTRAINT "pages_blocks_full_menu_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_full_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_locales" ADD CONSTRAINT "pages_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_quotes" ADD CONSTRAINT "pages_blocks_testimonials_quotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_quotes_locales" ADD CONSTRAINT "pages_blocks_testimonials_quotes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials_quotes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_locales" ADD CONSTRAINT "pages_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items_locales" ADD CONSTRAINT "pages_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_visit_us" ADD CONSTRAINT "pages_blocks_visit_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_visit_us_locales" ADD CONSTRAINT "pages_blocks_visit_us_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_visit_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links_locales" ADD CONSTRAINT "pages_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_texts" ADD CONSTRAINT "pages_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_menu_items_fk" FOREIGN KEY ("menu_items_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero_links" ADD CONSTRAINT "_pages_v_blocks_home_hero_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero_links" ADD CONSTRAINT "_pages_v_blocks_home_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero_links_locales" ADD CONSTRAINT "_pages_v_blocks_home_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_home_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero_slides" ADD CONSTRAINT "_pages_v_blocks_home_hero_slides_menu_item_id_menu_items_id_fk" FOREIGN KEY ("menu_item_id") REFERENCES "public"."menu_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero_slides" ADD CONSTRAINT "_pages_v_blocks_home_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero_slides" ADD CONSTRAINT "_pages_v_blocks_home_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero_slides_locales" ADD CONSTRAINT "_pages_v_blocks_home_hero_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_home_hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero" ADD CONSTRAINT "_pages_v_blocks_home_hero_pill_image_id_media_id_fk" FOREIGN KEY ("pill_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero" ADD CONSTRAINT "_pages_v_blocks_home_hero_polaroid_image_id_media_id_fk" FOREIGN KEY ("polaroid_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero" ADD CONSTRAINT "_pages_v_blocks_home_hero_order_link_reference_id_pages_id_fk" FOREIGN KEY ("order_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero" ADD CONSTRAINT "_pages_v_blocks_home_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_hero_locales" ADD CONSTRAINT "_pages_v_blocks_home_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_home_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ribbons" ADD CONSTRAINT "_pages_v_blocks_ribbons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_board" ADD CONSTRAINT "_pages_v_blocks_menu_board_menu_link_reference_id_pages_id_fk" FOREIGN KEY ("menu_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_board" ADD CONSTRAINT "_pages_v_blocks_menu_board_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_board_locales" ADD CONSTRAINT "_pages_v_blocks_menu_board_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_menu_board"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plate_parade" ADD CONSTRAINT "_pages_v_blocks_plate_parade_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_plate_parade_locales" ADD CONSTRAINT "_pages_v_blocks_plate_parade_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_plate_parade"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_coffee_orbit" ADD CONSTRAINT "_pages_v_blocks_coffee_orbit_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_coffee_orbit" ADD CONSTRAINT "_pages_v_blocks_coffee_orbit_note_link_reference_id_pages_id_fk" FOREIGN KEY ("note_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_coffee_orbit" ADD CONSTRAINT "_pages_v_blocks_coffee_orbit_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_coffee_orbit_locales" ADD CONSTRAINT "_pages_v_blocks_coffee_orbit_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_coffee_orbit"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mural_story_callouts" ADD CONSTRAINT "_pages_v_blocks_mural_story_callouts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mural_story_callouts" ADD CONSTRAINT "_pages_v_blocks_mural_story_callouts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_mural_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mural_story_callouts_locales" ADD CONSTRAINT "_pages_v_blocks_mural_story_callouts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_mural_story_callouts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mural_story" ADD CONSTRAINT "_pages_v_blocks_mural_story_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mural_story" ADD CONSTRAINT "_pages_v_blocks_mural_story_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mural_story" ADD CONSTRAINT "_pages_v_blocks_mural_story_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mural_story_locales" ADD CONSTRAINT "_pages_v_blocks_mural_story_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_mural_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gram_wall" ADD CONSTRAINT "_pages_v_blocks_gram_wall_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gram_wall" ADD CONSTRAINT "_pages_v_blocks_gram_wall_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gram_wall_locales" ADD CONSTRAINT "_pages_v_blocks_gram_wall_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gram_wall"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_review_thread_ratings" ADD CONSTRAINT "_pages_v_blocks_review_thread_ratings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_review_thread"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_review_thread_reviews" ADD CONSTRAINT "_pages_v_blocks_review_thread_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_review_thread"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_review_thread_reviews_locales" ADD CONSTRAINT "_pages_v_blocks_review_thread_reviews_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_review_thread_reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_review_thread" ADD CONSTRAINT "_pages_v_blocks_review_thread_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_review_thread_locales" ADD CONSTRAINT "_pages_v_blocks_review_thread_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_review_thread"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_visit_hours" ADD CONSTRAINT "_pages_v_blocks_visit_hours_map_image_id_media_id_fk" FOREIGN KEY ("map_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_visit_hours" ADD CONSTRAINT "_pages_v_blocks_visit_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_visit_hours_locales" ADD CONSTRAINT "_pages_v_blocks_visit_hours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_visit_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sun_cta" ADD CONSTRAINT "_pages_v_blocks_sun_cta_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sun_cta" ADD CONSTRAINT "_pages_v_blocks_sun_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sun_cta_locales" ADD CONSTRAINT "_pages_v_blocks_sun_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_sun_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_hero_links" ADD CONSTRAINT "_pages_v_blocks_catering_hero_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_hero_links" ADD CONSTRAINT "_pages_v_blocks_catering_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_hero_links_locales" ADD CONSTRAINT "_pages_v_blocks_catering_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_hero_facts" ADD CONSTRAINT "_pages_v_blocks_catering_hero_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_hero_facts_locales" ADD CONSTRAINT "_pages_v_blocks_catering_hero_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_hero_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_hero" ADD CONSTRAINT "_pages_v_blocks_catering_hero_photos_main_id_media_id_fk" FOREIGN KEY ("photos_main_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_hero" ADD CONSTRAINT "_pages_v_blocks_catering_hero_photos_side_id_media_id_fk" FOREIGN KEY ("photos_side_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_hero" ADD CONSTRAINT "_pages_v_blocks_catering_hero_photos_small_id_media_id_fk" FOREIGN KEY ("photos_small_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_hero" ADD CONSTRAINT "_pages_v_blocks_catering_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_hero_locales" ADD CONSTRAINT "_pages_v_blocks_catering_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_ribbon" ADD CONSTRAINT "_pages_v_blocks_catering_ribbon_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_menu_categories_items" ADD CONSTRAINT "_pages_v_blocks_catering_menu_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_menu_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_menu_categories_items_locales" ADD CONSTRAINT "_pages_v_blocks_catering_menu_categories_items_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_menu_categories_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_menu_categories" ADD CONSTRAINT "_pages_v_blocks_catering_menu_categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_menu_categories" ADD CONSTRAINT "_pages_v_blocks_catering_menu_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_menu_categories_locales" ADD CONSTRAINT "_pages_v_blocks_catering_menu_categories_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_menu_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_menu" ADD CONSTRAINT "_pages_v_blocks_catering_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_menu_locales" ADD CONSTRAINT "_pages_v_blocks_catering_menu_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_use_cases_cases" ADD CONSTRAINT "_pages_v_blocks_catering_use_cases_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_use_cases_cases_locales" ADD CONSTRAINT "_pages_v_blocks_catering_use_cases_cases_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_use_cases_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_use_cases" ADD CONSTRAINT "_pages_v_blocks_catering_use_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_use_cases_locales" ADD CONSTRAINT "_pages_v_blocks_catering_use_cases_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_use_cases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_steps_steps" ADD CONSTRAINT "_pages_v_blocks_catering_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_steps_steps_locales" ADD CONSTRAINT "_pages_v_blocks_catering_steps_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_steps" ADD CONSTRAINT "_pages_v_blocks_catering_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_steps_locales" ADD CONSTRAINT "_pages_v_blocks_catering_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_quote_faqs" ADD CONSTRAINT "_pages_v_blocks_catering_quote_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_quote_faqs_locales" ADD CONSTRAINT "_pages_v_blocks_catering_quote_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_quote_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_quote" ADD CONSTRAINT "_pages_v_blocks_catering_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_catering_quote_locales" ADD CONSTRAINT "_pages_v_blocks_catering_quote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_catering_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gift_card_hero_amounts" ADD CONSTRAINT "_pages_v_blocks_gift_card_hero_amounts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gift_card_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gift_card_hero" ADD CONSTRAINT "_pages_v_blocks_gift_card_hero_buy_link_reference_id_pages_id_fk" FOREIGN KEY ("buy_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gift_card_hero" ADD CONSTRAINT "_pages_v_blocks_gift_card_hero_balance_link_reference_id_pages_id_fk" FOREIGN KEY ("balance_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gift_card_hero" ADD CONSTRAINT "_pages_v_blocks_gift_card_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gift_card_hero_locales" ADD CONSTRAINT "_pages_v_blocks_gift_card_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gift_card_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gift_card_steps_steps" ADD CONSTRAINT "_pages_v_blocks_gift_card_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gift_card_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gift_card_steps_steps_locales" ADD CONSTRAINT "_pages_v_blocks_gift_card_steps_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gift_card_steps_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gift_card_steps" ADD CONSTRAINT "_pages_v_blocks_gift_card_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gift_card_steps_locales" ADD CONSTRAINT "_pages_v_blocks_gift_card_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gift_card_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gift_card_panels_panels" ADD CONSTRAINT "_pages_v_blocks_gift_card_panels_panels_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gift_card_panels_panels" ADD CONSTRAINT "_pages_v_blocks_gift_card_panels_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gift_card_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gift_card_panels_panels_locales" ADD CONSTRAINT "_pages_v_blocks_gift_card_panels_panels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gift_card_panels_panels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gift_card_panels" ADD CONSTRAINT "_pages_v_blocks_gift_card_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gift_card_faq_items" ADD CONSTRAINT "_pages_v_blocks_gift_card_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gift_card_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gift_card_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_gift_card_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gift_card_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gift_card_faq" ADD CONSTRAINT "_pages_v_blocks_gift_card_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gift_card_faq_locales" ADD CONSTRAINT "_pages_v_blocks_gift_card_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gift_card_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_hero_polaroids" ADD CONSTRAINT "_pages_v_blocks_about_hero_polaroids_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_hero_polaroids" ADD CONSTRAINT "_pages_v_blocks_about_hero_polaroids_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_hero" ADD CONSTRAINT "_pages_v_blocks_about_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_belief_plates" ADD CONSTRAINT "_pages_v_blocks_about_belief_plates_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_belief_plates" ADD CONSTRAINT "_pages_v_blocks_about_belief_plates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_belief"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_belief" ADD CONSTRAINT "_pages_v_blocks_about_belief_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_kitchen_pillars" ADD CONSTRAINT "_pages_v_blocks_about_kitchen_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_kitchen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_kitchen" ADD CONSTRAINT "_pages_v_blocks_about_kitchen_photos_main_id_media_id_fk" FOREIGN KEY ("photos_main_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_kitchen" ADD CONSTRAINT "_pages_v_blocks_about_kitchen_photos_round_id_media_id_fk" FOREIGN KEY ("photos_round_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_kitchen" ADD CONSTRAINT "_pages_v_blocks_about_kitchen_photos_small_id_media_id_fk" FOREIGN KEY ("photos_small_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_kitchen" ADD CONSTRAINT "_pages_v_blocks_about_kitchen_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_gallery_photos" ADD CONSTRAINT "_pages_v_blocks_about_gallery_photos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_gallery_photos" ADD CONSTRAINT "_pages_v_blocks_about_gallery_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_gallery" ADD CONSTRAINT "_pages_v_blocks_about_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_team_members" ADD CONSTRAINT "_pages_v_blocks_about_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_team_members" ADD CONSTRAINT "_pages_v_blocks_about_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_team" ADD CONSTRAINT "_pages_v_blocks_about_team_hiring_link_reference_id_pages_id_fk" FOREIGN KEY ("hiring_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_team" ADD CONSTRAINT "_pages_v_blocks_about_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_team_locales" ADD CONSTRAINT "_pages_v_blocks_about_team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_closing_links" ADD CONSTRAINT "_pages_v_blocks_about_closing_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_closing_links" ADD CONSTRAINT "_pages_v_blocks_about_closing_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_closing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_closing_links_locales" ADD CONSTRAINT "_pages_v_blocks_about_closing_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_closing_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_closing" ADD CONSTRAINT "_pages_v_blocks_about_closing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_hero_links" ADD CONSTRAINT "_pages_v_blocks_contact_hero_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_hero_links" ADD CONSTRAINT "_pages_v_blocks_contact_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_hero_links_locales" ADD CONSTRAINT "_pages_v_blocks_contact_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_hero_hours_rows" ADD CONSTRAINT "_pages_v_blocks_contact_hero_hours_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_hero" ADD CONSTRAINT "_pages_v_blocks_contact_hero_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_hero" ADD CONSTRAINT "_pages_v_blocks_contact_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_details" ADD CONSTRAINT "_pages_v_blocks_contact_form_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_callout_link_reference_id_pages_id_fk" FOREIGN KEY ("callout_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_locales" ADD CONSTRAINT "_pages_v_blocks_contact_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_find_facts" ADD CONSTRAINT "_pages_v_blocks_contact_find_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_find"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_find" ADD CONSTRAINT "_pages_v_blocks_contact_find_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_find" ADD CONSTRAINT "_pages_v_blocks_contact_find_main_photo_id_media_id_fk" FOREIGN KEY ("main_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_find" ADD CONSTRAINT "_pages_v_blocks_contact_find_side_photo_id_media_id_fk" FOREIGN KEY ("side_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_find" ADD CONSTRAINT "_pages_v_blocks_contact_find_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_find_locales" ADD CONSTRAINT "_pages_v_blocks_contact_find_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_find"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_order_hero" ADD CONSTRAINT "_pages_v_blocks_order_hero_menu_link_reference_id_pages_id_fk" FOREIGN KEY ("menu_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_order_hero" ADD CONSTRAINT "_pages_v_blocks_order_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_order_hero_locales" ADD CONSTRAINT "_pages_v_blocks_order_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_order_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_order_choices_pickup_steps" ADD CONSTRAINT "_pages_v_blocks_order_choices_pickup_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_order_choices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_order_choices_delivery_apps" ADD CONSTRAINT "_pages_v_blocks_order_choices_delivery_apps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_order_choices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_order_choices" ADD CONSTRAINT "_pages_v_blocks_order_choices_pickup_link_reference_id_pages_id_fk" FOREIGN KEY ("pickup_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_order_choices" ADD CONSTRAINT "_pages_v_blocks_order_choices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_order_choices_locales" ADD CONSTRAINT "_pages_v_blocks_order_choices_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_order_choices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_browser" ADD CONSTRAINT "_pages_v_blocks_menu_browser_pickup_link_reference_id_pages_id_fk" FOREIGN KEY ("pickup_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_browser" ADD CONSTRAINT "_pages_v_blocks_menu_browser_delivery_link_reference_id_pages_id_fk" FOREIGN KEY ("delivery_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_browser" ADD CONSTRAINT "_pages_v_blocks_menu_browser_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_browser_locales" ADD CONSTRAINT "_pages_v_blocks_menu_browser_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_menu_browser"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_links_locales" ADD CONSTRAINT "_pages_v_blocks_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_locales" ADD CONSTRAINT "_pages_v_blocks_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_content_links" ADD CONSTRAINT "_pages_v_blocks_media_content_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_content_links" ADD CONSTRAINT "_pages_v_blocks_media_content_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_content_links_locales" ADD CONSTRAINT "_pages_v_blocks_media_content_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_content_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_content" ADD CONSTRAINT "_pages_v_blocks_media_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_content" ADD CONSTRAINT "_pages_v_blocks_media_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_content_locales" ADD CONSTRAINT "_pages_v_blocks_media_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_highlights" ADD CONSTRAINT "_pages_v_blocks_menu_highlights_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_highlights" ADD CONSTRAINT "_pages_v_blocks_menu_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_menu_highlights_locales" ADD CONSTRAINT "_pages_v_blocks_menu_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_menu_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_full_menu" ADD CONSTRAINT "_pages_v_blocks_full_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_full_menu_locales" ADD CONSTRAINT "_pages_v_blocks_full_menu_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_full_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_locales" ADD CONSTRAINT "_pages_v_blocks_gallery_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_quotes" ADD CONSTRAINT "_pages_v_blocks_testimonials_quotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_quotes_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_quotes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials_quotes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_locales" ADD CONSTRAINT "_pages_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_visit_us" ADD CONSTRAINT "_pages_v_blocks_visit_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_visit_us_locales" ADD CONSTRAINT "_pages_v_blocks_visit_us_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_visit_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links_locales" ADD CONSTRAINT "_pages_v_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD CONSTRAINT "_pages_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_texts" ADD CONSTRAINT "_pages_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_menu_items_fk" FOREIGN KEY ("menu_items_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_items_tags" ADD CONSTRAINT "menu_items_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_items_variants" ADD CONSTRAINT "menu_items_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_items_variants_locales" ADD CONSTRAINT "menu_items_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu_items_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menu_items_locales" ADD CONSTRAINT "menu_items_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menu_items_locales" ADD CONSTRAINT "menu_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_items_rels" ADD CONSTRAINT "menu_items_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_items_rels" ADD CONSTRAINT "menu_items_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_menu_items_v_version_tags" ADD CONSTRAINT "_menu_items_v_version_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_menu_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_menu_items_v_version_variants" ADD CONSTRAINT "_menu_items_v_version_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_menu_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_menu_items_v_version_variants_locales" ADD CONSTRAINT "_menu_items_v_version_variants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_menu_items_v_version_variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_menu_items_v" ADD CONSTRAINT "_menu_items_v_parent_id_menu_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menu_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_menu_items_v" ADD CONSTRAINT "_menu_items_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_menu_items_v" ADD CONSTRAINT "_menu_items_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_menu_items_v_locales" ADD CONSTRAINT "_menu_items_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_menu_items_v_locales" ADD CONSTRAINT "_menu_items_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_menu_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_menu_items_v_rels" ADD CONSTRAINT "_menu_items_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_menu_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_menu_items_v_rels" ADD CONSTRAINT "_menu_items_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menu_items_fk" FOREIGN KEY ("menu_items_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_subscribers_fk" FOREIGN KEY ("subscribers_id") REFERENCES "public"."subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_catering_requests_fk" FOREIGN KEY ("catering_requests_id") REFERENCES "public"."catering_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_messages_fk" FOREIGN KEY ("contact_messages_id") REFERENCES "public"."contact_messages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_socials" ADD CONSTRAINT "site_settings_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_hours" ADD CONSTRAINT "site_settings_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_hours_locales" ADD CONSTRAINT "site_settings_hours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_announcement_link_reference_id_pages_id_fk" FOREIGN KEY ("announcement_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_locales" ADD CONSTRAINT "header_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_info_bar" ADD CONSTRAINT "header_info_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_info_bar_locales" ADD CONSTRAINT "header_info_bar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_info_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_ticker" ADD CONSTRAINT "header_ticker_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_ticker_locales" ADD CONSTRAINT "header_ticker_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_ticker"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_cta_reference_id_pages_id_fk" FOREIGN KEY ("cta_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_promo_link_reference_id_pages_id_fk" FOREIGN KEY ("promo_link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_locales" ADD CONSTRAINT "header_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items_locales" ADD CONSTRAINT "footer_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_home_hero_links_order_idx" ON "pages_blocks_home_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_links_parent_id_idx" ON "pages_blocks_home_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_links_link_link_reference_idx" ON "pages_blocks_home_hero_links" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_home_hero_links_locales_locale_parent_id_unique" ON "pages_blocks_home_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_home_hero_links_locales_parent_id_idx" ON "pages_blocks_home_hero_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_slides_order_idx" ON "pages_blocks_home_hero_slides" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_slides_parent_id_idx" ON "pages_blocks_home_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_slides_menu_item_idx" ON "pages_blocks_home_hero_slides" USING btree ("menu_item_id");
  CREATE INDEX "pages_blocks_home_hero_slides_image_idx" ON "pages_blocks_home_hero_slides" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_home_hero_slides_locales_locale_parent_id_uniqu" ON "pages_blocks_home_hero_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_home_hero_slides_locales_parent_id_idx" ON "pages_blocks_home_hero_slides_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_order_idx" ON "pages_blocks_home_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_hero_parent_id_idx" ON "pages_blocks_home_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_hero_path_idx" ON "pages_blocks_home_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_hero_pill_image_idx" ON "pages_blocks_home_hero" USING btree ("pill_image_id");
  CREATE INDEX "pages_blocks_home_hero_polaroid_polaroid_image_idx" ON "pages_blocks_home_hero" USING btree ("polaroid_image_id");
  CREATE INDEX "pages_blocks_home_hero_order_link_order_link_reference_idx" ON "pages_blocks_home_hero" USING btree ("order_link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_home_hero_locales_locale_parent_id_unique" ON "pages_blocks_home_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_home_hero_locales_parent_id_idx" ON "pages_blocks_home_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ribbons_order_idx" ON "pages_blocks_ribbons" USING btree ("_order");
  CREATE INDEX "pages_blocks_ribbons_parent_id_idx" ON "pages_blocks_ribbons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ribbons_path_idx" ON "pages_blocks_ribbons" USING btree ("_path");
  CREATE INDEX "pages_blocks_menu_board_order_idx" ON "pages_blocks_menu_board" USING btree ("_order");
  CREATE INDEX "pages_blocks_menu_board_parent_id_idx" ON "pages_blocks_menu_board" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_menu_board_path_idx" ON "pages_blocks_menu_board" USING btree ("_path");
  CREATE INDEX "pages_blocks_menu_board_menu_link_menu_link_reference_idx" ON "pages_blocks_menu_board" USING btree ("menu_link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_menu_board_locales_locale_parent_id_unique" ON "pages_blocks_menu_board_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_menu_board_locales_parent_id_idx" ON "pages_blocks_menu_board_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_plate_parade_order_idx" ON "pages_blocks_plate_parade" USING btree ("_order");
  CREATE INDEX "pages_blocks_plate_parade_parent_id_idx" ON "pages_blocks_plate_parade" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_plate_parade_path_idx" ON "pages_blocks_plate_parade" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_plate_parade_locales_locale_parent_id_unique" ON "pages_blocks_plate_parade_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_plate_parade_locales_parent_id_idx" ON "pages_blocks_plate_parade_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_coffee_orbit_order_idx" ON "pages_blocks_coffee_orbit" USING btree ("_order");
  CREATE INDEX "pages_blocks_coffee_orbit_parent_id_idx" ON "pages_blocks_coffee_orbit" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_coffee_orbit_path_idx" ON "pages_blocks_coffee_orbit" USING btree ("_path");
  CREATE INDEX "pages_blocks_coffee_orbit_image_idx" ON "pages_blocks_coffee_orbit" USING btree ("image_id");
  CREATE INDEX "pages_blocks_coffee_orbit_note_link_note_link_reference_idx" ON "pages_blocks_coffee_orbit" USING btree ("note_link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_coffee_orbit_locales_locale_parent_id_unique" ON "pages_blocks_coffee_orbit_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_coffee_orbit_locales_parent_id_idx" ON "pages_blocks_coffee_orbit_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_mural_story_callouts_order_idx" ON "pages_blocks_mural_story_callouts" USING btree ("_order");
  CREATE INDEX "pages_blocks_mural_story_callouts_parent_id_idx" ON "pages_blocks_mural_story_callouts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_mural_story_callouts_image_idx" ON "pages_blocks_mural_story_callouts" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_mural_story_callouts_locales_locale_parent_id_u" ON "pages_blocks_mural_story_callouts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_mural_story_callouts_locales_parent_id_idx" ON "pages_blocks_mural_story_callouts_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_mural_story_order_idx" ON "pages_blocks_mural_story" USING btree ("_order");
  CREATE INDEX "pages_blocks_mural_story_parent_id_idx" ON "pages_blocks_mural_story" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_mural_story_path_idx" ON "pages_blocks_mural_story" USING btree ("_path");
  CREATE INDEX "pages_blocks_mural_story_image_idx" ON "pages_blocks_mural_story" USING btree ("image_id");
  CREATE INDEX "pages_blocks_mural_story_link_link_reference_idx" ON "pages_blocks_mural_story" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_mural_story_locales_locale_parent_id_unique" ON "pages_blocks_mural_story_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_mural_story_locales_parent_id_idx" ON "pages_blocks_mural_story_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gram_wall_order_idx" ON "pages_blocks_gram_wall" USING btree ("_order");
  CREATE INDEX "pages_blocks_gram_wall_parent_id_idx" ON "pages_blocks_gram_wall" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gram_wall_path_idx" ON "pages_blocks_gram_wall" USING btree ("_path");
  CREATE INDEX "pages_blocks_gram_wall_link_link_reference_idx" ON "pages_blocks_gram_wall" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_gram_wall_locales_locale_parent_id_unique" ON "pages_blocks_gram_wall_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gram_wall_locales_parent_id_idx" ON "pages_blocks_gram_wall_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_review_thread_ratings_order_idx" ON "pages_blocks_review_thread_ratings" USING btree ("_order");
  CREATE INDEX "pages_blocks_review_thread_ratings_parent_id_idx" ON "pages_blocks_review_thread_ratings" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_review_thread_reviews_order_idx" ON "pages_blocks_review_thread_reviews" USING btree ("_order");
  CREATE INDEX "pages_blocks_review_thread_reviews_parent_id_idx" ON "pages_blocks_review_thread_reviews" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_review_thread_reviews_locales_locale_parent_id_" ON "pages_blocks_review_thread_reviews_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_review_thread_reviews_locales_parent_id_idx" ON "pages_blocks_review_thread_reviews_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_review_thread_order_idx" ON "pages_blocks_review_thread" USING btree ("_order");
  CREATE INDEX "pages_blocks_review_thread_parent_id_idx" ON "pages_blocks_review_thread" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_review_thread_path_idx" ON "pages_blocks_review_thread" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_review_thread_locales_locale_parent_id_unique" ON "pages_blocks_review_thread_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_review_thread_locales_parent_id_idx" ON "pages_blocks_review_thread_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_visit_hours_order_idx" ON "pages_blocks_visit_hours" USING btree ("_order");
  CREATE INDEX "pages_blocks_visit_hours_parent_id_idx" ON "pages_blocks_visit_hours" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_visit_hours_path_idx" ON "pages_blocks_visit_hours" USING btree ("_path");
  CREATE INDEX "pages_blocks_visit_hours_map_image_idx" ON "pages_blocks_visit_hours" USING btree ("map_image_id");
  CREATE UNIQUE INDEX "pages_blocks_visit_hours_locales_locale_parent_id_unique" ON "pages_blocks_visit_hours_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_visit_hours_locales_parent_id_idx" ON "pages_blocks_visit_hours_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_sun_cta_order_idx" ON "pages_blocks_sun_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_sun_cta_parent_id_idx" ON "pages_blocks_sun_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_sun_cta_path_idx" ON "pages_blocks_sun_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_sun_cta_link_link_reference_idx" ON "pages_blocks_sun_cta" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_sun_cta_locales_locale_parent_id_unique" ON "pages_blocks_sun_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_sun_cta_locales_parent_id_idx" ON "pages_blocks_sun_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_hero_links_order_idx" ON "pages_blocks_catering_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_catering_hero_links_parent_id_idx" ON "pages_blocks_catering_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_hero_links_link_link_reference_idx" ON "pages_blocks_catering_hero_links" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_catering_hero_links_locales_locale_parent_id_un" ON "pages_blocks_catering_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_catering_hero_links_locales_parent_id_idx" ON "pages_blocks_catering_hero_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_hero_facts_order_idx" ON "pages_blocks_catering_hero_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_catering_hero_facts_parent_id_idx" ON "pages_blocks_catering_hero_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_catering_hero_facts_locales_locale_parent_id_un" ON "pages_blocks_catering_hero_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_catering_hero_facts_locales_parent_id_idx" ON "pages_blocks_catering_hero_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_hero_order_idx" ON "pages_blocks_catering_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_catering_hero_parent_id_idx" ON "pages_blocks_catering_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_hero_path_idx" ON "pages_blocks_catering_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_catering_hero_photos_photos_main_idx" ON "pages_blocks_catering_hero" USING btree ("photos_main_id");
  CREATE INDEX "pages_blocks_catering_hero_photos_photos_side_idx" ON "pages_blocks_catering_hero" USING btree ("photos_side_id");
  CREATE INDEX "pages_blocks_catering_hero_photos_photos_small_idx" ON "pages_blocks_catering_hero" USING btree ("photos_small_id");
  CREATE UNIQUE INDEX "pages_blocks_catering_hero_locales_locale_parent_id_unique" ON "pages_blocks_catering_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_catering_hero_locales_parent_id_idx" ON "pages_blocks_catering_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_ribbon_order_idx" ON "pages_blocks_catering_ribbon" USING btree ("_order");
  CREATE INDEX "pages_blocks_catering_ribbon_parent_id_idx" ON "pages_blocks_catering_ribbon" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_ribbon_path_idx" ON "pages_blocks_catering_ribbon" USING btree ("_path");
  CREATE INDEX "pages_blocks_catering_menu_categories_items_order_idx" ON "pages_blocks_catering_menu_categories_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_catering_menu_categories_items_parent_id_idx" ON "pages_blocks_catering_menu_categories_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_catering_menu_categories_items_locales_locale_p" ON "pages_blocks_catering_menu_categories_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_catering_menu_categories_items_locales_pare_idx" ON "pages_blocks_catering_menu_categories_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_menu_categories_order_idx" ON "pages_blocks_catering_menu_categories" USING btree ("_order");
  CREATE INDEX "pages_blocks_catering_menu_categories_parent_id_idx" ON "pages_blocks_catering_menu_categories" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_menu_categories_image_idx" ON "pages_blocks_catering_menu_categories" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_catering_menu_categories_locales_locale_parent_" ON "pages_blocks_catering_menu_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_catering_menu_categories_locales_parent_id_idx" ON "pages_blocks_catering_menu_categories_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_menu_order_idx" ON "pages_blocks_catering_menu" USING btree ("_order");
  CREATE INDEX "pages_blocks_catering_menu_parent_id_idx" ON "pages_blocks_catering_menu" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_menu_path_idx" ON "pages_blocks_catering_menu" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_catering_menu_locales_locale_parent_id_unique" ON "pages_blocks_catering_menu_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_catering_menu_locales_parent_id_idx" ON "pages_blocks_catering_menu_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_use_cases_cases_order_idx" ON "pages_blocks_catering_use_cases_cases" USING btree ("_order");
  CREATE INDEX "pages_blocks_catering_use_cases_cases_parent_id_idx" ON "pages_blocks_catering_use_cases_cases" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_catering_use_cases_cases_locales_locale_parent_" ON "pages_blocks_catering_use_cases_cases_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_catering_use_cases_cases_locales_parent_id_idx" ON "pages_blocks_catering_use_cases_cases_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_use_cases_order_idx" ON "pages_blocks_catering_use_cases" USING btree ("_order");
  CREATE INDEX "pages_blocks_catering_use_cases_parent_id_idx" ON "pages_blocks_catering_use_cases" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_use_cases_path_idx" ON "pages_blocks_catering_use_cases" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_catering_use_cases_locales_locale_parent_id_uni" ON "pages_blocks_catering_use_cases_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_catering_use_cases_locales_parent_id_idx" ON "pages_blocks_catering_use_cases_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_steps_steps_order_idx" ON "pages_blocks_catering_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_catering_steps_steps_parent_id_idx" ON "pages_blocks_catering_steps_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_catering_steps_steps_locales_locale_parent_id_u" ON "pages_blocks_catering_steps_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_catering_steps_steps_locales_parent_id_idx" ON "pages_blocks_catering_steps_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_steps_order_idx" ON "pages_blocks_catering_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_catering_steps_parent_id_idx" ON "pages_blocks_catering_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_steps_path_idx" ON "pages_blocks_catering_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_catering_steps_locales_locale_parent_id_unique" ON "pages_blocks_catering_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_catering_steps_locales_parent_id_idx" ON "pages_blocks_catering_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_quote_faqs_order_idx" ON "pages_blocks_catering_quote_faqs" USING btree ("_order");
  CREATE INDEX "pages_blocks_catering_quote_faqs_parent_id_idx" ON "pages_blocks_catering_quote_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_catering_quote_faqs_locales_locale_parent_id_un" ON "pages_blocks_catering_quote_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_catering_quote_faqs_locales_parent_id_idx" ON "pages_blocks_catering_quote_faqs_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_quote_order_idx" ON "pages_blocks_catering_quote" USING btree ("_order");
  CREATE INDEX "pages_blocks_catering_quote_parent_id_idx" ON "pages_blocks_catering_quote" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_catering_quote_path_idx" ON "pages_blocks_catering_quote" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_catering_quote_locales_locale_parent_id_unique" ON "pages_blocks_catering_quote_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_catering_quote_locales_parent_id_idx" ON "pages_blocks_catering_quote_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gift_card_hero_amounts_order_idx" ON "pages_blocks_gift_card_hero_amounts" USING btree ("_order");
  CREATE INDEX "pages_blocks_gift_card_hero_amounts_parent_id_idx" ON "pages_blocks_gift_card_hero_amounts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gift_card_hero_order_idx" ON "pages_blocks_gift_card_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_gift_card_hero_parent_id_idx" ON "pages_blocks_gift_card_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gift_card_hero_path_idx" ON "pages_blocks_gift_card_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_gift_card_hero_buy_link_buy_link_reference_idx" ON "pages_blocks_gift_card_hero" USING btree ("buy_link_reference_id");
  CREATE INDEX "pages_blocks_gift_card_hero_balance_link_balance_link_re_idx" ON "pages_blocks_gift_card_hero" USING btree ("balance_link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_gift_card_hero_locales_locale_parent_id_unique" ON "pages_blocks_gift_card_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gift_card_hero_locales_parent_id_idx" ON "pages_blocks_gift_card_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gift_card_steps_steps_order_idx" ON "pages_blocks_gift_card_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_gift_card_steps_steps_parent_id_idx" ON "pages_blocks_gift_card_steps_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_gift_card_steps_steps_locales_locale_parent_id_" ON "pages_blocks_gift_card_steps_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gift_card_steps_steps_locales_parent_id_idx" ON "pages_blocks_gift_card_steps_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gift_card_steps_order_idx" ON "pages_blocks_gift_card_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_gift_card_steps_parent_id_idx" ON "pages_blocks_gift_card_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gift_card_steps_path_idx" ON "pages_blocks_gift_card_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_gift_card_steps_locales_locale_parent_id_unique" ON "pages_blocks_gift_card_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gift_card_steps_locales_parent_id_idx" ON "pages_blocks_gift_card_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gift_card_panels_panels_order_idx" ON "pages_blocks_gift_card_panels_panels" USING btree ("_order");
  CREATE INDEX "pages_blocks_gift_card_panels_panels_parent_id_idx" ON "pages_blocks_gift_card_panels_panels" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gift_card_panels_panels_link_link_reference_idx" ON "pages_blocks_gift_card_panels_panels" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_gift_card_panels_panels_locales_locale_parent_i" ON "pages_blocks_gift_card_panels_panels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gift_card_panels_panels_locales_parent_id_idx" ON "pages_blocks_gift_card_panels_panels_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gift_card_panels_order_idx" ON "pages_blocks_gift_card_panels" USING btree ("_order");
  CREATE INDEX "pages_blocks_gift_card_panels_parent_id_idx" ON "pages_blocks_gift_card_panels" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gift_card_panels_path_idx" ON "pages_blocks_gift_card_panels" USING btree ("_path");
  CREATE INDEX "pages_blocks_gift_card_faq_items_order_idx" ON "pages_blocks_gift_card_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_gift_card_faq_items_parent_id_idx" ON "pages_blocks_gift_card_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_gift_card_faq_items_locales_locale_parent_id_un" ON "pages_blocks_gift_card_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gift_card_faq_items_locales_parent_id_idx" ON "pages_blocks_gift_card_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gift_card_faq_order_idx" ON "pages_blocks_gift_card_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_gift_card_faq_parent_id_idx" ON "pages_blocks_gift_card_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gift_card_faq_path_idx" ON "pages_blocks_gift_card_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_gift_card_faq_locales_locale_parent_id_unique" ON "pages_blocks_gift_card_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gift_card_faq_locales_parent_id_idx" ON "pages_blocks_gift_card_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_hero_polaroids_order_idx" ON "pages_blocks_about_hero_polaroids" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_hero_polaroids_parent_id_idx" ON "pages_blocks_about_hero_polaroids" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_hero_polaroids_image_idx" ON "pages_blocks_about_hero_polaroids" USING btree ("image_id");
  CREATE INDEX "pages_blocks_about_hero_order_idx" ON "pages_blocks_about_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_hero_parent_id_idx" ON "pages_blocks_about_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_hero_path_idx" ON "pages_blocks_about_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_belief_plates_order_idx" ON "pages_blocks_about_belief_plates" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_belief_plates_parent_id_idx" ON "pages_blocks_about_belief_plates" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_belief_plates_image_idx" ON "pages_blocks_about_belief_plates" USING btree ("image_id");
  CREATE INDEX "pages_blocks_about_belief_order_idx" ON "pages_blocks_about_belief" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_belief_parent_id_idx" ON "pages_blocks_about_belief" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_belief_path_idx" ON "pages_blocks_about_belief" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_kitchen_pillars_order_idx" ON "pages_blocks_about_kitchen_pillars" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_kitchen_pillars_parent_id_idx" ON "pages_blocks_about_kitchen_pillars" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_kitchen_order_idx" ON "pages_blocks_about_kitchen" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_kitchen_parent_id_idx" ON "pages_blocks_about_kitchen" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_kitchen_path_idx" ON "pages_blocks_about_kitchen" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_kitchen_photos_photos_main_idx" ON "pages_blocks_about_kitchen" USING btree ("photos_main_id");
  CREATE INDEX "pages_blocks_about_kitchen_photos_photos_round_idx" ON "pages_blocks_about_kitchen" USING btree ("photos_round_id");
  CREATE INDEX "pages_blocks_about_kitchen_photos_photos_small_idx" ON "pages_blocks_about_kitchen" USING btree ("photos_small_id");
  CREATE INDEX "pages_blocks_about_gallery_photos_order_idx" ON "pages_blocks_about_gallery_photos" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_gallery_photos_parent_id_idx" ON "pages_blocks_about_gallery_photos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_gallery_photos_image_idx" ON "pages_blocks_about_gallery_photos" USING btree ("image_id");
  CREATE INDEX "pages_blocks_about_gallery_order_idx" ON "pages_blocks_about_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_gallery_parent_id_idx" ON "pages_blocks_about_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_gallery_path_idx" ON "pages_blocks_about_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_team_members_order_idx" ON "pages_blocks_about_team_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_team_members_parent_id_idx" ON "pages_blocks_about_team_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_team_members_photo_idx" ON "pages_blocks_about_team_members" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_about_team_order_idx" ON "pages_blocks_about_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_team_parent_id_idx" ON "pages_blocks_about_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_team_path_idx" ON "pages_blocks_about_team" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_team_hiring_link_hiring_link_referenc_idx" ON "pages_blocks_about_team" USING btree ("hiring_link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_about_team_locales_locale_parent_id_unique" ON "pages_blocks_about_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_team_locales_parent_id_idx" ON "pages_blocks_about_team_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_closing_links_order_idx" ON "pages_blocks_about_closing_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_closing_links_parent_id_idx" ON "pages_blocks_about_closing_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_closing_links_link_link_reference_idx" ON "pages_blocks_about_closing_links" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_about_closing_links_locales_locale_parent_id_un" ON "pages_blocks_about_closing_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_about_closing_links_locales_parent_id_idx" ON "pages_blocks_about_closing_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_closing_order_idx" ON "pages_blocks_about_closing" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_closing_parent_id_idx" ON "pages_blocks_about_closing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_closing_path_idx" ON "pages_blocks_about_closing" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_hero_links_order_idx" ON "pages_blocks_contact_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_hero_links_parent_id_idx" ON "pages_blocks_contact_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_hero_links_link_link_reference_idx" ON "pages_blocks_contact_hero_links" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_hero_links_locales_locale_parent_id_uni" ON "pages_blocks_contact_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_hero_links_locales_parent_id_idx" ON "pages_blocks_contact_hero_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_hero_hours_rows_order_idx" ON "pages_blocks_contact_hero_hours_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_hero_hours_rows_parent_id_idx" ON "pages_blocks_contact_hero_hours_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_hero_order_idx" ON "pages_blocks_contact_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_hero_parent_id_idx" ON "pages_blocks_contact_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_hero_path_idx" ON "pages_blocks_contact_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_hero_photo_idx" ON "pages_blocks_contact_hero" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_contact_form_details_order_idx" ON "pages_blocks_contact_form_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_details_parent_id_idx" ON "pages_blocks_contact_form_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_callout_link_callout_link_refe_idx" ON "pages_blocks_contact_form" USING btree ("callout_link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_form_locales_locale_parent_id_unique" ON "pages_blocks_contact_form_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_form_locales_parent_id_idx" ON "pages_blocks_contact_form_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_find_facts_order_idx" ON "pages_blocks_contact_find_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_find_facts_parent_id_idx" ON "pages_blocks_contact_find_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_find_order_idx" ON "pages_blocks_contact_find" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_find_parent_id_idx" ON "pages_blocks_contact_find" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_find_path_idx" ON "pages_blocks_contact_find" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_find_link_link_reference_idx" ON "pages_blocks_contact_find" USING btree ("link_reference_id");
  CREATE INDEX "pages_blocks_contact_find_main_photo_idx" ON "pages_blocks_contact_find" USING btree ("main_photo_id");
  CREATE INDEX "pages_blocks_contact_find_side_photo_idx" ON "pages_blocks_contact_find" USING btree ("side_photo_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_find_locales_locale_parent_id_unique" ON "pages_blocks_contact_find_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_find_locales_parent_id_idx" ON "pages_blocks_contact_find_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_order_hero_order_idx" ON "pages_blocks_order_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_order_hero_parent_id_idx" ON "pages_blocks_order_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_order_hero_path_idx" ON "pages_blocks_order_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_order_hero_menu_link_menu_link_reference_idx" ON "pages_blocks_order_hero" USING btree ("menu_link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_order_hero_locales_locale_parent_id_unique" ON "pages_blocks_order_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_order_hero_locales_parent_id_idx" ON "pages_blocks_order_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_order_choices_pickup_steps_order_idx" ON "pages_blocks_order_choices_pickup_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_order_choices_pickup_steps_parent_id_idx" ON "pages_blocks_order_choices_pickup_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_order_choices_delivery_apps_order_idx" ON "pages_blocks_order_choices_delivery_apps" USING btree ("_order");
  CREATE INDEX "pages_blocks_order_choices_delivery_apps_parent_id_idx" ON "pages_blocks_order_choices_delivery_apps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_order_choices_order_idx" ON "pages_blocks_order_choices" USING btree ("_order");
  CREATE INDEX "pages_blocks_order_choices_parent_id_idx" ON "pages_blocks_order_choices" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_order_choices_path_idx" ON "pages_blocks_order_choices" USING btree ("_path");
  CREATE INDEX "pages_blocks_order_choices_pickup_link_pickup_link_refer_idx" ON "pages_blocks_order_choices" USING btree ("pickup_link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_order_choices_locales_locale_parent_id_unique" ON "pages_blocks_order_choices_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_order_choices_locales_parent_id_idx" ON "pages_blocks_order_choices_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_menu_browser_order_idx" ON "pages_blocks_menu_browser" USING btree ("_order");
  CREATE INDEX "pages_blocks_menu_browser_parent_id_idx" ON "pages_blocks_menu_browser" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_menu_browser_path_idx" ON "pages_blocks_menu_browser" USING btree ("_path");
  CREATE INDEX "pages_blocks_menu_browser_pickup_link_pickup_link_refere_idx" ON "pages_blocks_menu_browser" USING btree ("pickup_link_reference_id");
  CREATE INDEX "pages_blocks_menu_browser_delivery_link_delivery_link_re_idx" ON "pages_blocks_menu_browser" USING btree ("delivery_link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_menu_browser_locales_locale_parent_id_unique" ON "pages_blocks_menu_browser_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_menu_browser_locales_parent_id_idx" ON "pages_blocks_menu_browser_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_links_order_idx" ON "pages_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_links_parent_id_idx" ON "pages_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_links_link_link_reference_idx" ON "pages_blocks_hero_links" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_links_locales_locale_parent_id_unique" ON "pages_blocks_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_links_locales_parent_id_idx" ON "pages_blocks_hero_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_locales_parent_id_idx" ON "pages_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_content_locales_locale_parent_id_unique" ON "pages_blocks_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_content_locales_parent_id_idx" ON "pages_blocks_content_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_content_links_order_idx" ON "pages_blocks_media_content_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_content_links_parent_id_idx" ON "pages_blocks_media_content_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_content_links_link_link_reference_idx" ON "pages_blocks_media_content_links" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_media_content_links_locales_locale_parent_id_un" ON "pages_blocks_media_content_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_media_content_links_locales_parent_id_idx" ON "pages_blocks_media_content_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_content_order_idx" ON "pages_blocks_media_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_content_parent_id_idx" ON "pages_blocks_media_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_content_path_idx" ON "pages_blocks_media_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_content_image_idx" ON "pages_blocks_media_content" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_media_content_locales_locale_parent_id_unique" ON "pages_blocks_media_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_media_content_locales_parent_id_idx" ON "pages_blocks_media_content_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_menu_highlights_order_idx" ON "pages_blocks_menu_highlights" USING btree ("_order");
  CREATE INDEX "pages_blocks_menu_highlights_parent_id_idx" ON "pages_blocks_menu_highlights" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_menu_highlights_path_idx" ON "pages_blocks_menu_highlights" USING btree ("_path");
  CREATE INDEX "pages_blocks_menu_highlights_category_idx" ON "pages_blocks_menu_highlights" USING btree ("category_id");
  CREATE UNIQUE INDEX "pages_blocks_menu_highlights_locales_locale_parent_id_unique" ON "pages_blocks_menu_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_menu_highlights_locales_parent_id_idx" ON "pages_blocks_menu_highlights_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_full_menu_order_idx" ON "pages_blocks_full_menu" USING btree ("_order");
  CREATE INDEX "pages_blocks_full_menu_parent_id_idx" ON "pages_blocks_full_menu" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_full_menu_path_idx" ON "pages_blocks_full_menu" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_full_menu_locales_locale_parent_id_unique" ON "pages_blocks_full_menu_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_full_menu_locales_parent_id_idx" ON "pages_blocks_full_menu_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_gallery_locales_locale_parent_id_unique" ON "pages_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_gallery_locales_parent_id_idx" ON "pages_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_quotes_order_idx" ON "pages_blocks_testimonials_quotes" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_quotes_parent_id_idx" ON "pages_blocks_testimonials_quotes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_quotes_locales_locale_parent_id_un" ON "pages_blocks_testimonials_quotes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonials_quotes_locales_parent_id_idx" ON "pages_blocks_testimonials_quotes_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_locales_locale_parent_id_unique" ON "pages_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_testimonials_locales_parent_id_idx" ON "pages_blocks_testimonials_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_items_locales_locale_parent_id_unique" ON "pages_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_items_locales_parent_id_idx" ON "pages_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_locales_parent_id_idx" ON "pages_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_visit_us_order_idx" ON "pages_blocks_visit_us" USING btree ("_order");
  CREATE INDEX "pages_blocks_visit_us_parent_id_idx" ON "pages_blocks_visit_us" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_visit_us_path_idx" ON "pages_blocks_visit_us" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_visit_us_locales_locale_parent_id_unique" ON "pages_blocks_visit_us_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_visit_us_locales_parent_id_idx" ON "pages_blocks_visit_us_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_links_link_link_reference_idx" ON "pages_blocks_cta_links" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_links_locales_locale_parent_id_unique" ON "pages_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_links_locales_parent_id_idx" ON "pages_blocks_cta_links_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_cta_locales_parent_id_idx" ON "pages_blocks_cta_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_texts_order_parent" ON "pages_texts" USING btree ("order","parent_id");
  CREATE INDEX "pages_texts_locale_parent" ON "pages_texts" USING btree ("locale","parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id");
  CREATE INDEX "pages_rels_menu_items_id_idx" ON "pages_rels" USING btree ("menu_items_id");
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_home_hero_links_order_idx" ON "_pages_v_blocks_home_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_hero_links_parent_id_idx" ON "_pages_v_blocks_home_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_links_link_link_reference_idx" ON "_pages_v_blocks_home_hero_links" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_home_hero_links_locales_locale_parent_id_uni" ON "_pages_v_blocks_home_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_links_locales_parent_id_idx" ON "_pages_v_blocks_home_hero_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_slides_order_idx" ON "_pages_v_blocks_home_hero_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_hero_slides_parent_id_idx" ON "_pages_v_blocks_home_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_slides_menu_item_idx" ON "_pages_v_blocks_home_hero_slides" USING btree ("menu_item_id");
  CREATE INDEX "_pages_v_blocks_home_hero_slides_image_idx" ON "_pages_v_blocks_home_hero_slides" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_home_hero_slides_locales_locale_parent_id_un" ON "_pages_v_blocks_home_hero_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_slides_locales_parent_id_idx" ON "_pages_v_blocks_home_hero_slides_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_order_idx" ON "_pages_v_blocks_home_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_hero_parent_id_idx" ON "_pages_v_blocks_home_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_path_idx" ON "_pages_v_blocks_home_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_hero_pill_image_idx" ON "_pages_v_blocks_home_hero" USING btree ("pill_image_id");
  CREATE INDEX "_pages_v_blocks_home_hero_polaroid_polaroid_image_idx" ON "_pages_v_blocks_home_hero" USING btree ("polaroid_image_id");
  CREATE INDEX "_pages_v_blocks_home_hero_order_link_order_link_referenc_idx" ON "_pages_v_blocks_home_hero" USING btree ("order_link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_home_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_home_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_home_hero_locales_parent_id_idx" ON "_pages_v_blocks_home_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ribbons_order_idx" ON "_pages_v_blocks_ribbons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ribbons_parent_id_idx" ON "_pages_v_blocks_ribbons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ribbons_path_idx" ON "_pages_v_blocks_ribbons" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_menu_board_order_idx" ON "_pages_v_blocks_menu_board" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_menu_board_parent_id_idx" ON "_pages_v_blocks_menu_board" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_board_path_idx" ON "_pages_v_blocks_menu_board" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_menu_board_menu_link_menu_link_reference_idx" ON "_pages_v_blocks_menu_board" USING btree ("menu_link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_menu_board_locales_locale_parent_id_unique" ON "_pages_v_blocks_menu_board_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_board_locales_parent_id_idx" ON "_pages_v_blocks_menu_board_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_plate_parade_order_idx" ON "_pages_v_blocks_plate_parade" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_plate_parade_parent_id_idx" ON "_pages_v_blocks_plate_parade" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_plate_parade_path_idx" ON "_pages_v_blocks_plate_parade" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_plate_parade_locales_locale_parent_id_unique" ON "_pages_v_blocks_plate_parade_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_plate_parade_locales_parent_id_idx" ON "_pages_v_blocks_plate_parade_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_coffee_orbit_order_idx" ON "_pages_v_blocks_coffee_orbit" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_coffee_orbit_parent_id_idx" ON "_pages_v_blocks_coffee_orbit" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_coffee_orbit_path_idx" ON "_pages_v_blocks_coffee_orbit" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_coffee_orbit_image_idx" ON "_pages_v_blocks_coffee_orbit" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_coffee_orbit_note_link_note_link_referen_idx" ON "_pages_v_blocks_coffee_orbit" USING btree ("note_link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_coffee_orbit_locales_locale_parent_id_unique" ON "_pages_v_blocks_coffee_orbit_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_coffee_orbit_locales_parent_id_idx" ON "_pages_v_blocks_coffee_orbit_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_mural_story_callouts_order_idx" ON "_pages_v_blocks_mural_story_callouts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_mural_story_callouts_parent_id_idx" ON "_pages_v_blocks_mural_story_callouts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_mural_story_callouts_image_idx" ON "_pages_v_blocks_mural_story_callouts" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_mural_story_callouts_locales_locale_parent_i" ON "_pages_v_blocks_mural_story_callouts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_mural_story_callouts_locales_parent_id_idx" ON "_pages_v_blocks_mural_story_callouts_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_mural_story_order_idx" ON "_pages_v_blocks_mural_story" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_mural_story_parent_id_idx" ON "_pages_v_blocks_mural_story" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_mural_story_path_idx" ON "_pages_v_blocks_mural_story" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_mural_story_image_idx" ON "_pages_v_blocks_mural_story" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_mural_story_link_link_reference_idx" ON "_pages_v_blocks_mural_story" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_mural_story_locales_locale_parent_id_unique" ON "_pages_v_blocks_mural_story_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_mural_story_locales_parent_id_idx" ON "_pages_v_blocks_mural_story_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gram_wall_order_idx" ON "_pages_v_blocks_gram_wall" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gram_wall_parent_id_idx" ON "_pages_v_blocks_gram_wall" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gram_wall_path_idx" ON "_pages_v_blocks_gram_wall" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gram_wall_link_link_reference_idx" ON "_pages_v_blocks_gram_wall" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_gram_wall_locales_locale_parent_id_unique" ON "_pages_v_blocks_gram_wall_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gram_wall_locales_parent_id_idx" ON "_pages_v_blocks_gram_wall_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_review_thread_ratings_order_idx" ON "_pages_v_blocks_review_thread_ratings" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_review_thread_ratings_parent_id_idx" ON "_pages_v_blocks_review_thread_ratings" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_review_thread_reviews_order_idx" ON "_pages_v_blocks_review_thread_reviews" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_review_thread_reviews_parent_id_idx" ON "_pages_v_blocks_review_thread_reviews" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_review_thread_reviews_locales_locale_parent_" ON "_pages_v_blocks_review_thread_reviews_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_review_thread_reviews_locales_parent_id_idx" ON "_pages_v_blocks_review_thread_reviews_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_review_thread_order_idx" ON "_pages_v_blocks_review_thread" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_review_thread_parent_id_idx" ON "_pages_v_blocks_review_thread" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_review_thread_path_idx" ON "_pages_v_blocks_review_thread" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_review_thread_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_review_thread_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_review_thread_locales_parent_id_idx" ON "_pages_v_blocks_review_thread_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_visit_hours_order_idx" ON "_pages_v_blocks_visit_hours" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_visit_hours_parent_id_idx" ON "_pages_v_blocks_visit_hours" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_visit_hours_path_idx" ON "_pages_v_blocks_visit_hours" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_visit_hours_map_image_idx" ON "_pages_v_blocks_visit_hours" USING btree ("map_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_visit_hours_locales_locale_parent_id_unique" ON "_pages_v_blocks_visit_hours_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_visit_hours_locales_parent_id_idx" ON "_pages_v_blocks_visit_hours_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_sun_cta_order_idx" ON "_pages_v_blocks_sun_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_sun_cta_parent_id_idx" ON "_pages_v_blocks_sun_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_sun_cta_path_idx" ON "_pages_v_blocks_sun_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_sun_cta_link_link_reference_idx" ON "_pages_v_blocks_sun_cta" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_sun_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_sun_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_sun_cta_locales_parent_id_idx" ON "_pages_v_blocks_sun_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_hero_links_order_idx" ON "_pages_v_blocks_catering_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_catering_hero_links_parent_id_idx" ON "_pages_v_blocks_catering_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_hero_links_link_link_reference_idx" ON "_pages_v_blocks_catering_hero_links" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_catering_hero_links_locales_locale_parent_id" ON "_pages_v_blocks_catering_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_hero_links_locales_parent_id_idx" ON "_pages_v_blocks_catering_hero_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_hero_facts_order_idx" ON "_pages_v_blocks_catering_hero_facts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_catering_hero_facts_parent_id_idx" ON "_pages_v_blocks_catering_hero_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_catering_hero_facts_locales_locale_parent_id" ON "_pages_v_blocks_catering_hero_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_hero_facts_locales_parent_id_idx" ON "_pages_v_blocks_catering_hero_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_hero_order_idx" ON "_pages_v_blocks_catering_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_catering_hero_parent_id_idx" ON "_pages_v_blocks_catering_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_hero_path_idx" ON "_pages_v_blocks_catering_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_catering_hero_photos_photos_main_idx" ON "_pages_v_blocks_catering_hero" USING btree ("photos_main_id");
  CREATE INDEX "_pages_v_blocks_catering_hero_photos_photos_side_idx" ON "_pages_v_blocks_catering_hero" USING btree ("photos_side_id");
  CREATE INDEX "_pages_v_blocks_catering_hero_photos_photos_small_idx" ON "_pages_v_blocks_catering_hero" USING btree ("photos_small_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_catering_hero_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_catering_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_hero_locales_parent_id_idx" ON "_pages_v_blocks_catering_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_ribbon_order_idx" ON "_pages_v_blocks_catering_ribbon" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_catering_ribbon_parent_id_idx" ON "_pages_v_blocks_catering_ribbon" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_ribbon_path_idx" ON "_pages_v_blocks_catering_ribbon" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_catering_menu_categories_items_order_idx" ON "_pages_v_blocks_catering_menu_categories_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_catering_menu_categories_items_parent_id_idx" ON "_pages_v_blocks_catering_menu_categories_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_catering_menu_categories_items_locales_local" ON "_pages_v_blocks_catering_menu_categories_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_menu_categories_items_locales_p_idx" ON "_pages_v_blocks_catering_menu_categories_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_menu_categories_order_idx" ON "_pages_v_blocks_catering_menu_categories" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_catering_menu_categories_parent_id_idx" ON "_pages_v_blocks_catering_menu_categories" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_menu_categories_image_idx" ON "_pages_v_blocks_catering_menu_categories" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_catering_menu_categories_locales_locale_pare" ON "_pages_v_blocks_catering_menu_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_menu_categories_locales_parent__idx" ON "_pages_v_blocks_catering_menu_categories_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_menu_order_idx" ON "_pages_v_blocks_catering_menu" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_catering_menu_parent_id_idx" ON "_pages_v_blocks_catering_menu" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_menu_path_idx" ON "_pages_v_blocks_catering_menu" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_catering_menu_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_catering_menu_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_menu_locales_parent_id_idx" ON "_pages_v_blocks_catering_menu_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_use_cases_cases_order_idx" ON "_pages_v_blocks_catering_use_cases_cases" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_catering_use_cases_cases_parent_id_idx" ON "_pages_v_blocks_catering_use_cases_cases" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_catering_use_cases_cases_locales_locale_pare" ON "_pages_v_blocks_catering_use_cases_cases_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_use_cases_cases_locales_parent__idx" ON "_pages_v_blocks_catering_use_cases_cases_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_use_cases_order_idx" ON "_pages_v_blocks_catering_use_cases" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_catering_use_cases_parent_id_idx" ON "_pages_v_blocks_catering_use_cases" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_use_cases_path_idx" ON "_pages_v_blocks_catering_use_cases" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_catering_use_cases_locales_locale_parent_id_" ON "_pages_v_blocks_catering_use_cases_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_use_cases_locales_parent_id_idx" ON "_pages_v_blocks_catering_use_cases_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_steps_steps_order_idx" ON "_pages_v_blocks_catering_steps_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_catering_steps_steps_parent_id_idx" ON "_pages_v_blocks_catering_steps_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_catering_steps_steps_locales_locale_parent_i" ON "_pages_v_blocks_catering_steps_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_steps_steps_locales_parent_id_idx" ON "_pages_v_blocks_catering_steps_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_steps_order_idx" ON "_pages_v_blocks_catering_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_catering_steps_parent_id_idx" ON "_pages_v_blocks_catering_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_steps_path_idx" ON "_pages_v_blocks_catering_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_catering_steps_locales_locale_parent_id_uniq" ON "_pages_v_blocks_catering_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_steps_locales_parent_id_idx" ON "_pages_v_blocks_catering_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_quote_faqs_order_idx" ON "_pages_v_blocks_catering_quote_faqs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_catering_quote_faqs_parent_id_idx" ON "_pages_v_blocks_catering_quote_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_catering_quote_faqs_locales_locale_parent_id" ON "_pages_v_blocks_catering_quote_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_quote_faqs_locales_parent_id_idx" ON "_pages_v_blocks_catering_quote_faqs_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_quote_order_idx" ON "_pages_v_blocks_catering_quote" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_catering_quote_parent_id_idx" ON "_pages_v_blocks_catering_quote" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_quote_path_idx" ON "_pages_v_blocks_catering_quote" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_catering_quote_locales_locale_parent_id_uniq" ON "_pages_v_blocks_catering_quote_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_catering_quote_locales_parent_id_idx" ON "_pages_v_blocks_catering_quote_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gift_card_hero_amounts_order_idx" ON "_pages_v_blocks_gift_card_hero_amounts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gift_card_hero_amounts_parent_id_idx" ON "_pages_v_blocks_gift_card_hero_amounts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gift_card_hero_order_idx" ON "_pages_v_blocks_gift_card_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gift_card_hero_parent_id_idx" ON "_pages_v_blocks_gift_card_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gift_card_hero_path_idx" ON "_pages_v_blocks_gift_card_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gift_card_hero_buy_link_buy_link_referen_idx" ON "_pages_v_blocks_gift_card_hero" USING btree ("buy_link_reference_id");
  CREATE INDEX "_pages_v_blocks_gift_card_hero_balance_link_balance_link_idx" ON "_pages_v_blocks_gift_card_hero" USING btree ("balance_link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_gift_card_hero_locales_locale_parent_id_uniq" ON "_pages_v_blocks_gift_card_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gift_card_hero_locales_parent_id_idx" ON "_pages_v_blocks_gift_card_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gift_card_steps_steps_order_idx" ON "_pages_v_blocks_gift_card_steps_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gift_card_steps_steps_parent_id_idx" ON "_pages_v_blocks_gift_card_steps_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_gift_card_steps_steps_locales_locale_parent_" ON "_pages_v_blocks_gift_card_steps_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gift_card_steps_steps_locales_parent_id_idx" ON "_pages_v_blocks_gift_card_steps_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gift_card_steps_order_idx" ON "_pages_v_blocks_gift_card_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gift_card_steps_parent_id_idx" ON "_pages_v_blocks_gift_card_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gift_card_steps_path_idx" ON "_pages_v_blocks_gift_card_steps" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_gift_card_steps_locales_locale_parent_id_uni" ON "_pages_v_blocks_gift_card_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gift_card_steps_locales_parent_id_idx" ON "_pages_v_blocks_gift_card_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gift_card_panels_panels_order_idx" ON "_pages_v_blocks_gift_card_panels_panels" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gift_card_panels_panels_parent_id_idx" ON "_pages_v_blocks_gift_card_panels_panels" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gift_card_panels_panels_link_link_refere_idx" ON "_pages_v_blocks_gift_card_panels_panels" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_gift_card_panels_panels_locales_locale_paren" ON "_pages_v_blocks_gift_card_panels_panels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gift_card_panels_panels_locales_parent_i_idx" ON "_pages_v_blocks_gift_card_panels_panels_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gift_card_panels_order_idx" ON "_pages_v_blocks_gift_card_panels" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gift_card_panels_parent_id_idx" ON "_pages_v_blocks_gift_card_panels" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gift_card_panels_path_idx" ON "_pages_v_blocks_gift_card_panels" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gift_card_faq_items_order_idx" ON "_pages_v_blocks_gift_card_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gift_card_faq_items_parent_id_idx" ON "_pages_v_blocks_gift_card_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_gift_card_faq_items_locales_locale_parent_id" ON "_pages_v_blocks_gift_card_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gift_card_faq_items_locales_parent_id_idx" ON "_pages_v_blocks_gift_card_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gift_card_faq_order_idx" ON "_pages_v_blocks_gift_card_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gift_card_faq_parent_id_idx" ON "_pages_v_blocks_gift_card_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gift_card_faq_path_idx" ON "_pages_v_blocks_gift_card_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_gift_card_faq_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_gift_card_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gift_card_faq_locales_parent_id_idx" ON "_pages_v_blocks_gift_card_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_hero_polaroids_order_idx" ON "_pages_v_blocks_about_hero_polaroids" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_hero_polaroids_parent_id_idx" ON "_pages_v_blocks_about_hero_polaroids" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_hero_polaroids_image_idx" ON "_pages_v_blocks_about_hero_polaroids" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_about_hero_order_idx" ON "_pages_v_blocks_about_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_hero_parent_id_idx" ON "_pages_v_blocks_about_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_hero_path_idx" ON "_pages_v_blocks_about_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_belief_plates_order_idx" ON "_pages_v_blocks_about_belief_plates" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_belief_plates_parent_id_idx" ON "_pages_v_blocks_about_belief_plates" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_belief_plates_image_idx" ON "_pages_v_blocks_about_belief_plates" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_about_belief_order_idx" ON "_pages_v_blocks_about_belief" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_belief_parent_id_idx" ON "_pages_v_blocks_about_belief" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_belief_path_idx" ON "_pages_v_blocks_about_belief" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_kitchen_pillars_order_idx" ON "_pages_v_blocks_about_kitchen_pillars" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_kitchen_pillars_parent_id_idx" ON "_pages_v_blocks_about_kitchen_pillars" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_kitchen_order_idx" ON "_pages_v_blocks_about_kitchen" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_kitchen_parent_id_idx" ON "_pages_v_blocks_about_kitchen" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_kitchen_path_idx" ON "_pages_v_blocks_about_kitchen" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_kitchen_photos_photos_main_idx" ON "_pages_v_blocks_about_kitchen" USING btree ("photos_main_id");
  CREATE INDEX "_pages_v_blocks_about_kitchen_photos_photos_round_idx" ON "_pages_v_blocks_about_kitchen" USING btree ("photos_round_id");
  CREATE INDEX "_pages_v_blocks_about_kitchen_photos_photos_small_idx" ON "_pages_v_blocks_about_kitchen" USING btree ("photos_small_id");
  CREATE INDEX "_pages_v_blocks_about_gallery_photos_order_idx" ON "_pages_v_blocks_about_gallery_photos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_gallery_photos_parent_id_idx" ON "_pages_v_blocks_about_gallery_photos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_gallery_photos_image_idx" ON "_pages_v_blocks_about_gallery_photos" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_about_gallery_order_idx" ON "_pages_v_blocks_about_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_gallery_parent_id_idx" ON "_pages_v_blocks_about_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_gallery_path_idx" ON "_pages_v_blocks_about_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_team_members_order_idx" ON "_pages_v_blocks_about_team_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_team_members_parent_id_idx" ON "_pages_v_blocks_about_team_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_team_members_photo_idx" ON "_pages_v_blocks_about_team_members" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_about_team_order_idx" ON "_pages_v_blocks_about_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_team_parent_id_idx" ON "_pages_v_blocks_about_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_team_path_idx" ON "_pages_v_blocks_about_team" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_team_hiring_link_hiring_link_refer_idx" ON "_pages_v_blocks_about_team" USING btree ("hiring_link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_about_team_locales_locale_parent_id_unique" ON "_pages_v_blocks_about_team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_about_team_locales_parent_id_idx" ON "_pages_v_blocks_about_team_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_closing_links_order_idx" ON "_pages_v_blocks_about_closing_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_closing_links_parent_id_idx" ON "_pages_v_blocks_about_closing_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_closing_links_link_link_reference_idx" ON "_pages_v_blocks_about_closing_links" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_about_closing_links_locales_locale_parent_id" ON "_pages_v_blocks_about_closing_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_about_closing_links_locales_parent_id_idx" ON "_pages_v_blocks_about_closing_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_closing_order_idx" ON "_pages_v_blocks_about_closing" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_closing_parent_id_idx" ON "_pages_v_blocks_about_closing" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_closing_path_idx" ON "_pages_v_blocks_about_closing" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_hero_links_order_idx" ON "_pages_v_blocks_contact_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_hero_links_parent_id_idx" ON "_pages_v_blocks_contact_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_hero_links_link_link_reference_idx" ON "_pages_v_blocks_contact_hero_links" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_hero_links_locales_locale_parent_id_" ON "_pages_v_blocks_contact_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_hero_links_locales_parent_id_idx" ON "_pages_v_blocks_contact_hero_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_hero_hours_rows_order_idx" ON "_pages_v_blocks_contact_hero_hours_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_hero_hours_rows_parent_id_idx" ON "_pages_v_blocks_contact_hero_hours_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_hero_order_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_hero_parent_id_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_hero_path_idx" ON "_pages_v_blocks_contact_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_hero_photo_idx" ON "_pages_v_blocks_contact_hero" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_contact_form_details_order_idx" ON "_pages_v_blocks_contact_form_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_details_parent_id_idx" ON "_pages_v_blocks_contact_form_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_order_idx" ON "_pages_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_parent_id_idx" ON "_pages_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_path_idx" ON "_pages_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_callout_link_callout_link_r_idx" ON "_pages_v_blocks_contact_form" USING btree ("callout_link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_form_locales_locale_parent_id_unique" ON "_pages_v_blocks_contact_form_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_locales_parent_id_idx" ON "_pages_v_blocks_contact_form_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_find_facts_order_idx" ON "_pages_v_blocks_contact_find_facts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_find_facts_parent_id_idx" ON "_pages_v_blocks_contact_find_facts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_find_order_idx" ON "_pages_v_blocks_contact_find" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_find_parent_id_idx" ON "_pages_v_blocks_contact_find" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_find_path_idx" ON "_pages_v_blocks_contact_find" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_find_link_link_reference_idx" ON "_pages_v_blocks_contact_find" USING btree ("link_reference_id");
  CREATE INDEX "_pages_v_blocks_contact_find_main_photo_idx" ON "_pages_v_blocks_contact_find" USING btree ("main_photo_id");
  CREATE INDEX "_pages_v_blocks_contact_find_side_photo_idx" ON "_pages_v_blocks_contact_find" USING btree ("side_photo_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_find_locales_locale_parent_id_unique" ON "_pages_v_blocks_contact_find_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_find_locales_parent_id_idx" ON "_pages_v_blocks_contact_find_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_order_hero_order_idx" ON "_pages_v_blocks_order_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_order_hero_parent_id_idx" ON "_pages_v_blocks_order_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_order_hero_path_idx" ON "_pages_v_blocks_order_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_order_hero_menu_link_menu_link_reference_idx" ON "_pages_v_blocks_order_hero" USING btree ("menu_link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_order_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_order_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_order_hero_locales_parent_id_idx" ON "_pages_v_blocks_order_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_order_choices_pickup_steps_order_idx" ON "_pages_v_blocks_order_choices_pickup_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_order_choices_pickup_steps_parent_id_idx" ON "_pages_v_blocks_order_choices_pickup_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_order_choices_delivery_apps_order_idx" ON "_pages_v_blocks_order_choices_delivery_apps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_order_choices_delivery_apps_parent_id_idx" ON "_pages_v_blocks_order_choices_delivery_apps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_order_choices_order_idx" ON "_pages_v_blocks_order_choices" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_order_choices_parent_id_idx" ON "_pages_v_blocks_order_choices" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_order_choices_path_idx" ON "_pages_v_blocks_order_choices" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_order_choices_pickup_link_pickup_link_re_idx" ON "_pages_v_blocks_order_choices" USING btree ("pickup_link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_order_choices_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_order_choices_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_order_choices_locales_parent_id_idx" ON "_pages_v_blocks_order_choices_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_browser_order_idx" ON "_pages_v_blocks_menu_browser" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_menu_browser_parent_id_idx" ON "_pages_v_blocks_menu_browser" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_browser_path_idx" ON "_pages_v_blocks_menu_browser" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_menu_browser_pickup_link_pickup_link_ref_idx" ON "_pages_v_blocks_menu_browser" USING btree ("pickup_link_reference_id");
  CREATE INDEX "_pages_v_blocks_menu_browser_delivery_link_delivery_link_idx" ON "_pages_v_blocks_menu_browser" USING btree ("delivery_link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_menu_browser_locales_locale_parent_id_unique" ON "_pages_v_blocks_menu_browser_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_browser_locales_parent_id_idx" ON "_pages_v_blocks_menu_browser_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_links_order_idx" ON "_pages_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_links_parent_id_idx" ON "_pages_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_links_link_link_reference_idx" ON "_pages_v_blocks_hero_links" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_links_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_links_locales_parent_id_idx" ON "_pages_v_blocks_hero_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_locales_parent_id_idx" ON "_pages_v_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_content_locales_locale_parent_id_unique" ON "_pages_v_blocks_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_content_locales_parent_id_idx" ON "_pages_v_blocks_content_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_content_links_order_idx" ON "_pages_v_blocks_media_content_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_content_links_parent_id_idx" ON "_pages_v_blocks_media_content_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_content_links_link_link_reference_idx" ON "_pages_v_blocks_media_content_links" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_media_content_links_locales_locale_parent_id" ON "_pages_v_blocks_media_content_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_media_content_links_locales_parent_id_idx" ON "_pages_v_blocks_media_content_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_content_order_idx" ON "_pages_v_blocks_media_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_content_parent_id_idx" ON "_pages_v_blocks_media_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_content_path_idx" ON "_pages_v_blocks_media_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_content_image_idx" ON "_pages_v_blocks_media_content" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_media_content_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_media_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_media_content_locales_parent_id_idx" ON "_pages_v_blocks_media_content_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_highlights_order_idx" ON "_pages_v_blocks_menu_highlights" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_menu_highlights_parent_id_idx" ON "_pages_v_blocks_menu_highlights" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_highlights_path_idx" ON "_pages_v_blocks_menu_highlights" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_menu_highlights_category_idx" ON "_pages_v_blocks_menu_highlights" USING btree ("category_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_menu_highlights_locales_locale_parent_id_uni" ON "_pages_v_blocks_menu_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_menu_highlights_locales_parent_id_idx" ON "_pages_v_blocks_menu_highlights_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_full_menu_order_idx" ON "_pages_v_blocks_full_menu" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_full_menu_parent_id_idx" ON "_pages_v_blocks_full_menu" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_full_menu_path_idx" ON "_pages_v_blocks_full_menu" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_full_menu_locales_locale_parent_id_unique" ON "_pages_v_blocks_full_menu_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_full_menu_locales_parent_id_idx" ON "_pages_v_blocks_full_menu_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_gallery_locales_locale_parent_id_unique" ON "_pages_v_blocks_gallery_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_locales_parent_id_idx" ON "_pages_v_blocks_gallery_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_quotes_order_idx" ON "_pages_v_blocks_testimonials_quotes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_quotes_parent_id_idx" ON "_pages_v_blocks_testimonials_quotes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_quotes_locales_locale_parent_id" ON "_pages_v_blocks_testimonials_quotes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_quotes_locales_parent_id_idx" ON "_pages_v_blocks_testimonials_quotes_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_locales_locale_parent_id_unique" ON "_pages_v_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_locales_parent_id_idx" ON "_pages_v_blocks_testimonials_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_locales_parent_id_idx" ON "_pages_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_locales_parent_id_idx" ON "_pages_v_blocks_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_visit_us_order_idx" ON "_pages_v_blocks_visit_us" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_visit_us_parent_id_idx" ON "_pages_v_blocks_visit_us" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_visit_us_path_idx" ON "_pages_v_blocks_visit_us" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_visit_us_locales_locale_parent_id_unique" ON "_pages_v_blocks_visit_us_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_visit_us_locales_parent_id_idx" ON "_pages_v_blocks_visit_us_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_links_link_link_reference_idx" ON "_pages_v_blocks_cta_links" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_links_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_links_locales_parent_id_idx" ON "_pages_v_blocks_cta_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_locales_parent_id_idx" ON "_pages_v_blocks_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_locales_parent_id_idx" ON "_pages_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_texts_order_parent" ON "_pages_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_pages_v_texts_locale_parent" ON "_pages_v_texts" USING btree ("locale","parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id");
  CREATE INDEX "_pages_v_rels_menu_items_id_idx" ON "_pages_v_rels" USING btree ("menu_items_id");
  CREATE INDEX "_pages_v_rels_media_id_idx" ON "_pages_v_rels" USING btree ("media_id");
  CREATE INDEX "menu_items_tags_order_idx" ON "menu_items_tags" USING btree ("order");
  CREATE INDEX "menu_items_tags_parent_idx" ON "menu_items_tags" USING btree ("parent_id");
  CREATE INDEX "menu_items_variants_order_idx" ON "menu_items_variants" USING btree ("_order");
  CREATE INDEX "menu_items_variants_parent_id_idx" ON "menu_items_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "menu_items_variants_locales_locale_parent_id_unique" ON "menu_items_variants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "menu_items_variants_locales_parent_id_idx" ON "menu_items_variants_locales" USING btree ("_parent_id");
  CREATE INDEX "menu_items__order_idx" ON "menu_items" USING btree ("_order");
  CREATE INDEX "menu_items_image_idx" ON "menu_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "menu_items_slug_idx" ON "menu_items" USING btree ("slug");
  CREATE INDEX "menu_items_category_idx" ON "menu_items" USING btree ("category_id");
  CREATE INDEX "menu_items_updated_at_idx" ON "menu_items" USING btree ("updated_at");
  CREATE INDEX "menu_items_created_at_idx" ON "menu_items" USING btree ("created_at");
  CREATE INDEX "menu_items__status_idx" ON "menu_items" USING btree ("_status");
  CREATE INDEX "menu_items_meta_meta_image_idx" ON "menu_items_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "menu_items_locales_locale_parent_id_unique" ON "menu_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "menu_items_locales_parent_id_idx" ON "menu_items_locales" USING btree ("_parent_id");
  CREATE INDEX "menu_items_rels_order_idx" ON "menu_items_rels" USING btree ("order");
  CREATE INDEX "menu_items_rels_parent_idx" ON "menu_items_rels" USING btree ("parent_id");
  CREATE INDEX "menu_items_rels_path_idx" ON "menu_items_rels" USING btree ("path");
  CREATE INDEX "menu_items_rels_media_id_idx" ON "menu_items_rels" USING btree ("media_id");
  CREATE INDEX "_menu_items_v_version_tags_order_idx" ON "_menu_items_v_version_tags" USING btree ("order");
  CREATE INDEX "_menu_items_v_version_tags_parent_idx" ON "_menu_items_v_version_tags" USING btree ("parent_id");
  CREATE INDEX "_menu_items_v_version_variants_order_idx" ON "_menu_items_v_version_variants" USING btree ("_order");
  CREATE INDEX "_menu_items_v_version_variants_parent_id_idx" ON "_menu_items_v_version_variants" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_menu_items_v_version_variants_locales_locale_parent_id_uniq" ON "_menu_items_v_version_variants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_menu_items_v_version_variants_locales_parent_id_idx" ON "_menu_items_v_version_variants_locales" USING btree ("_parent_id");
  CREATE INDEX "_menu_items_v_parent_idx" ON "_menu_items_v" USING btree ("parent_id");
  CREATE INDEX "_menu_items_v_version_version__order_idx" ON "_menu_items_v" USING btree ("version__order");
  CREATE INDEX "_menu_items_v_version_version_image_idx" ON "_menu_items_v" USING btree ("version_image_id");
  CREATE INDEX "_menu_items_v_version_version_slug_idx" ON "_menu_items_v" USING btree ("version_slug");
  CREATE INDEX "_menu_items_v_version_version_category_idx" ON "_menu_items_v" USING btree ("version_category_id");
  CREATE INDEX "_menu_items_v_version_version_updated_at_idx" ON "_menu_items_v" USING btree ("version_updated_at");
  CREATE INDEX "_menu_items_v_version_version_created_at_idx" ON "_menu_items_v" USING btree ("version_created_at");
  CREATE INDEX "_menu_items_v_version_version__status_idx" ON "_menu_items_v" USING btree ("version__status");
  CREATE INDEX "_menu_items_v_created_at_idx" ON "_menu_items_v" USING btree ("created_at");
  CREATE INDEX "_menu_items_v_updated_at_idx" ON "_menu_items_v" USING btree ("updated_at");
  CREATE INDEX "_menu_items_v_snapshot_idx" ON "_menu_items_v" USING btree ("snapshot");
  CREATE INDEX "_menu_items_v_published_locale_idx" ON "_menu_items_v" USING btree ("published_locale");
  CREATE INDEX "_menu_items_v_latest_idx" ON "_menu_items_v" USING btree ("latest");
  CREATE INDEX "_menu_items_v_version_meta_version_meta_image_idx" ON "_menu_items_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_menu_items_v_locales_locale_parent_id_unique" ON "_menu_items_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_menu_items_v_locales_parent_id_idx" ON "_menu_items_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_menu_items_v_rels_order_idx" ON "_menu_items_v_rels" USING btree ("order");
  CREATE INDEX "_menu_items_v_rels_parent_idx" ON "_menu_items_v_rels" USING btree ("parent_id");
  CREATE INDEX "_menu_items_v_rels_path_idx" ON "_menu_items_v_rels" USING btree ("path");
  CREATE INDEX "_menu_items_v_rels_media_id_idx" ON "_menu_items_v_rels" USING btree ("media_id");
  CREATE INDEX "categories__order_idx" ON "categories" USING btree ("_order");
  CREATE INDEX "categories_image_idx" ON "categories" USING btree ("image_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categories_locales_parent_id_idx" ON "categories_locales" USING btree ("_parent_id");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "subscribers_email_idx" ON "subscribers" USING btree ("email");
  CREATE INDEX "subscribers_updated_at_idx" ON "subscribers" USING btree ("updated_at");
  CREATE INDEX "subscribers_created_at_idx" ON "subscribers" USING btree ("created_at");
  CREATE INDEX "catering_requests_updated_at_idx" ON "catering_requests" USING btree ("updated_at");
  CREATE INDEX "catering_requests_created_at_idx" ON "catering_requests" USING btree ("created_at");
  CREATE INDEX "contact_messages_updated_at_idx" ON "contact_messages" USING btree ("updated_at");
  CREATE INDEX "contact_messages_created_at_idx" ON "contact_messages" USING btree ("created_at");
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_menu_items_id_idx" ON "payload_locked_documents_rels" USING btree ("menu_items_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("subscribers_id");
  CREATE INDEX "payload_locked_documents_rels_catering_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("catering_requests_id");
  CREATE INDEX "payload_locked_documents_rels_contact_messages_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_messages_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_socials_order_idx" ON "site_settings_socials" USING btree ("_order");
  CREATE INDEX "site_settings_socials_parent_id_idx" ON "site_settings_socials" USING btree ("_parent_id");
  CREATE INDEX "site_settings_hours_order_idx" ON "site_settings_hours" USING btree ("_order");
  CREATE INDEX "site_settings_hours_parent_id_idx" ON "site_settings_hours" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_hours_locales_locale_parent_id_unique" ON "site_settings_hours_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_hours_locales_parent_id_idx" ON "site_settings_hours_locales" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_announcement_link_announcement_link_refere_idx" ON "site_settings" USING btree ("announcement_link_reference_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_locales_parent_id_idx" ON "site_settings_locales" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_link_link_reference_idx" ON "header_nav_items" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "header_nav_items_locales_locale_parent_id_unique" ON "header_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_nav_items_locales_parent_id_idx" ON "header_nav_items_locales" USING btree ("_parent_id");
  CREATE INDEX "header_info_bar_order_idx" ON "header_info_bar" USING btree ("_order");
  CREATE INDEX "header_info_bar_parent_id_idx" ON "header_info_bar" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_info_bar_locales_locale_parent_id_unique" ON "header_info_bar_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_info_bar_locales_parent_id_idx" ON "header_info_bar_locales" USING btree ("_parent_id");
  CREATE INDEX "header_ticker_order_idx" ON "header_ticker" USING btree ("_order");
  CREATE INDEX "header_ticker_parent_id_idx" ON "header_ticker" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_ticker_locales_locale_parent_id_unique" ON "header_ticker_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_ticker_locales_parent_id_idx" ON "header_ticker_locales" USING btree ("_parent_id");
  CREATE INDEX "header_cta_cta_reference_idx" ON "header" USING btree ("cta_reference_id");
  CREATE INDEX "header_promo_link_promo_link_reference_idx" ON "header" USING btree ("promo_link_reference_id");
  CREATE UNIQUE INDEX "header_locales_locale_parent_id_unique" ON "header_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_locales_parent_id_idx" ON "header_locales" USING btree ("_parent_id");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_nav_items_link_link_reference_idx" ON "footer_nav_items" USING btree ("link_reference_id");
  CREATE UNIQUE INDEX "footer_nav_items_locales_locale_parent_id_unique" ON "footer_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_nav_items_locales_parent_id_idx" ON "footer_nav_items_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_locales_parent_id_idx" ON "footer_locales" USING btree ("_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_home_hero_links" CASCADE;
  DROP TABLE "pages_blocks_home_hero_links_locales" CASCADE;
  DROP TABLE "pages_blocks_home_hero_slides" CASCADE;
  DROP TABLE "pages_blocks_home_hero_slides_locales" CASCADE;
  DROP TABLE "pages_blocks_home_hero" CASCADE;
  DROP TABLE "pages_blocks_home_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_ribbons" CASCADE;
  DROP TABLE "pages_blocks_menu_board" CASCADE;
  DROP TABLE "pages_blocks_menu_board_locales" CASCADE;
  DROP TABLE "pages_blocks_plate_parade" CASCADE;
  DROP TABLE "pages_blocks_plate_parade_locales" CASCADE;
  DROP TABLE "pages_blocks_coffee_orbit" CASCADE;
  DROP TABLE "pages_blocks_coffee_orbit_locales" CASCADE;
  DROP TABLE "pages_blocks_mural_story_callouts" CASCADE;
  DROP TABLE "pages_blocks_mural_story_callouts_locales" CASCADE;
  DROP TABLE "pages_blocks_mural_story" CASCADE;
  DROP TABLE "pages_blocks_mural_story_locales" CASCADE;
  DROP TABLE "pages_blocks_gram_wall" CASCADE;
  DROP TABLE "pages_blocks_gram_wall_locales" CASCADE;
  DROP TABLE "pages_blocks_review_thread_ratings" CASCADE;
  DROP TABLE "pages_blocks_review_thread_reviews" CASCADE;
  DROP TABLE "pages_blocks_review_thread_reviews_locales" CASCADE;
  DROP TABLE "pages_blocks_review_thread" CASCADE;
  DROP TABLE "pages_blocks_review_thread_locales" CASCADE;
  DROP TABLE "pages_blocks_visit_hours" CASCADE;
  DROP TABLE "pages_blocks_visit_hours_locales" CASCADE;
  DROP TABLE "pages_blocks_sun_cta" CASCADE;
  DROP TABLE "pages_blocks_sun_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_catering_hero_links" CASCADE;
  DROP TABLE "pages_blocks_catering_hero_links_locales" CASCADE;
  DROP TABLE "pages_blocks_catering_hero_facts" CASCADE;
  DROP TABLE "pages_blocks_catering_hero_facts_locales" CASCADE;
  DROP TABLE "pages_blocks_catering_hero" CASCADE;
  DROP TABLE "pages_blocks_catering_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_catering_ribbon" CASCADE;
  DROP TABLE "pages_blocks_catering_menu_categories_items" CASCADE;
  DROP TABLE "pages_blocks_catering_menu_categories_items_locales" CASCADE;
  DROP TABLE "pages_blocks_catering_menu_categories" CASCADE;
  DROP TABLE "pages_blocks_catering_menu_categories_locales" CASCADE;
  DROP TABLE "pages_blocks_catering_menu" CASCADE;
  DROP TABLE "pages_blocks_catering_menu_locales" CASCADE;
  DROP TABLE "pages_blocks_catering_use_cases_cases" CASCADE;
  DROP TABLE "pages_blocks_catering_use_cases_cases_locales" CASCADE;
  DROP TABLE "pages_blocks_catering_use_cases" CASCADE;
  DROP TABLE "pages_blocks_catering_use_cases_locales" CASCADE;
  DROP TABLE "pages_blocks_catering_steps_steps" CASCADE;
  DROP TABLE "pages_blocks_catering_steps_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_catering_steps" CASCADE;
  DROP TABLE "pages_blocks_catering_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_catering_quote_faqs" CASCADE;
  DROP TABLE "pages_blocks_catering_quote_faqs_locales" CASCADE;
  DROP TABLE "pages_blocks_catering_quote" CASCADE;
  DROP TABLE "pages_blocks_catering_quote_locales" CASCADE;
  DROP TABLE "pages_blocks_gift_card_hero_amounts" CASCADE;
  DROP TABLE "pages_blocks_gift_card_hero" CASCADE;
  DROP TABLE "pages_blocks_gift_card_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_gift_card_steps_steps" CASCADE;
  DROP TABLE "pages_blocks_gift_card_steps_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_gift_card_steps" CASCADE;
  DROP TABLE "pages_blocks_gift_card_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_gift_card_panels_panels" CASCADE;
  DROP TABLE "pages_blocks_gift_card_panels_panels_locales" CASCADE;
  DROP TABLE "pages_blocks_gift_card_panels" CASCADE;
  DROP TABLE "pages_blocks_gift_card_faq_items" CASCADE;
  DROP TABLE "pages_blocks_gift_card_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_gift_card_faq" CASCADE;
  DROP TABLE "pages_blocks_gift_card_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_about_hero_polaroids" CASCADE;
  DROP TABLE "pages_blocks_about_hero" CASCADE;
  DROP TABLE "pages_blocks_about_belief_plates" CASCADE;
  DROP TABLE "pages_blocks_about_belief" CASCADE;
  DROP TABLE "pages_blocks_about_kitchen_pillars" CASCADE;
  DROP TABLE "pages_blocks_about_kitchen" CASCADE;
  DROP TABLE "pages_blocks_about_gallery_photos" CASCADE;
  DROP TABLE "pages_blocks_about_gallery" CASCADE;
  DROP TABLE "pages_blocks_about_team_members" CASCADE;
  DROP TABLE "pages_blocks_about_team" CASCADE;
  DROP TABLE "pages_blocks_about_team_locales" CASCADE;
  DROP TABLE "pages_blocks_about_closing_links" CASCADE;
  DROP TABLE "pages_blocks_about_closing_links_locales" CASCADE;
  DROP TABLE "pages_blocks_about_closing" CASCADE;
  DROP TABLE "pages_blocks_contact_hero_links" CASCADE;
  DROP TABLE "pages_blocks_contact_hero_links_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_hero_hours_rows" CASCADE;
  DROP TABLE "pages_blocks_contact_hero" CASCADE;
  DROP TABLE "pages_blocks_contact_form_details" CASCADE;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "pages_blocks_contact_form_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_find_facts" CASCADE;
  DROP TABLE "pages_blocks_contact_find" CASCADE;
  DROP TABLE "pages_blocks_contact_find_locales" CASCADE;
  DROP TABLE "pages_blocks_order_hero" CASCADE;
  DROP TABLE "pages_blocks_order_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_order_choices_pickup_steps" CASCADE;
  DROP TABLE "pages_blocks_order_choices_delivery_apps" CASCADE;
  DROP TABLE "pages_blocks_order_choices" CASCADE;
  DROP TABLE "pages_blocks_order_choices_locales" CASCADE;
  DROP TABLE "pages_blocks_menu_browser" CASCADE;
  DROP TABLE "pages_blocks_menu_browser_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_links" CASCADE;
  DROP TABLE "pages_blocks_hero_links_locales" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_content_locales" CASCADE;
  DROP TABLE "pages_blocks_media_content_links" CASCADE;
  DROP TABLE "pages_blocks_media_content_links_locales" CASCADE;
  DROP TABLE "pages_blocks_media_content" CASCADE;
  DROP TABLE "pages_blocks_media_content_locales" CASCADE;
  DROP TABLE "pages_blocks_menu_highlights" CASCADE;
  DROP TABLE "pages_blocks_menu_highlights_locales" CASCADE;
  DROP TABLE "pages_blocks_full_menu" CASCADE;
  DROP TABLE "pages_blocks_full_menu_locales" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_gallery_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials_quotes" CASCADE;
  DROP TABLE "pages_blocks_testimonials_quotes_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_testimonials_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_visit_us" CASCADE;
  DROP TABLE "pages_blocks_visit_us_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta_links_locales" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_texts" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_home_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_home_hero_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_home_hero_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_home_hero_slides_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_home_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_home_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_ribbons" CASCADE;
  DROP TABLE "_pages_v_blocks_menu_board" CASCADE;
  DROP TABLE "_pages_v_blocks_menu_board_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_plate_parade" CASCADE;
  DROP TABLE "_pages_v_blocks_plate_parade_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_coffee_orbit" CASCADE;
  DROP TABLE "_pages_v_blocks_coffee_orbit_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_mural_story_callouts" CASCADE;
  DROP TABLE "_pages_v_blocks_mural_story_callouts_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_mural_story" CASCADE;
  DROP TABLE "_pages_v_blocks_mural_story_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gram_wall" CASCADE;
  DROP TABLE "_pages_v_blocks_gram_wall_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_review_thread_ratings" CASCADE;
  DROP TABLE "_pages_v_blocks_review_thread_reviews" CASCADE;
  DROP TABLE "_pages_v_blocks_review_thread_reviews_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_review_thread" CASCADE;
  DROP TABLE "_pages_v_blocks_review_thread_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_visit_hours" CASCADE;
  DROP TABLE "_pages_v_blocks_visit_hours_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_sun_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_sun_cta_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_hero_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_hero_facts" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_hero_facts_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_ribbon" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_menu_categories_items" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_menu_categories_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_menu_categories" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_menu_categories_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_menu" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_menu_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_use_cases_cases" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_use_cases_cases_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_use_cases" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_use_cases_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_steps_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_steps_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_quote_faqs" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_quote_faqs_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_quote" CASCADE;
  DROP TABLE "_pages_v_blocks_catering_quote_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gift_card_hero_amounts" CASCADE;
  DROP TABLE "_pages_v_blocks_gift_card_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_gift_card_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gift_card_steps_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_gift_card_steps_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gift_card_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_gift_card_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gift_card_panels_panels" CASCADE;
  DROP TABLE "_pages_v_blocks_gift_card_panels_panels_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gift_card_panels" CASCADE;
  DROP TABLE "_pages_v_blocks_gift_card_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_gift_card_faq_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gift_card_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_gift_card_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_about_hero_polaroids" CASCADE;
  DROP TABLE "_pages_v_blocks_about_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_about_belief_plates" CASCADE;
  DROP TABLE "_pages_v_blocks_about_belief" CASCADE;
  DROP TABLE "_pages_v_blocks_about_kitchen_pillars" CASCADE;
  DROP TABLE "_pages_v_blocks_about_kitchen" CASCADE;
  DROP TABLE "_pages_v_blocks_about_gallery_photos" CASCADE;
  DROP TABLE "_pages_v_blocks_about_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_about_team_members" CASCADE;
  DROP TABLE "_pages_v_blocks_about_team" CASCADE;
  DROP TABLE "_pages_v_blocks_about_team_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_about_closing_links" CASCADE;
  DROP TABLE "_pages_v_blocks_about_closing_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_about_closing" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_hero_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_hero_hours_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_details" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_find_facts" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_find" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_find_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_order_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_order_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_order_choices_pickup_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_order_choices_delivery_apps" CASCADE;
  DROP TABLE "_pages_v_blocks_order_choices" CASCADE;
  DROP TABLE "_pages_v_blocks_order_choices_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_menu_browser" CASCADE;
  DROP TABLE "_pages_v_blocks_menu_browser_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_blocks_content_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_media_content_links" CASCADE;
  DROP TABLE "_pages_v_blocks_media_content_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_media_content" CASCADE;
  DROP TABLE "_pages_v_blocks_media_content_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_menu_highlights" CASCADE;
  DROP TABLE "_pages_v_blocks_menu_highlights_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_full_menu" CASCADE;
  DROP TABLE "_pages_v_blocks_full_menu_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_quotes" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_quotes_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_visit_us" CASCADE;
  DROP TABLE "_pages_v_blocks_visit_us_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_texts" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "menu_items_tags" CASCADE;
  DROP TABLE "menu_items_variants" CASCADE;
  DROP TABLE "menu_items_variants_locales" CASCADE;
  DROP TABLE "menu_items" CASCADE;
  DROP TABLE "menu_items_locales" CASCADE;
  DROP TABLE "menu_items_rels" CASCADE;
  DROP TABLE "_menu_items_v_version_tags" CASCADE;
  DROP TABLE "_menu_items_v_version_variants" CASCADE;
  DROP TABLE "_menu_items_v_version_variants_locales" CASCADE;
  DROP TABLE "_menu_items_v" CASCADE;
  DROP TABLE "_menu_items_v_locales" CASCADE;
  DROP TABLE "_menu_items_v_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "subscribers" CASCADE;
  DROP TABLE "catering_requests" CASCADE;
  DROP TABLE "contact_messages" CASCADE;
  DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_socials" CASCADE;
  DROP TABLE "site_settings_hours" CASCADE;
  DROP TABLE "site_settings_hours_locales" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header_nav_items_locales" CASCADE;
  DROP TABLE "header_info_bar" CASCADE;
  DROP TABLE "header_info_bar_locales" CASCADE;
  DROP TABLE "header_ticker" CASCADE;
  DROP TABLE "header_ticker_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_locales" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "footer_nav_items_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_blocks_home_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_home_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_home_hero_order_link_type";
  DROP TYPE "public"."enum_pages_blocks_menu_board_menu_link_type";
  DROP TYPE "public"."enum_pages_blocks_plate_parade_source";
  DROP TYPE "public"."enum_pages_blocks_coffee_orbit_note_link_type";
  DROP TYPE "public"."enum_pages_blocks_mural_story_link_type";
  DROP TYPE "public"."enum_pages_blocks_gram_wall_link_type";
  DROP TYPE "public"."enum_pages_blocks_review_thread_reviews_tone";
  DROP TYPE "public"."enum_pages_blocks_sun_cta_link_type";
  DROP TYPE "public"."enum_pages_blocks_catering_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_catering_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_catering_hero_facts_icon";
  DROP TYPE "public"."enum_pages_blocks_catering_use_cases_cases_icon";
  DROP TYPE "public"."enum_pages_blocks_gift_card_hero_buy_link_type";
  DROP TYPE "public"."enum_pages_blocks_gift_card_hero_balance_link_type";
  DROP TYPE "public"."enum_pages_blocks_gift_card_steps_steps_icon";
  DROP TYPE "public"."enum_pages_blocks_gift_card_panels_panels_tone";
  DROP TYPE "public"."enum_pages_blocks_gift_card_panels_panels_icon";
  DROP TYPE "public"."enum_pages_blocks_gift_card_panels_panels_link_type";
  DROP TYPE "public"."enum_pages_blocks_about_kitchen_pillars_icon";
  DROP TYPE "public"."enum_pages_blocks_about_team_members_tone";
  DROP TYPE "public"."enum_pages_blocks_about_team_hiring_link_type";
  DROP TYPE "public"."enum_pages_blocks_about_closing_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_about_closing_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_contact_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_contact_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_contact_form_details_icon";
  DROP TYPE "public"."enum_pages_blocks_contact_form_callout_link_type";
  DROP TYPE "public"."enum_pages_blocks_contact_find_facts_icon";
  DROP TYPE "public"."enum_pages_blocks_contact_find_link_type";
  DROP TYPE "public"."enum_pages_blocks_order_hero_menu_link_type";
  DROP TYPE "public"."enum_pages_blocks_order_choices_delivery_apps_app";
  DROP TYPE "public"."enum_pages_blocks_order_choices_pickup_link_type";
  DROP TYPE "public"."enum_pages_blocks_menu_browser_pickup_link_type";
  DROP TYPE "public"."enum_pages_blocks_menu_browser_delivery_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_content_width";
  DROP TYPE "public"."enum_pages_blocks_media_content_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_media_content_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_media_content_image_position";
  DROP TYPE "public"."enum_pages_blocks_menu_highlights_source";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_home_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_home_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_home_hero_order_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_menu_board_menu_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_plate_parade_source";
  DROP TYPE "public"."enum__pages_v_blocks_coffee_orbit_note_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_mural_story_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_gram_wall_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_review_thread_reviews_tone";
  DROP TYPE "public"."enum__pages_v_blocks_sun_cta_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_catering_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_catering_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_catering_hero_facts_icon";
  DROP TYPE "public"."enum__pages_v_blocks_catering_use_cases_cases_icon";
  DROP TYPE "public"."enum__pages_v_blocks_gift_card_hero_buy_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_gift_card_hero_balance_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_gift_card_steps_steps_icon";
  DROP TYPE "public"."enum__pages_v_blocks_gift_card_panels_panels_tone";
  DROP TYPE "public"."enum__pages_v_blocks_gift_card_panels_panels_icon";
  DROP TYPE "public"."enum__pages_v_blocks_gift_card_panels_panels_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_about_kitchen_pillars_icon";
  DROP TYPE "public"."enum__pages_v_blocks_about_team_members_tone";
  DROP TYPE "public"."enum__pages_v_blocks_about_team_hiring_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_about_closing_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_about_closing_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_contact_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_contact_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_details_icon";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_callout_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_contact_find_facts_icon";
  DROP TYPE "public"."enum__pages_v_blocks_contact_find_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_order_hero_menu_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_order_choices_delivery_apps_app";
  DROP TYPE "public"."enum__pages_v_blocks_order_choices_pickup_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_menu_browser_pickup_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_menu_browser_delivery_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_content_width";
  DROP TYPE "public"."enum__pages_v_blocks_media_content_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_media_content_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_media_content_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_menu_highlights_source";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_menu_items_tags";
  DROP TYPE "public"."enum_menu_items_availability";
  DROP TYPE "public"."enum_menu_items_status";
  DROP TYPE "public"."enum__menu_items_v_version_tags";
  DROP TYPE "public"."enum__menu_items_v_version_availability";
  DROP TYPE "public"."enum__menu_items_v_version_status";
  DROP TYPE "public"."enum__menu_items_v_published_locale";
  DROP TYPE "public"."enum_subscribers_locale";
  DROP TYPE "public"."enum_catering_requests_fulfillment";
  DROP TYPE "public"."enum_catering_requests_status";
  DROP TYPE "public"."enum_catering_requests_locale";
  DROP TYPE "public"."enum_contact_messages_status";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_site_settings_socials_platform";
  DROP TYPE "public"."enum_site_settings_currency";
  DROP TYPE "public"."enum_site_settings_announcement_link_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_header_nav_items_icon";
  DROP TYPE "public"."enum_header_cta_type";
  DROP TYPE "public"."enum_header_cta_appearance";
  DROP TYPE "public"."enum_header_promo_link_type";
  DROP TYPE "public"."enum_footer_nav_items_link_type";`)
}
