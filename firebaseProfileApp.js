// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeZu3QpIaCjvhcnEMu_VLEWwe4gfkdmO0",
  authDomain: "profileapp-d785c.firebaseapp.com",
  databaseURL: "https://profileapp-d785c-default-rtdb.firebaseio.com",
  projectId: "profileapp-d785c",
  storageBucket: "profileapp-d785c.appspot.com",
  messagingSenderId: "1069550700514",
  appId: "1:1069550700514:web:9a1fa2b6ee4472519e1bbb",
  measurementId: "G-B632C3EPR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to fetch and display user profiles
function displayUserProfiles() {
  const usersRef = ref(database, '/'); // Assuming the users are at the root

  get(usersRef).then((snapshot) => {
    if (snapshot.exists()) {
      const users = snapshot.val();
      const usersContainer = document.getElementById('usersContainer');

      // Loop through users and create HTML for each profile
      for (const userId in users) {
        // Skip unrelated data entries
        if (userId === 'highScore') continue;

        const user = users[userId];
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
          <div class="user-profile">
            <img src="${user.image}" alt="${user.name}" style="width:100px; height:auto;">
            <h3>${user.name}</h3>
            <p>Favorite Color: ${user.color}</p>
            <p>Favorite Movie: ${user.movie}</p>
            <p>Favorite Song: ${user.song}</p>
          </div>
        `;
        usersContainer.appendChild(userDiv);
      }
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

// Call the function to display profiles
displayUserProfiles();
