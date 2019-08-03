- npm run docker:up => to start app
- npm run docker:down => to stop app


endpoints:

POST http://localhost:3001/employees
expected fields: 
- name => string (required)
- email => string (required & unique)
- position => string
- photo => string (link to picture)
- phone => string
- dob => date of birth with format "DD/MM/YYYY" (required)

PUT http://localhost:3001/employees/:id

GET http://localhost:3001/employees/:id

DELETE http://localhost:3001/employees/:id

GET http://localhost:3001/employees/all

env variables:

TEST_MAIL => email for receive messages instead employee emails
