---
title: "ERD диаграмма"
sidebar_position: 1
description: "Физическая модель базы данных фудшеринг-приложения"
hide_table_of_contents: true
---

# Физическая модель данных

## ERD диаграмма

Диаграмма показывает физическую модель базы данных фудшеринг-приложения, связи между таблицами и их атрибуты.


### Легенда

| Цвет | Тип сущности |
|------|--------------|
| Без цвета | Справочники (коды, статусы, типы) |
| Синий | Основные сущности (пользователи, объявления, бронирования) |
| Зеленый | Связующие сущности (история, участники) |

### Диаграмма

```plantuml
@startuml
!theme plain

title Физическая модель фудшеринг-приложения

' ========== СПРАВОЧНИКИ ==========

entity "user_role" as user_role {
  * id : SMALLINT
  --
  * code : VARCHAR(20)
  * name : VARCHAR(50)
  * description : TEXT
  * sort_order : SMALLINT
}

entity "listing_status" as listing_status {
  * id : SMALLINT
  --
  * code : VARCHAR(20)
  * name : VARCHAR(50)
  * description : TEXT
  * sort_order : SMALLINT
}

entity "booking_status" as booking_status {
  * id : SMALLINT
  --
  * code : VARCHAR(20)
  * name : VARCHAR(50)
  * description : TEXT
  * sort_order : SMALLINT
}

entity "transaction_status" as transaction_status {
  * id : SMALLINT
  --
  * code : VARCHAR(20)
  * name : VARCHAR(50)
  * description : TEXT
  * sort_order : SMALLINT
}

entity "report_status" as report_status {
  * id : SMALLINT
  --
  * code : VARCHAR(20)
  * name : VARCHAR(50)
  * description : TEXT
  * sort_order : SMALLINT
}

entity "notification_type" as notification_type {
  * id : SMALLINT
  --
  * code : VARCHAR(30)
  * name : VARCHAR(50)
  * description : TEXT
}

entity "notification_priority" as notification_priority {
  * id : SMALLINT
  --
  * code : VARCHAR(20)
  * name : VARCHAR(30)
  * priority_level : SMALLINT
}

' ========== ОСНОВНЫЕ СУЩНОСТИ ==========

entity "user" as user {
  * id : BIGSERIAL
  --
  * role_id : SMALLINT
  * first_name : VARCHAR(100)
  * last_name : VARCHAR(100)
  * email : VARCHAR(255)
  * phone : VARCHAR(20)
  * password_hash : VARCHAR(255)
  * avatar_url : TEXT
  * rating : DECIMAL(3,2)
  * total_deals : INTEGER
  * is_blocked : BOOLEAN
  * is_deleted : BOOLEAN
  * deleted_at : TIMESTAMPTZ
  * created_at : TIMESTAMPTZ
  * updated_at : TIMESTAMPTZ
}

entity "user_location" as user_location {
  * user_id : BIGINT
  --
  * latitude : DECIMAL(10,8)
  * longitude : DECIMAL(11,8)
  * location_updated_at : TIMESTAMPTZ
}

entity "listing" as listing {
  * id : BIGSERIAL
  --
  * provider_id : BIGINT
  * title : VARCHAR(200)
  * description : TEXT
  * address_region : VARCHAR(100)
  * address_city : VARCHAR(100)
  * address_street : VARCHAR(200)
  * address_building : VARCHAR(20)
  * address_apartment : VARCHAR(20)
  * address_lat : DECIMAL(10,8)
  * address_lon : DECIMAL(11,8)
  * pickup_time : TIMESTAMPTZ
  * portions : INTEGER
  * portions_left : INTEGER
  * status_id : SMALLINT
  * is_deleted : BOOLEAN
  * created_at : TIMESTAMPTZ
  * updated_at : TIMESTAMPTZ
}

entity "photo" as photo {
  * id : BIGSERIAL
  --
  * listing_id : BIGINT
  * url : TEXT
  * sort_order : SMALLINT
  * created_at : TIMESTAMPTZ
}

entity "booking" as booking {
  * id : BIGSERIAL
  --
  * listing_id : BIGINT
  * receiver_id : BIGINT
  * provider_id : BIGINT
  * portions_booked : INTEGER
  * status_id : SMALLINT
  * booking_time : TIMESTAMPTZ
  * pickup_time : TIMESTAMPTZ
  * updated_at : TIMESTAMPTZ
}

entity "booking_status_history" as booking_history {
  * id : BIGSERIAL
  --
  * booking_id : BIGINT
  * old_status_id : SMALLINT
  * new_status_id : SMALLINT
  * changed_by : BIGINT
  * changed_at : TIMESTAMPTZ
  * comment : TEXT
}

entity "listing_status_history" as listing_history {
  * id : BIGSERIAL
  --
  * listing_id : BIGINT
  * old_status_id : SMALLINT
  * new_status_id : SMALLINT
  * changed_by : BIGINT
  * changed_at : TIMESTAMPTZ
  * comment : TEXT
}

entity "transaction" as transaction {
  * id : BIGSERIAL
  --
  * booking_id : BIGINT
  * listing_id : BIGINT
  * provider_id : BIGINT
  * receiver_id : BIGINT
  * pickup_confirmed_at : TIMESTAMPTZ
  * provider_rated : BOOLEAN
  * receiver_rated : BOOLEAN
  * status_id : SMALLINT
  * created_at : TIMESTAMPTZ
}

entity "review" as review {
  * id : BIGSERIAL
  --
  * transaction_id : BIGINT
  * from_user_id : BIGINT
  * to_user_id : BIGINT
  * rating : SMALLINT
  * comment : TEXT
  * created_at : TIMESTAMPTZ
}

entity "conversation" as conversation {
  * id : BIGSERIAL
  --
  * listing_id : BIGINT
  * created_at : TIMESTAMPTZ
  * updated_at : TIMESTAMPTZ
}

entity "conversation_participant" as participant {
  * id : BIGSERIAL
  --
  * conversation_id : BIGINT
  * user_id : BIGINT
  * joined_at : TIMESTAMPTZ
  * last_read_at : TIMESTAMPTZ
  * unread_count : INTEGER
}

entity "message" as message {
  * id : BIGSERIAL
  --
  * conversation_id : BIGINT
  * sender_id : BIGINT
  * text : TEXT
  * photo_url : TEXT
  * is_read : BOOLEAN
  * created_at : TIMESTAMPTZ
}

entity "report" as report {
  * id : BIGSERIAL
  --
  * reporter_id : BIGINT
  * target_user_id : BIGINT
  * reason : TEXT
  * status_id : SMALLINT
  * moderator_id : BIGINT
  * moderator_comment : TEXT
  * created_at : TIMESTAMPTZ
  * resolved_at : TIMESTAMPTZ
}

entity "block" as block {
  * id : BIGSERIAL
  --
  * blocked_user_id : BIGINT
  * blocked_by_user_id : BIGINT
  * reason : TEXT
  * duration_days : INTEGER
  * expires_at : TIMESTAMPTZ
  * created_at : TIMESTAMPTZ
}

entity "notification" as notification {
  * id : BIGSERIAL
  --
  * user_id : BIGINT
  * type_id : SMALLINT
  * priority_id : SMALLINT
  * title : VARCHAR(200)
  * body : TEXT
  * data : TEXT
  * status : VARCHAR(20)
  * sent_via : TEXT
  * created_at : TIMESTAMPTZ
  * sent_at : TIMESTAMPTZ
}

entity "notification_archive" as notification_archive {
  * id : BIGINT
  --
  * user_id : BIGINT
  * type_id : SMALLINT
  * priority_id : SMALLINT
  * title : VARCHAR(200)
  * body : TEXT
  * data : TEXT
  * status : VARCHAR(20)
  * sent_via : TEXT
  * created_at : TIMESTAMPTZ
  * sent_at : TIMESTAMPTZ
  * archived_at : TIMESTAMPTZ
}

entity "user_rating_summary" as rating_summary {
  * id : BIGSERIAL
  --
  * user_id : BIGINT
  * period_type : VARCHAR(10)
  * period_start : DATE
  * period_end : DATE
  * avg_rating : DECIMAL(3,2)
  * reviews_count : INTEGER
  * calculated_at : TIMESTAMPTZ
}

entity "user_stats_summary" as stats_summary {
  * id : BIGSERIAL
  --
  * user_id : BIGINT
  * period_type : VARCHAR(10)
  * period_start : DATE
  * period_end : DATE
  * listings_count : INTEGER
  * bookings_count : INTEGER
  * completed_deals : INTEGER
  * calculated_at : TIMESTAMPTZ
}

' ========== СВЯЗИ ==========

user ||--o{ user_location
user ||--o{ listing
user ||--o{ booking
user ||--o{ transaction
user ||--o{ review
user ||--o{ participant
user ||--o{ message
user ||--o{ report
user ||--o{ block
user ||--o{ notification
user ||--o{ rating_summary
user ||--o{ stats_summary

user_role ||--o{ user

listing ||--o{ photo
listing ||--o{ booking
listing ||--o{ conversation

listing_status ||--o{ listing
listing_status ||--o{ listing_history

booking_status ||--o{ booking
booking_status ||--o{ booking_history

booking ||--|| transaction
booking ||--o{ booking_history

transaction ||--o{ review

conversation ||--o{ participant
conversation ||--o{ message

report_status ||--o{ report

notification_type ||--o{ notification
notification_priority ||--o{ notification

@enduml