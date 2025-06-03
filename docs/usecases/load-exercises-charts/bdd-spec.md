# Feature: load user exercises charts
> As an **USER**
> I want to load my exercises charts
> So I can access my previous exercises charts

### 1. Scenario: Valid data provided
- Given userId provided is valid
- When a list of exercises charts is requested
- Then the system shall return stored data

### 2. Scenario: userId missing
- Given userId is missing
- When a list of exercises charts is requested
- Then the system shall return unauthorized error

### 3. Scenario: userId does not exist
- Given userId does not exist
- When a list of exercises charts is requested
- Then the system shall return forbidden error
