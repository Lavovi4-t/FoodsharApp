---
title: "Диаграмма вариантов использования"
sidebar_position: 3
description: "Use Case диаграмма фудшеринг-приложения"
---

# Диаграмма вариантов использования

Диаграмма вариантов использования показывает основные функциональные требования к системе и взаимодействие акторов с ней.

```plantuml
@startuml
' Настройки внешнего вида
left to right direction
skinparam actorStyle awesome
skinparam useCaseFontColor #000000
skinparam useCaseBorderColor #0066CC
skinparam useCaseBackgroundColor #F0F8FF
skinparam actorBorderColor #006600
skinparam actorBackgroundColor #E8F5E9

' Заголовок
title Фудшеринг-приложение\nUse Case диаграмма

' Определение акторов
actor "Гость" as Guest
actor "Предоставитель" as Donor
actor "Получатель" as Recipient
actor "Волонтер" as Volunteer
actor "Модератор" as Moderator

' Прямоугольник системы
rectangle "Фудшеринг-приложение" {
  
  ' Use cases для гостя
  usecase "Регистрация" as UC1
  usecase "Вход в систему" as UC2
  usecase "Просмотр объявлений" as UC3
  
  ' Use cases для донора
  usecase "Опубликовать еду" as UC4
  usecase "Редактировать объявление" as UC5
  usecase "Подтвердить выдачу" as UC6
  
  ' Use cases для реципиента
  usecase "Забронировать еду" as UC7
  usecase "Поиск по фильтрам" as UC8
  usecase "Добавить в избранное" as UC9
  
  ' Use cases для всех пользователей
  usecase "Общаться в чате" as UC10
  usecase "Оценить сделку" as UC11
  usecase "Просмотреть профиль" as UC12
  
  ' Use cases для волонтера
  usecase "Взять задание на доставку" as UC13
  usecase "Отметить доставку" as UC14
  
  ' Use cases для модератора
  usecase "Проверить объявления" as UC15
  usecase "Заблокировать нарушителя" as UC16
}

' Связи акторов с use cases (ассоциации)
Guest --> UC1
Guest --> UC2
Guest --> UC3

Donor --> UC4
Donor --> UC5
Donor --> UC6
Donor --> UC10
Donor --> UC11
Donor --> UC12

Recipient --> UC7
Recipient --> UC8
Recipient --> UC9
Recipient --> UC10
Recipient --> UC11
Recipient --> UC12

Volunteer --> UC13
Volunteer --> UC14

Moderator --> UC15
Moderator --> UC16

' Связи наследования (обобщение) между акторами
Guest <|-- Donor
Guest <|-- Recipient
Recipient <|-- Volunteer

' Связь include (включение)
UC1 ..> UC2 : <<include>>
UC7 ..> UC8 : <<include>>
UC13 ..> UC14 : <<include>>

' Связь extend (расширение)
UC3 <.. UC8 : <<extend>>
UC12 <.. UC9 : <<extend>>

@enduml