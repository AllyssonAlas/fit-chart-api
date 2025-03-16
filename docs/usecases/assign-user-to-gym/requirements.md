# Assign User to Gym Usecase

> ## Case of success 1
1. Check if **USER** does have permission
2. Validate received **USER** id list data
3. Check if **GYM** id exist
4. Check if all **USER** ids exist
5. Update **GYM** in the database
6. Shall return no data

> ## Exception - Missing data
1. Return missing data error

> ## Exception - Invalid data
1. Return invalid data error

> ## Exception - User does not have permission
2. Return forbidden error

> ## Exception - _gymId_ does not exist
3. _gym_ id is not found in database
4. Return forbidden error

> ## Exception - At least if one of _users_ does not exist
5. One of _users_ is not found in database
6. Return forbidden error

