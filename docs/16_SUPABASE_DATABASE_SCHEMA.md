# ERAYDUŞ DIGITAL EXPERIENCE PLATFORM
## 16_SUPABASE_DATABASE_SCHEMA.md

Version: 1.0

---

# PURPOSE

This document defines the complete database architecture for the ERAYDUŞ Digital Experience Platform.

The database must be:

Scalable

Secure

Normalized

Future-proof

Realtime Ready

API Ready

Multi-language Ready

Multi-brand Ready

Audit Ready

Every table must support Row Level Security (RLS).

Every table must contain timestamps.

Every important action must be traceable.

---

# DATABASE

PostgreSQL

Hosted on Supabase

Authentication

Supabase Auth

Storage

Supabase Storage

Realtime

Enabled

Edge Functions

Enabled

Cron Jobs

Enabled

RLS

Enabled on every table

---

# AUTHENTICATION

Tables

profiles

roles

permissions

role_permissions

user_sessions

login_history

api_keys

---

## profiles

id

auth_user_id

first_name

last_name

email

phone

avatar

role_id

status

last_login

created_at

updated_at

---

## roles

Super Admin

Owner

Sales Manager

Sales

Marketing

SEO

Content Editor

Architect

Dealer

Installer

Customer Support

---

## permissions

name

slug

description

module

---

# PRODUCTS

products

product_categories

product_collections

product_images

product_videos

product_documents

product_tags

related_products

---

## products

id

sku

slug

name

short_description

description

collection_id

category_id

base_price

starting_price

status

featured

new_product

best_seller

meta_title

meta_description

canonical_url

created_at

updated_at

deleted_at

---

# COLLECTIONS

collections

collection_sections

collection_images

collection_features

---

# CATEGORIES

categories

parent_category

slug

sort_order

status

---

# CONFIGURATOR

configurations

configuration_items

configuration_history

configuration_templates

configuration_rules

configuration_versions

saved_configurations

---

## configuration_items

configuration_id

glass_type

glass_thickness

profile_color

door_type

opening_direction

handle

accessories

width

height

depth

installation

warranty

price

---

# GLASS TYPES

glass_types

glass_images

glass_prices

glass_properties

---

## glass_types

name

slug

description

thickness

color

transparency

price_modifier

status

---

# PROFILE COLORS

profile_colors

profile_images

profile_materials

profile_prices

---

# ACCESSORIES

accessories

accessory_categories

accessory_images

accessory_prices

compatibility_rules

---

# PRICE ENGINE

pricing_rules

price_modifiers

discount_rules

campaigns

regional_prices

dealer_prices

architect_prices

tax_rules

currency_rates

---

# QUOTE REQUESTS

quote_requests

quote_items

quote_status_history

quote_notes

quote_files

quote_messages

---

## quote_requests

quote_number

customer_id

configuration_id

sales_user

status

estimated_price

approved_price

notes

created_at

---

# CUSTOMERS

customers

customer_addresses

customer_projects

customer_notes

customer_documents

customer_activity

---

# PROJECTS

projects

project_images

project_videos

project_products

project_locations

project_reviews

---

# BLOG

blog_posts

blog_categories

blog_tags

blog_authors

blog_images

blog_revisions

blog_comments

blog_seo

---

# SEO

seo_pages

seo_redirects

seo_keywords

seo_internal_links

seo_entities

seo_faq

seo_schema

seo_audit

---

# MEDIA

media_library

media_folders

media_tags

media_usage

---

# REVIEWS

reviews

review_images

review_videos

review_replies

review_votes

---

# FAQ

faq_categories

faq_items

faq_relations

---

# CONTACT

contact_requests

contact_status

contact_notes

---

# NEWSLETTER

newsletter_subscribers

newsletter_campaigns

newsletter_logs

---

# CAREERS

job_positions

applications

application_documents

---

# ARCHITECTS

architects

architect_projects

architect_downloads

---

# DEALERS

dealers

dealer_regions

dealer_requests

dealer_pricing

---

# INSTALLATIONS

installation_requests

installation_schedule

installation_teams

installation_reports

---

# FILE STORAGE

product-images

project-images

blog-images

customer-files

pdf-proposals

technical-drawings

videos

logos

avatars

documents

---

# SETTINGS

company_settings

website_settings

seo_settings

email_settings

whatsapp_settings

theme_settings

analytics_settings

integration_settings

---

# ANALYTICS

page_views

product_views

configurator_events

search_queries

button_clicks

scroll_depth

conversion_events

traffic_sources

---

# AUDIT LOGS

audit_logs

action

table

record_id

old_data

new_data

user_id

ip_address

device

created_at

---

# NOTIFICATIONS

notifications

notification_templates

notification_logs

---

# API

api_tokens

webhooks

integration_logs

rate_limits

---

# SEARCH

search_index

popular_searches

synonyms

---

# LOCALIZATION

languages

translations

currencies

measurement_units

---

# SECURITY

login_attempts

blocked_ips

security_events

password_resets

two_factor

---

# RELATIONSHIPS

Product

↓

Collection

↓

Category

↓

Configurator

↓

Quote

↓

Customer

↓

Project

Everything must be connected using foreign keys.

---

# ROW LEVEL SECURITY

Customers

Can access only their own data.

Sales

Can access assigned quotes.

Marketing

Can access content.

SEO

Can access SEO modules.

Owner

Full access.

Super Admin

Unlimited access.

---

# INDEXES

Create indexes for:

slug

email

phone

sku

quote_number

configuration_id

status

created_at

updated_at

foreign_keys

full_text_search

---

# FULL TEXT SEARCH

Products

Collections

Projects

Blog

FAQ

Technical Documents

Search suggestions

Typo tolerance

Synonyms

---

# BACKUP STRATEGY

Automatic daily backups.

Point-in-time recovery.

Weekly snapshots.

Disaster recovery plan.

---

# REALTIME FEATURES

Live quote updates.

Configurator synchronization.

Admin notifications.

Dashboard statistics.

Customer status updates.

---

# EDGE FUNCTIONS

Generate PDF Quote

Generate WhatsApp Summary

Resize Images

Optimize Uploads

Send Emails

Create SEO Metadata

Generate Slugs

Generate Open Graph Images

Sync Analytics

---

# STORAGE POLICIES

Private Buckets

Customer Documents

Quotes

Invoices

Public Buckets

Products

Projects

Blog

Gallery

---

# PERFORMANCE

Connection Pooling

Pagination

Caching

Materialized Views

Optimized Indexes

Query Optimization

Lazy Loading

---

# FUTURE TABLES

Inventory

Warehouse

Production

Invoices

Payments

Accounting

ERP

CRM

AR Models

3D Assets

AI Training Data

Dealer Orders

Installer Reports

Vision Pro Assets

---

# FINAL PRINCIPLE

The database must support millions of records without requiring structural redesign.

Every table must be scalable.

Every relationship must be logical.

Every query must be optimized.

The database is the foundation of the entire ERAYDUŞ Digital Experience Platform.
