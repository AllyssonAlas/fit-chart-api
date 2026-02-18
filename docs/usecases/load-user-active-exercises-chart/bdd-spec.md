# Feature: load user active exercises chart
> As an **USER**
> I want to load my active exercises chart
> So I can access active exercises chart

### 1. Scenario: User has active exercises chart
- Given userId provided is valid
- When the active of exercises chart is requested
- Then the system shall return stored data

### 2. Scenario: User does not have active exercises chart
- Given userId provided is valid
- When the active of exercises chart is requested
- And user does not have exercises chart
- Then the system shall return an empty response

### 2. Scenario: userId missing
- Given userId is missing
- When a list of exercises charts is requested
- Then the system shall return unauthorized error

### 3. Scenario: userId does not exist
- Given userId does not exist
- When a list of exercises charts is requested
- Then the system shall return forbidden error
