# Agency API Documentation

## Students
- `GET /api/students` — List all students
- `POST /api/students` — Create a new student
- `GET /api/students/:id` — Get a student by ID
- `PUT /api/students/:id` — Update a student by ID
- `DELETE /api/students/:id` — Delete a student by ID

## Counselors
- `GET /api/counselors`
- `POST /api/counselors`
- `GET /api/counselors/:id`
- `PUT /api/counselors/:id`
- `DELETE /api/counselors/:id`

## Events
- `GET /api/events`
- `POST /api/events`
- `GET /api/events/:id`
- `PUT /api/events/:id`
- `DELETE /api/events/:id`

## Consents
- `GET /api/consents`
- `POST /api/consents`
- `GET /api/consents/:id`
- `PUT /api/consents/:id`
- `DELETE /api/consents/:id`

## Communications
- `GET /api/communications`
- `POST /api/communications`
- `GET /api/communications/:id`
- `PUT /api/communications/:id`
- `DELETE /api/communications/:id`

## Audit Logs
- `GET /api/audit-logs`
- `POST /api/audit-logs`
- `GET /api/audit-logs/:id`
- `PUT /api/audit-logs/:id`
- `DELETE /api/audit-logs/:id`

## Incidents
- `GET /api/incidents`
- `POST /api/incidents`
- `GET /api/incidents/:id`
- `PUT /api/incidents/:id`
- `DELETE /api/incidents/:id`

## Assessments
- `GET /api/assessments`
- `POST /api/assessments`
- `GET /api/assessments/:id`
- `PUT /api/assessments/:id`
- `DELETE /api/assessments/:id`

---

# Data Flow

1. **User interacts with the frontend (UI)**
2. **Frontend sends HTTP requests to backend API endpoints** (e.g., POST /api/students)
3. **Backend processes the request and interacts with MongoDB collections**
   - Validates input, performs CRUD, handles errors
4. **Backend returns a JSON response to the frontend**
5. **Backend logs actions in audit logs for compliance**
6. **(Optional) Backend triggers AI/automation or external integrations**
7. **Frontend updates the UI based on the response**

---

**All endpoints accept and return JSON.**
- For POST/PUT, send a JSON body with the relevant fields.
- For errors, you’ll get `{ "error": "message" }` and an appropriate status code.
