# Feature: create a gym
> As an **USER** with *admin* permission
> I want to create a new **GYM**
> So my clients can access my gym's features

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

### 4. Scenario: User does not have permission
- Given provided valid data with an non-admin user
- When a new registration is requested
- Then the system shall send a forbidden error to the requester

### 5. Scenario: OwnerEmail does not exist
- Given provided valid data with an non-existent user
- When a new registration is requested
- Then the system shall send a forbidden error to the requester

### 6. Scenario: One or more administrators do not exist
- Given provided valid data with an non-existent user as administrator
- When a new registration is requested
- Then the system shall send a forbidden error to the requester
