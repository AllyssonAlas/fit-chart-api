# Feature: assign user to gym
> As an **USER** with *admin* permission
> I want to assign an __User__ to my __Gym__
> So my clients can access my gym's features

### 1. Scenario: Valid data provided
- Given all data provided is valid
- When a new assignment is requested
- Then the system shall store the data provided

### 2. Scenario: Data missing
- Given some required data isn't received
- When a new assignment is requested
- Then the system shall return missing data error

### 3. Scenario: Invalid data provided
- Given some provided data is invalid
- When a new assignment is requested
- Then the system shall return invalid data error

### 4. Scenario: User does not have permission
- Given provided valid data with a non-admin user
- When a new assignment is requested
- Then the system shall return forbidden error

### 5. Scenario: Gym does not exist
- Given provided valid data with a non-existent gym id
- When a new assignment is requested
- Then the system shall return forbidden error

### 6. Scenario: One or more users do not exist
- Given provided valid data with an non-existent user
- When a new assignment is requested
- Then the system shall return forbidden error
