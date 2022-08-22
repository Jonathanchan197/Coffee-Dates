# Coffee Date
You can try **Coffee Date** [here](https://main--stunning-entremet-0abbec.netlify.app)!

Coffee Date is a simple web app to connect people with experienced mentors in their industry. It is inspired by the real world practice of getting in touch with experienced professionals in order to set up a "coffee date" for a meetup. Instead of scouring LinkedIn and cold contacting, Coffee Date removes the forced long intros and uses a fun swiping system so potential mentees can easily request contact with mentors of their choice. Chatrooms are only created upon the mentor's approval, and from there, both parties can arrange their first coffee date!

## Table of Contents
* [Technologies](#technologies)
* [Usage](#usage)
* [Creating an account](#creating-an-account)
* [Account verification](#account-verification)
* [Dashboard](#dashboard)
* [Profile and settings](#profile-and-settings)
* [Mentees](#mentees)
* [Mentors](#mentors)
* [Chats](#chats)
* [Resources](#resources)
* [Screenshots](#screenshots)

## Technologies
* React 18.2.0 (w/ React Router Dom 6.3.0)
* Yarn 1.22.19
* JavaScript
* CSS
* Supabase w/ PostgreSQL and Realtime
* Netlify

## Usage
No installations are required. Coffee Date is deployed on Netlify [here](https://main--stunning-entremet-0abbec.netlify.app).

### Creating an account
Click on "Sign Up" in the navigation bar to create your account. Once you've submitted a valid email and a message pops up that you've been successfully signed up, you will need to got your email to verify your account.

### Account verification
Follow the confirmation link in your email to begin your account setup. This is where you will choose whether you're a mentor or mentee as well as input other details about yourself, such as your name, your industry, and so on.

### Dashboard
Once setup is complete, you will be lead to your dashboard. From here, you can utilize the to-do list feature to keep track of your tasks.

### Profile and settings
You can view your profile by clicking "Profile" in the navigation bar. You can edit what appears on your profile by either clicking "Edit profile" from your profile page, or clicking "Settings" in the navigation bar. Your profile will only update after you click "Save profile!" after making your changes.

### Mentees - Find a Mentor
Mentees can start swiping on mentors by clicking on the "Find a Mentor" link in the navigation bar which is only available to them. Swiping right on a mentor they like will *not* start a chat, but rather send a request to the relevant mentor.

### Mentors - Requests
Mentors can see requests by clicking on the "Requests" link in the navigation bar which is only available to them. Rejecting a request will remove the mentee from their request log. Accepting a request will also remove the mentee from their request log as well as starting a chat.

### Chats
Mentors and mentees have access to the "Chats" page. If a mentor has accepted a request, they can then choose to chat with the new mentee, and likewise, the mentee can chat with them in their own chatroom. From here, they can start their mentorship and set up their first coffee date!

### Screenshots
![Homepage](/public/screenshots/LoggedIn.png)
![Profile](/public/screenshots/Profile.png)
![DashBoard](/public/screenshots/Dashboard.png)
![Matches](/public/screenshots/Match.png)
![Chats](/public/screenshots/Chats.png)
![PrivateMessage](/public/screenshots/Chat.png)

## Resources
* [Supabase documentation](https://supabase.com/docs)
* [React Tinder card](https://www.npmjs.com/package/react-tinder-card)
* [Chatscope component library](https://www.npmjs.com/package/@chatscope/chat-ui-kit-react)