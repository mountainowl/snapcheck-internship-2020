# FRONTEND DEVELOPER CODING CHALLENGE

### Use: You may use framework of your choice. 

1. Use Mock Json Server https://github.com/typicode/json-server to store your JSON data
1. Create static JSON file to be used in mock json server with appropriate routes etc. with following fields - id,first name, last name, complete address as object (street address, apartment number, city, state, zip) profile image url (use any static place holder image) and order total (has two fields, amount field - must store cents i.e. 1000 equals $10.00, and currency). Create 10 records. (see sample data file attached here)

### Component - Login Page 
  1. With username and password fields and login button
  1. Any arbitrary value in fields can log user in (no validation required, however you can choose to validate if you prefer)
  1. Create AuthService to hold flag [true or false] if user is already logged in

### Component #1 [protected/cannot be accessed until user logs in]

  1. Fetch all users and display, all fields
  1. This list of should searchable by first name, last name or amount
  1. Narrow search results in the list as user types in the search input field
  1. Create custom pipe called AmountPipe and use it to display order total field. It should display formatted amount i.e. currency symbol and decimal; Take into account internalization of currency formats.Use this pipe in your html to display amount object
  1. Create custom pipe to display address object and use it in your HTML
  1. Clicking on the row navigates to Component #2

### Component #2  [protected/cannot be accessed until user logs in]
  1. Create input fields to modify data
  1. This page receives data from page #1
  1. User id is passed in the URL
  1. Create data resolver to fetch user from JSON server provided in URL params
  1. Display user data in input fields to edit
  1. Have three buttons, delete, cancel and save - delete button deletes the user in JSON mock server file (make sure to bring up a confirmation modal with “yes - delete”, and “cancel” buttons, clicking delete deletes user, cancel cancels action ), cancel button navigates you back to Component #1, save button saves data in JSON mock server file.


#### Notes
1. Currency field is not editable
1. Amount field must be edited as decimal but saved in cents
1. Make sure to have a title bar on all pages with current users first and last name and logout button. Logout button logs user out

#### Bonus
1. If create a common layout for all pages to be rendered in i.e. a common template for all pages in which component specific selectors can be rendered.
1. Use SASS
1. Create Attachments area
1. Deploy to container or cloud service or your choice like AWS, Heroku etc.
