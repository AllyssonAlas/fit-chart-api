# Authentication Usecase

> ## Case of success
1. Validate received **User** email and password
2. Check if email exists
3. Validate password with hash stored in database
4. Create jwt token with user role and permissions
5. Return user data and jwt token

> ## Exception - Missing data
1. Return missing data error

> ## Exception - Invalid data
1. Return invalid data error

> ## Exception - Email does not exist
2. Return unauthorized error

> ## Exception - Incorrect password
3. Invalidate user password with hash stored in database
4. Return unauthorized error
