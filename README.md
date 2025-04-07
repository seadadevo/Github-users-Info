# GitHub Profile Search Application

A web application that allows users to search for GitHub profiles, view profile details (such as avatar, followers, repositories), toggle between light and dark themes, and export the search history as a JSON file.

## Features

- **Search for GitHub profiles**: Users can search for a GitHub user by entering their username. The application fetches and displays the user's profile information including name, avatar, bio, followers, following, and public repositories.
  
- **Repository Listing**: Displays a list of repositories for the searched user. Users can load more repositories by clicking the "Load More" button.

- **Search History**: The last 5 searched usernames are saved in local storage, allowing users to quickly re-search previous profiles.

- **Dark Mode**: Toggle between light and dark themes for the interface.

- **Export Search History**: Export the search history (the last 5 usernames) as a JSON file that can be downloaded.

- **Share Profile**: Option to share the GitHub profile URL using the native sharing feature available on supported platforms.

## Technologies Used

- **HTML**: Used to structure the content.
- **CSS**: For styling and layout, including dark mode.
- **JavaScript**: Handles the logic for searching, rendering results, dark mode toggle, and storing search history.
  
## How to Use

1. **Search for a GitHub profile**:
   - Enter a GitHub username in the input field and press "Enter" or click the "Search" button to search for the profile.
   
2. **View profile details**:
   - The profile details including the avatar, name, bio, followers, following, and public repositories will be displayed.
   
3. **Load more repositories**:
   - Click the "Load More" button to see more repositories of the searched user.
   
4. **Dark Mode**:
   - Toggle between light and dark themes by clicking the "🌙" or "☀️" button.

5. **Export Search History**:
   - Click the "Export History" button to download the last 5 searched usernames as a JSON file.

6. **Share the profile**:
   - Click the "Share Profile" button to share the GitHub profile URL on supported platforms.



