---
title: "ERD диаграмма"
sidebar_position: 1
description: "Диаграмма сущность-связь базы данных фудшеринг-приложения"
hide_table_of_contents: true
---

# Модель данных

## ERD диаграмма

Диаграмма "Сущность-Связь" (Entity-Relationship Diagram) показывает структуру базы данных фудшеринг-приложения, связи между таблицами и их атрибуты.

```plantuml
@startuml
!theme plain

' Настройки внешнего вида
skinparam linetype ortho
skinparam class {
  BackgroundColor #F0F8FF
  BorderColor #0066CC
  ArrowColor #0066CC
}
skinparam entity {
  BackgroundColor #E8F5E9
  BorderColor #006600
}

' Сущности базы данных

entity "user" as user {
  * id : BIGSERIAL <<PK>>
  --
  * role_id : SMALLINT <<FK>>
  * email : VARCHAR(255)
  * phone : VARCHAR(20)
  * password_hash : VARCHAR(255)
  * first_name : VARCHAR(100)
  * last_name : VARCHAR(100)
  * avatar_url : TEXT
  * rating : DECIMAL(3,2)
  * total_views : INTEGER
  * is_blocked : BOOLEAN
  * is_deleted : BOOLEAN
  * created_at : TIMESTAMP
  * updated_at : TIMESTAMP
  * deleted_at : TIMESTAMP
}

entity "listing" as listing {
  * id : BIGSERIAL <<PK>>
  --
  * provider_id : BIGINT <<FK>>
  * status_id : SMALLINT <<FK>>
  * title : VARCHAR(200)
  * description : TEXT
  * weight_quantity : VARCHAR(50)
  * expiry_date : DATE
  * address : TEXT
  * latitude : DECIMAL(10,8)
  * longitude : DECIMAL(11,8)
  * available_from : TIME
  * available_to : TIME
  * available_now : BOOLEAN
  * views_count : INTEGER
  * created_at : TIMESTAMP
  * updated_at : TIMESTAMP
}

entity "listing_status" as listing_status {
  * id : SMALLINT <<PK>>
  --
  * code : VARCHAR(20)
  * name : VARCHAR(50)
  * description : TEXT
  * sort_order : SMALLINT
}

entity "photo" as photo {
  * id : BIGSERIAL <<PK>>
  --
  * listing_id : BIGINT <<FK>>
  * url : TEXT
  * sort_order : SMALLINT
  * created_at : TIMESTAMP
}

entity "category" as category {
  * id : SMALLINT <<PK>>
  --
  * code : VARCHAR(20)
  * name : VARCHAR(50)
  * description : TEXT
  * sort_order : SMALLINT
}

entity "listing_category" as listing_category {
  * listing_id : BIGINT <<PK, FK>>
  * category_id : SMALLINT <<PK, FK>>
}

entity "booking" as booking {
  * id : BIGSERIAL <<PK>>
  --
  * listing_id : BIGINT <<FK>>
  * recipient_id : BIGINT <<FK>>
  * status_id : SMALLINT <<FK>>
  * booking_time : TIMESTAMP
  * pickup_time : TIMESTAMP
  * completed_at : TIMESTAMP
  * cancelled_at : TIMESTAMP
  * cancel_reason : TEXT
  * created_at : TIMESTAMP
  * updated_at : TIMESTAMP
}

entity "booking_status" as booking_status {
  * id : SMALLINT <<PK>>
  --
  * code : VARCHAR(20)
  * name : VARCHAR(50)
  * description : TEXT
}

entity "conversation" as conversation {
  * id : BIGSERIAL <<PK>>
  --
  * listing_id : BIGINT <<FK>>
  * created_at : TIMESTAMP
  * updated_at : TIMESTAMP
}

entity "conversation_participant" as conversation_participant {
  * conversation_id : BIGINT <<PK, FK>>
  * user_id : BIGINT <<PK, FK>>
  --
  * joined_at : TIMESTAMP
  * last_read_at : TIMESTAMP
  * unread_count : INTEGER
}

entity "message" as message {
  * id : BIGSERIAL <<PK>>
  --
  * conversation_id : BIGINT <<FK>>
  * sender_id : BIGINT <<FK>>
  * text : TEXT
  * reply_to_id : BIGINT <<FK>>
  * is_read : BOOLEAN
  * created_at : TIMESTAMP
}

entity "review" as review {
  * id : BIGSERIAL <<PK>>
  --
  * booking_id : BIGINT <<FK>>
  * reviewer_id : BIGINT <<FK>>
  * reviewee_id : BIGINT <<FK>>
  * rating : SMALLINT
  * comment : TEXT
  * is_edited : BOOLEAN
  * created_at : TIMESTAMP
  * updated_at : TIMESTAMP
}

entity "notification" as notification {
  * id : BIGSERIAL <<PK>>
  --
  * user_id : BIGINT <<FK>>
  * type_id : SMALLINT <<FK>>
  * priority_id : SMALLINT <<FK>>
  * title : VARCHAR(200)
  * body : TEXT
  * data : JSONB
  * is_read : BOOLEAN
  * created_at : TIMESTAMP
  * read_at : TIMESTAMP
}

entity "notification_type" as notification_type {
  * id : SMALLINT <<PK>>
  --
  * code : VARCHAR(20)
  * name : VARCHAR(50)
  * description : TEXT
}

entity "notification_priority" as notification_priority {
  * id : SMALLINT <<PK>>
  --
  * code : VARCHAR(20)
  * name : VARCHAR(50)
  * description : TEXT
}

entity "complaint" as complaint {
  * id : BIGSERIAL <<PK>>
  --
  * complainant_id : BIGINT <<FK>>
  * defendant_id : BIGINT <<FK>>
  * listing_id : BIGINT <<FK>>
  * reason : TEXT
  * status : VARCHAR(20)
  * resolved_by : BIGINT <<FK>>
  * resolution_note : TEXT
  * created_at : TIMESTAMP
  * resolved_at : TIMESTAMP
}

' Связи между таблицами

user ||--o{ listing : "provides"
listing_status ||--o{ listing : "has"
listing ||--o{ photo : "contains"
listing ||--o{ listing_category : "has"
category ||--o{ listing_category : "assigned to"

user ||--o{ booking : "makes as recipient"
listing ||--o{ booking : "has"
booking_status ||--o{ booking : "has"

listing ||--o{ conversation : "related to"
conversation ||--o{ conversation_participant : "includes"
user ||--o{ conversation_participant : "participates in"
conversation ||--o{ message : "contains"
user ||--o{ message : "sends"
message ||--o|| message : "replies to"

booking ||--o{ review : "generates"
user ||--o{ review : "writes as reviewer"
user ||--o{ review : "receives as reviewee"

user ||--o{ notification : "receives"
notification_type ||--o{ notification : "categorizes"
notification_priority ||--o{ notification : "has"

user ||--o{ complaint : "files as complainant"
user ||--o{ complaint : "filed against as defendant"
user ||--o{ complaint : "resolves as moderator"
listing ||--o{ complaint : "reported"

@enduml