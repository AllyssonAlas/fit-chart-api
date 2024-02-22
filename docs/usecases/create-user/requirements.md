# Create User Usecase

> ## Case of success
1. System receives **User** data
2. System validates data received
3. System checks if email does not exist
4. System checks if role name exists
5. System encrypts user password
6. System stores data, including encrypted password, in the database

> ## Exception - Missing data
2. System invalidates data
3. System returns a missing data error to the requester

> ## Exception - Invalid data
2. System invalidates data
3. System returns an invalid data error to the requester

> ## Exception - Email already exists
3. System finds an account with email received
4. System returns an unauthorized error to the requester

> ## Exception - Invalid role name
5. System does not find role
6. System returns an unauthorized to the requester
