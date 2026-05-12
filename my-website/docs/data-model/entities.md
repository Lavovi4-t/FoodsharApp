---
title: "Сущности и атрибуты"
sidebar_position: 2
description: "Детальное описание сущностей базы данных и их атрибутов"
hide_table_of_contents: true
---

# Сущности и атрибуты

<details>
<summary><b>1. User (Пользователь)</b></summary>

| Атрибут | Тип | Описание |
|---------|-----|----------|
| id | string | уникальный идентификатор |
| role | enum | роль: guest, provider, receiver, moderator |
| first_name | string | имя |
| last_name | string | фамилия |
| avatar_url | string | ссылка на аватар |
| rating | float | средний рейтинг пользователя |
| email | string | электронная почта |
| phone | string | номер телефона |
| password | string | пароль |
| is_blocked | bool | заблокирован ли пользователь |
| block_reason | string | причина блокировки |
| created_at | datetime | дата регистрации |
| total_deals | int | общее количество завершённых сделок |

</details>

<details>
<summary><b>2. Listing (Объявление)</b></summary>

| Атрибут | Тип | Описание |
|---------|-----|----------|
| id | string | уникальный идентификатор |
| provider_id | string | ID предоставителя еды |
| title | string | название еды |
| description | string | описание |
| photos | array of string | список фото (ссылки на них) |
| address | object | адрес (регион, город, улица, дом, квартира, координаты) |
| pickup_time | datetime | дата и время выдачи |
| portions | int | общее количество порций |
| status | enum | статус объявления: active, booked, completed, cancelled |
| created_at | datetime | дата создания |
| updated_at | datetime | дата последнего обновления |

</details>

<details>
<summary><b>3. Booking (Бронирование)</b></summary>

| Атрибут | Тип | Описание |
|---------|-----|----------|
| id | string | уникальный идентификатор |
| listing_id | string | ID объявления |
| receiver_id | string | ID получателя |
| provider_id | string | ID предоставителя |
| status | enum | статус: pending, confirmed, cancelled, completed |
| booking_time | datetime | время бронирования |
| pickup_time | datetime | время выдачи |

</details>

<details>
<summary><b>4. Transaction (Сделка)</b></summary>

| Атрибут | Тип | Описание |
|---------|-----|----------|
| id | string | уникальный идентификатор |
| booking_id | string | ID бронирования |
| listing_id | string | ID объявления |
| receiver_id | string | ID получателя |
| provider_id | string | ID предоставителя |
| pickup_confirmed_at | datetime | дата и время подтверждения выдачи |
| provider_rated | bool | оценил ли предоставитель |
| receiver_rated | bool | оценил ли получатель |
| status | enum | статус: pending, completed, cancelled |

</details>

<details>
<summary><b>5. Review (Отзыв)</b></summary>

| Атрибут | Тип | Описание |
|---------|-----|----------|
| id | string | уникальный идентификатор |
| transaction_id | string | ID сделки |
| from_user_id | string | ID автора оценки |
| to_user_id | string | ID оцениваемого пользователя |
| rating | int | оценка звездами (1-5) |
| comment | string | текстовый отзыв |
| created_at | datetime | дата создания |

</details>

<details>
<summary><b>6. Conversation (Чат)</b></summary>

| Атрибут | Тип | Описание |
|---------|-----|----------|
| id | string | уникальный идентификатор |
| listing_id | string | ID объявления |
| participants | array of string | список участников (2 человека) |
| last_message | string | последнее сообщение |
| last_message_time | datetime | время последнего сообщения |
| created_at | datetime | дата создания |

</details>

<details>
<summary><b>7. Message (Сообщение)</b></summary>

| Атрибут | Тип | Описание |
|---------|-----|----------|
| id | string | уникальный идентификатор |
| conversation_id | string | ID чата |
| sender_id | string | ID отправителя |
| receiver_id | string | ID получателя |
| text | string | текст сообщения |
| photo_url | string | фото в сообщении |
| is_read | bool | прочитано ли сообщение |
| created_at | datetime | время отправки |

</details>

<details>
<summary><b>8. Report (Жалоба)</b></summary>

| Атрибут | Тип | Описание |
|---------|-----|----------|
| id | string | уникальный идентификатор |
| reporter_id | string | ID пользователя, который пожаловался |
| target_user_id | string | ID нарушителя |
| reason | string | причина жалобы |
| status | enum | статус: pending, approved, rejected |
| moderator_id | string | ID модератора, принявшего решение |
| moderator_decision | object | решение (action, block_duration, reason, decided_at) |
| created_at | datetime | дата жалобы |
| resolved_at | datetime | дата решения |

</details>

<details>
<summary><b>9. Block (Блокировка)</b></summary>

| Атрибут | Тип | Описание |
|---------|-----|----------|
| id | string | уникальный идентификатор |
| blocked_user_id | string | ID заблокированного |
| blocked_by_user_id | string | ID инициатора блокировки (модератора) |
| reason | string | причина блокировки |
| duration_days | int | срок блокировки в днях |
| created_at | datetime | дата блокировки |
| expires_at | datetime | дата разблокировки |

</details>