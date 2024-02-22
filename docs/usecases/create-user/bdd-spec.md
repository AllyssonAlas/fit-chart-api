# Feature: create an user
> As a new **USER**
> I want to create a new account
> So I can access the system features

### 1. Scenario: Valid data provided
- Given all data provided is valid
- When a new registration is requested
- Then the system shall store the data provided

### 2. Scenario: Data missing
- Given some required data isn't received
- When a new registration is requested
- Then the system shall send a missing data error to the requester

### 3. Scenario: Invalid data provided
- Given some provided data is invalid
- When a new registration is requested
- Then the system shall send a invalid data error to the requester

### 4. Scenario: Email already exists
- Given provided valid data with an email that already exists
- When a new registration is requested
- Then the system shall send an unauthorized error to the requester

### 5. Scenario: Role does not exist
- Given provided valid data with an role which does not exist
- When a new registration is requested
- Then the system shall send an unauthorized error to the requester
