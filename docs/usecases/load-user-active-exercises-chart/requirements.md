# Load User Active Exercises Chart Usecase

> ## Case of success
1. Check if **USER** does have permission
2. Check if user has active exercises chart
3. Return stored user active exercises chart

> ## Case of success - user does not have active exercises chart
3. Return empty response with positive status 

> ## Exception - Missing userId
2. Return unauthorized error

> ## Exception - userId does not exist
2. Return forbidden error
