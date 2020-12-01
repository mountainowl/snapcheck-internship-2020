# Hello!

We're excited that you're interested in joining the SnapCheck team. In the past, we have brought potential engineering candidates into our office for a full-day technical interviews. These sessions included whiteboard programming exercises, code reviews, and other thought exercises. We realized that current trends and situation requires us to change, so instead, we've come up with this relatively open-ended programming/design challenge that will allow you to demonstrate your skills from the comfort of your own workspace. In addition, we know your time is valuable, so please feel free to use your completed work as a portfolio piece.

We wish you the best of luck and can't wait to see what you create!

# Time to spend
We ask that you spend **no more than 6-8 hours** on this challenge.

At a minimum, there are three things we would like to see:

* Users should be able login and view data
* Users can modify existing data
* Design/layout of content

> We will of course examine your code for readability, architectural decisions, and modularity. If/when you meet with us, be prepared to talk about why and how you built your interfaces.

# Idea inspiration
If you have additional time after completing the requirements (we think you should), then we'd love to see what else you can do. Here are some ideas to get you started (but please don't limit yourself to these!).

* Experiment with alternative designs
* Automated testing
* Sorting/Searching of users
* Dreation of new accounts
* Optimize assets (minimize and/or bundle css/js)
* SSO Authentication/Authorization i.e. Google, Okta etc.

To be perfectly clear, we don't expect that anyone could complete all of these in 6-8 hours. This is simply a list of ideas to inspire you.

# Submission
There are two ways that you can submit your solution to us.

* The first is to simply create a .zip file of the project directory and email it alongwith your resume to jobs@snapcheck.co with the subject "Front End Code Challenge".

* Alternatively, you can follow the GitHub Fork/PR workflow by forking this repository, commiting your changes, and submiting a pull request to us. For more information about that, you can see this GitHub article

* Make sure to include screenshots. Visual creativity gets us going.

# Questions / Problems / Stuck?
You can either write us a GitHub issue or email us at jobs@snapcheck.co.

License
We have licensed this project under the MIT license so that you may use this for a portfolio piece (or anything else!).

# THE CHALLENGE

1. Download the JSON data file and Mock Json Server https://github.com/typicode/json-server to act as your server

> **The data file has follow information** - id,first name, last name, complete address as object (street address, apartment number, city, state, zip) profile image url (use any static place holder image) and order total (has two fields, amount field - must store cents i.e. 1000 equals $10.00, and currency). Create 10 records. (see sample data file attached here)

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
1. Deploy to container or cloud service or your choice like AWS, Heroku etc.
