NOTE: For the login, any username and password can be used


TinderTips - A dating app where users can gift items to each other
===========================

## What is it written in
TinderTips uses Cordova/Ionic/AngularJS and a Node/ExpressJS REST API backend data service with Firebase as database. 

## App Features 
1. **Side Menu** - Side menu navigation with icons
2. **Custom Status Bar** - Set the font and icons to white to match the title bar text
3. **Custom Keyboard Accessory Bar** - keep accessory bar for drop-down options on sort(in progress)
4. **Login with Facebook, LinkedIn or Twitter** - in addition to a custom login option using OAuth(disabled)
5. **Profile** - display the user's profile based on the social media logged in with
6. **Facebook integration** - using a non-plugin approach
7. **Add to native calendar** - easily add a session to your native calendar with all session details (disabled)
8. **Favorites Management** - add to favorites / remove from favorites by tapping heart again or via the Favorites menu option list manager
9. **Modal login panel upon open**
10. **Share with native sharing system on device**
11. **Uses native notifications/dialogs**
12. **Toast-style alerts**
13. **Handling offline**
14. **Popover 'About' screen**
15. **Sort options** - sort sessions by different criteria
16. **Filter/Search** - Search all data with a search term(in progress)
    
 
## Other Skills demonstrated
1. Setting icons and splash screens
2. Debugging with Safari, Weinre and more
3. Testing with the PhoneGap Developer App
4. App Store Submission Tips
5. Using Google font libraries
6. How to setup OAuth.io with your social media accounts
 

Setting up the Ionic App
-------------------------
1. Ensure you have [Ionic](http://ionicframework.com/getting-started/) installed (and are using latest version)

2. Create a new Ionic project

        ionic start ConferenceTracker

3. Replace the **/www** folder with the **/www** folder from this project.

4. Add the InAppBrowser plugin (needed for Facebook OAuth on device)

        cordova plugins add org.apache.cordova.inappbrowser

5. Add the dialogs plugin (for native style alert dialogs)

        cordova plugin add org.apache.cordova.dialogs

6. Add desired platforms (when ready to test on device)

        ionic platform add ios

7. Run on desired platform

        ionic run ios

**IMPORTANT NOTE:** Facebook integration for Login with Facebook and Profile menu option currently only works when running with the browser via [http://localhost:5000/#/app/sessions](http://localhost:5000/#/app/sessions) after setting up REST services below. It does not yet work via Ionic run/serve. Working on it.


Setting up the REST Services
----------------------------
** Copy the **/server** folder from this repo into the Ionic project root folder created above

1. Install server dependencies. Navigate into **/server** folder from the command line and type:

        npm install

2. Start the node server

        node server

3. Go to [http://localhost:5000/sessions](http://localhost:5000/sessions) to test your node service in your browser and make sure you see session data returned in JSON format.


Test the app in the browser with: [http://localhost:5000/#/app/sessions](http://localhost:5000/#/app/sessions)

** Login with your Facebook credentials from the Login screen if you want to see your profile info in the Profile menu option.
