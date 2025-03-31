# Feature: list gym exercises
> As an **USER**
> I want to access gym exercises list
> So I can create a workout sheet

### 1. Scenario: Valid data provided
- Given gym id provided is valid
- When a list of exercises is requested
- Then the system shall return the exercise list

### 2. Scenario: Invalid data provided
- Given gym id provided is invalid
- When a list of exercises is requested
- Then the system shall return an empty list
