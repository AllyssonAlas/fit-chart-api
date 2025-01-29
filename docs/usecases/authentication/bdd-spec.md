# Feature: authentication
> As a **USER**
> I want to authenticate
> So I can access the system features

### 1. Scenario: Valid data provided
- Given all data provided is valid
- When authentication is requested
- Then the system shall return user data
- And a jwt token with user roles and permissions

### 2. Scenario: Data missing
- Given some required data isn't received
- When authentication is requested
- Then the system shall send a missing data error to the requester

### 3. Scenario: Invalid data provided
- Given some provided data is invalid
- When authentication is requested
- Then the system shall send a invalid data error to the requester
