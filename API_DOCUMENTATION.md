# Explore Vizag API Documentation

Base URL:

```text
http://localhost:5000/api
```

Protected routes require:

```text
Authorization: Bearer <token>
```

## Auth

### Register

`POST /auth/register`

```json
{
  "name": "Visitor",
  "email": "visitor@example.com",
  "password": "Password@123"
}
```

### Login

`POST /auth/login`

```json
{
  "email": "visitor@example.com",
  "password": "Password@123"
}
```

### Me

`GET /auth/me`

### Update Profile

`PUT /auth/profile`

```json
{
  "name": "Updated Name",
  "phone": "9999999999",
  "avatar": "https://example.com/avatar.jpg"
}
```

## Attractions

### List Attractions

`GET /attractions?search=beach&category=Beach&page=1&limit=8`

### Featured Attractions

`GET /attractions/featured`

### Get Attraction

`GET /attractions/:id`

### Create Attraction

`POST /attractions` admin only

### Update Attraction

`PUT /attractions/:id` admin only

### Delete Attraction

`DELETE /attractions/:id` admin only

### Toggle Favorite

`POST /attractions/:id/favorite` user/admin

## Reviews

### Create Review

`POST /reviews/attractions/:attractionId`

```json
{
  "rating": 5,
  "comment": "Beautiful place."
}
```

### Delete Review

`DELETE /reviews/:id`

Users may delete their own reviews. Admins may delete any review.

## Trip Planner

The Trip Planner is implemented on the frontend at:

`/trip-planner`

It collects:

- Full name
- Optional email or phone
- Number of days
- Start and end dates
- Place categories
- Transport mode
- Guide requirement
- Accommodation preference

Generated plans can be saved through the existing itinerary API:

`POST /itineraries`

## Blogs API Legacy

`GET /blogs`

`GET /blogs/:id`

`POST /blogs` admin only

`PUT /blogs/:id` admin only

`DELETE /blogs/:id` admin only

## Events

`GET /events`

`GET /events/upcoming`

`GET /events/:id`

`POST /events` admin only

`PUT /events/:id` admin only

`DELETE /events/:id` admin only

## Itineraries

`GET /itineraries/my`

`POST /itineraries`

`GET /itineraries/:id`

`PUT /itineraries/:id`

`DELETE /itineraries/:id`

## Users

Admin only:

`GET /users`

`PUT /users/:id/role`

`DELETE /users/:id`

User:

`GET /users/favorites`

## Dashboard

### User Dashboard

`GET /dashboard/user`

### Admin Dashboard

`GET /dashboard/admin` admin only

## Upload

Image upload is handled with multipart form data on create/update routes that support images.

Field names:

- `image`
- `images`
- `gallery`
