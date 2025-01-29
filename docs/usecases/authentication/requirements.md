# Authentication Usecase

> ## Case of success
1. System receives **User** email and password
2. System validates data received
3. System checks if email exists
4. System validates user password with hash stored in database
5. System returns user data and jwt token with user role and permissions

> ## Exception - Missing data
2. System invalidates data
3. System returns a missing data error to the requester

> ## Exception - Invalid data
2. System invalidates data
3. System returns an invalid data error to the requester

> ## Exception - Email does not exist
4. System does not find user email
5. System returns an unauthorized error to the requester
> ## Exception - Incorrect password
4. System invalidate user password with hash stored in database
5. System returns an unauthorized error to the requester
