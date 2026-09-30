# Musanze Safe Market Field Inspection Prototype

##  Mobile Application Development
### Assignment 1

This project is a React Native mobile application developed using Expo and TypeScript for the  Mobile Application Development assignment.

The application simulates a one-day Musanze Safe Markets field inspection pilot. It allows a field officer to view fictional market zones and stalls, create vendor inspections, validate inspection information, attach photographic evidence, review inspection details, save records temporarily in memory, and view saved inspection records.

> All vendor names, stall information, and contact numbers used in this project are not real.

## Group Information

**Group Number:** `<    G05   >`

**Group Verification Code:** `MOB-A1-G05`

**Group Leader:** 
`<ADAM IBRAHIM HACHIM>`

### Group Members and Roles

| Member | Name | Registration Number | Assigned Role |
|---|---|---|---|
| Member 1 | `<ADAM IBRAHIM HACHIM >` | `<25/27413>` | Product and UX Lead |
| Member 2 | `<KAWAYA GUEYLORD>` | `<25/27953>` | Interface Engineer |
| Member 3 | `<ISIMBI HUGETTE>` | `< 25/27647>` | State and Navigation Engineer |
| Member 4 | `<SEBIT AMKALSUM>` | `<25/28050>` | Device Integration and QA Lead |
| Member 5 | `<YAYA GOUNI SOULEYMAN>` | `<26/38963>` | Release and Evidence Lead |


# Application Features

The application implements the following functionality:

- Market zones and stalls catalogue
- At least six fictional market/stall records
- Reusable market card components
- Market status and inspection priority indicators
- Empty catalogue state
- New inspection form
- Field-level validation
- Stall code validation
- Rwanda-style fictional phone number validation
- Risk-level selection
- Consent confirmation
- Bottom-tab navigation
- Stack navigation
- Camera image capture
- Gallery image selection
- Camera/gallery permission handling
- Review screen before saving
- Inspection timestamp
- Group verification code display
- In-memory inspection storage
- Inspection records list
- Inspection details screen
- Responsive interface for narrow Android screens

# Navigation Structure

The application contains three main bottom tabs:

1. **Home**
2. **New Inspection**
3. **Records**

The main inspection workflow is:

Home / Market Catalogue
        ↓
New Inspection
        ↓
Inspection Form
        ↓
Add Evidence
        ↓
Review Inspection
        ↓
Save Inspection
        ↓
Records
        ↓
Inspection Details
