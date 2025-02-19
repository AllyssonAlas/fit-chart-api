# Authorization Usecase

> ## Case of success
1. Validate jwt token received
2. Extract permissions and roles from token
3. Check if token has required permission
4. Add _userId_ to request body
5. Allow access to requested route

> ## Exception - Missing data
1. Return forbidden error

> ## Exception - Invalid data
1. Return forbidden error

> ## Exception - Token does not have required permission
3. Return forbidden error
