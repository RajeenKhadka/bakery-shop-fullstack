import * as usersAPI from "./users-api";

//I need to pass in userData because this is attempting
//to add a new user to the database
export async function signUp(userData) {
  //Delegate the network request code to the users-api.js API module
  //which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  console.log(token);
  //for now, we will console.log the token to see that it exists and return
  //the name and email that was sent to us
  //we will also eventually save the token in localStorage
  localStorage.setItem("token", token);
  return getUser();
}

// Function to handle user login
export async function logIn(credentials) {
  // Call the API to log in the user with the provided credentials (email and password)
  const token = await usersAPI.logIn(credentials);
  // Log the token received from the API for debugging purposes
  console.log("Token received:", token);
  // Store the token in localStorage for persistence across page reloads
  localStorage.setItem("token", token);
  // Get the user information from the token (assumes you have a function to parse the token)
  const user = getUser();
  // Log the user information parsed from the token for debugging purposes
  console.log("User parsed from token:", user);
  // Return the user object to be used elsewhere in the app
  return user;
}

export function getToken() {
  //getItem returns null if there is no stringin the key "token" or the key doesn't exist
  const token = localStorage.getItem("token");
  if (!token) return null;
  //Obtain the payload
  const payload = JSON.parse(atob(token.split(".")[1]));
  //check the expiration
  //A JWT's expiration is expressed in milliseconds, not seconds, so convert
  if (payload.exp < Date.now() / 1000) {
    //Token had expired and we remove it from local storage
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

// Function to retrieve the user information from the stored token
export function getUser() {
  // Get the token from localStorage or another source (e.g., cookie)
  const token = getToken();
  // If no token is found, return null to indicate the user is not authenticated
  if (!token) return null;
  try {
    // Decode and parse the token (split by '.' to access the payload part, then decode and parse JSON)
    const payload = JSON.parse(atob(token.split(".")[1]));
    // Return the `user` object from the payload if it exists, otherwise return null
    return payload.user || null;
  } catch (error) {
    // If there’s an error parsing the token (e.g., invalid format), log the error and return null
    console.error("Error parsing token:", error);
    return null;
  }
}

export function logOut() {
  localStorage.removeItem("token");
}

export default { logIn };
