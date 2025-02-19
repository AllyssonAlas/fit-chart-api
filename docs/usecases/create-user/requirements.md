# Create User Usecase

> ## Case of success
1. Validate received **User** data
2. Check if email does not exist
3. Check if role name exists
4. Encrypt user password
5. Store data, including encrypted password, in database
6. Shall call <ins>authentication</ins> usecase

> ## Exception - Missing data
1. Return missing data error

> ## Exception - Invalid data
1. Return invalid data error

> ## Exception - Email already exists
2. Find an account with email received
3. Return unauthorized error

> ## Exception - Invalid role name
3. Role is not found
4. Return unauthorized error
