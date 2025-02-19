# Create Gym Usecase

> ## Case of success 1: main
1. Validate received **Gym** data
2. Check if **USER** does have permission
3. Check if _ownerEmail_ exists
4. Check if all _administrators_ exist
5. Store data in the database
6. Shall return no data

> ## Case of success 2: _administrators_ is not received
4. List of _administrators_ is not received
5. Store data in the database
6. Shall return no data

> ## Exception - Missing data
1. Return missing data error

> ## Exception - Invalid data
1. Return invalid data error

> ## Exception - User does not have permission
2. Return forbidden error

> ## Exception - _ownerEmail_ does not exist
3. _ownerEmail_ is not found in database
4. Return forbidden error

> ## Exception - At least of one _administrators_ does not exist
4. One of _administrators_ is not found in database
5. Return forbidden error

