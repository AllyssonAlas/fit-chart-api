# Fit Chart

This project is dedicated to help gyms in the management of theirs instructors and members allowing gyms keep control of the relations
between the  instructors and members where the instructors can keep track of the members routines and in the future the evolution of the members
in their journey for a health life.

This repository was created as a part of a project that consists of a real scenario study case divided into three parts:

* (coming soon) An app made with React Native where the user as member can access his exercises routines, see his progress or
as instructor control members routines
* (coming soon) A website made with React and Next where the gym employees can control gym members
* This backend repository that applies core business logic store data resulted from core business logic in database.

## About this repository

This repository is an Node.js application created to serve both mobile and web applications. This backend application can be resumed into
four layers:

1. Domain: created with Driven Domain Design, contains all the business logic and contracts that others layers shall follow
2. Infra: this layer is the connection between domain layer and external tools, so in this all the tools are adapted according
domain layer needs
3. Application: this application front door, here is where the external requests enter so they can follow the designed flow, besides they
treating invalid data or possible occurring errors
4. Main: as the other layers are independent and don't know each other, this layer is where the other layers find each other so
they can finally work together to make feature work fro end to end


## Tools used in this repository

API
- Node.js
- Typescript
- Express
- Bcrypt
- Jsonwebtoken

Database
- Postgres
- Prisma

Code style
- Biome
- Editorconfig

Testing
- Jest
- Supertest

CI/CD
- Husky
- Git-commit-mgs-linter
- Lint-staged


