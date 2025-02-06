# Authorization Usecase

> ## Case of success
1. System receives jwt token
2. System validates and extracts permissions and roles from token received
3. System checks if token has permission required
4. System allows to access the requested route

> ## Exception - Missing data
2. System invalidates data
3. System returns a forbidden error

> ## Exception - Invalid data
2. System invalidates data
3. System returns a forbidden error

> ## Exception - Requester does not have required permission
4. System does not find user email
5. System returns a forbidden error
