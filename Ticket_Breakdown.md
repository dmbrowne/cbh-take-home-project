# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### 1. Add a migration file to create new column for custom agent ID

In order to allow facilities to use thier own ID for each agent, we need to allow that custom ID to be stored in our database.

- The new column must have a unique contraint so that each agent has a custom ID that can not be the same as another
- The new column should not allow NULL
- After creating the new column (e.g. `custom_id`), set the value of the column in each row as the internal ID. For example if a record in the Agents table currently has an ID of `35af7241-7e80-4057-a426-ac1812bd8118`, then the value of the new column, `custom_id` should also be `35af7241-7e80-4057-a426-ac1812bd8118`.

**A.C.**
When SELECTing all fields for an agent, each record should have an `id` and a `custom_id` column both with the same value.

**Story points: 3**

### 2. Add the custom agent ID to the returned metadata in the list of shifts

Modify the function `getShiftsByFacility`, to return the new custom agent ID when fetching all shifts that have been worked in the current quarter.

**A.C.**
When the API method `getShiftsByFacility` is called, within the response, the metadata for each agent shouold now have both an `id` and a `custom_id`.

**Story points: 1**

### 3. Clearly label the ID's and custom ID's on the shift report

When generating the report for list of shifts, it should be clear which ID is ours (clipboard health) and which is the custom ID. [Assuming that the report is a CSV in PDF format], The ID from our database should be represented by a column called `internal ID`, and the custom ID should be represented by a column called `ID` on the generated PDF

**A.C.**
The generated report should list both an "internal ID" (which is provided from the `id` field in the agent metadata from `getShiftsByFacility`) and an "ID" (which is provided from the `custom_id` field in the agent metadata from `getShiftsByFacility`)

**Story points: 1**

### Assumptions

- Using a sql-type database (e.g. postgres or mysql)
- I did not add a task for fetching an agent by custom ID because it was not mentioned that the need for getting an individual agent's metadata is required.
- A Task for updating/creating an agent with a custom ID has not been listed because this requirement for this tech test, only details the need for fetching shifts for each agent
- Purposely tried to keep code implementation details to a minimum so that developers have the freedom to use thier initiative on how best to achieve the desired outcome. Attempts and ideas are positively critised upon code review.
