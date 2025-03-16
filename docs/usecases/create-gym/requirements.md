# Create Gym Usecase

> ## Case of success 1: main
1. Check if **USER** does have permission
2. Validate received **Gym** data
3. Check if all _administrators_ exist
4. Store data in the database
5. Shall return no data

> ## Case of success 2: _administrators_ is not received
3. List of _administrators_ is not received
4. Store data in the database
5. Shall return no data

> ## Exception - Missing data
1. Return missing data error

> ## Exception - Invalid data
1. Return invalid data error

> ## Exception - User does not have permission
1. Return forbidden error

> ## Exception - At least of one _administrators_ does not exist
4. One of _administrators_ is not found in database
5. Return forbidden error

