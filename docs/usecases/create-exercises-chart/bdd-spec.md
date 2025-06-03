# Feature: create exercises chart
> As an **USER**
> I want to create a new exercises chart
> So I can access my exercises routine

### 1. Scenario: Valid data provided
- Given all data provided is valid
- When a new exercises chart is requested
- Then the system shall store the data provided

### 2. Scenario: Data missing
- Given some required data isn't received
- When a new exercises chart is requested
- Then the system shall return missing data error

### 3. Scenario: Invalid data provided
- Given some provided data is invalid
- When a new exercises chart is requested
- Then the system shall return invalid data error

### 4. Scenario: User does not exist
- Given provided valid data with a non-existent user
- When a new exercises chart is requested
- Then the system shall return unauthorized error

### 5. Scenario: User does not have permission
- Given provided valid data with an user with no permission
- When a new exercises chart is requested
- Then the system shall return forbidden error
