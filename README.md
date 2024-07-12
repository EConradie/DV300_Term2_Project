# Bladel README

![Bladel_readme](https://github.com/EConradie/DV300_Term2_Project/blob/main/assets/images/ReadMeImage.png?raw=true)

## Bladel Overview

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Firestore](https://img.shields.io/badge/Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/products/firestore)

## Overview

Bladel is a competitive knife-making app developed using React Native and managed through Expo. It utilizes Firebase for backend services including database management, authentication, and storage. Bladel allows knife enthusiasts to participate in challenges, showcase their creations, and engage with a community of peers and experts. Judges can create new challenges, and participants can enter these challenges by submitting photos of their knives. Points are awarded based on community votes, and top performers are featured on a leaderboard.

## Features

- **User Authentication**: Secure login and registration functionality.
- **Challenge Participation**: Users can enter knife-making challenges by submitting their work through the app.
- **Judge Role**: Selected users can become judges and have the authority to create new challenges.
- **Leaderboard**: Displays users with the highest total points.
- **Profile Management**: Users can view their entries and update their profile pictures.

## Tech Stack

- **Frontend**: React Native, Expo
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Database**: Firestore with collections for challenges, subcollections for entries and votes, and separate collections for user profiles.

## Database Structure

![Data structure](https://github.com/EConradie/DV300_Term2_Project/blob/main/assets/readme/datastructure.png?raw=true)

## Mockups

![Mockup](https://github.com/EConradie/DV300_Term2_Project/blob/main/assets/readme/mockup.png?raw=true)
![Mockup](https://github.com/EConradie/DV300_Term2_Project/blob/main/assets/readme/mockup2.png?raw=true)
![Mockup](https://github.com/EConradie/DV300_Term2_Project/blob/main/assets/readme/mockup3.png?raw=true)
![Mockup](https://github.com/EConradie/DV300_Term2_Project/blob/main/assets/readme/mockup4.png?raw=true)
![Mockup](https://github.com/EConradie/DV300_Term2_Project/blob/main/assets/readme/mockup5.png?raw=true)

## Demonstration Video

https://drive.google.com/file/d/1HMyLIBtGYFiox-HhXtCEFA8Wc9nj3ML3/view?usp=drive_link

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Expo CLI
- Android Studio or iOS Simulator
- Firebase account

### Installation

1. **Clone the repository**:
```
git clone https://github.com/EConradie/DV300_Term2_Project.git
```

2. **Install dependencies**:
```
npm install
```
### Running the App

3. **Create and configure the Firebase configuration file:**
- Create a file named firebase.js inside a config directory in your project.
- Open config/firebase.js and enter your Firebase configuration as follows:
```
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```
- Remember to replace YOUR_API_KEY, YOUR_AUTH_DOMAIN, etc., with your actual Firebase project settings.

5. **Start the Expo development server**:
```
expo start
```
5. **Open the app on a physical device or emulator**:
- Scan the QR code with the Expo Go app on Android or iOS for real-time testing.
- Use Android Studio or iOS Simulator to run the app in a virtual device environment.

## Challenges Encountered

- **Frontend Architecture**: Finding the optimal structure and technologies to support dynamic content and interactive elements efficiently.
- **Database Design**: Setting up an intuitive yet scalable database structure with Firestore, balancing the complexities of nested collections and real-time updates.

## Future Enhancements

- Implementation of real-time challenge timers.
- Introduction of a system where users can ascend to judges based on their points.
- Enhanced filtering and categorization for challenges.
- Development of a community forums page to enhance user interaction.

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.

Please ensure to update tests as appropriate.

## License

[MIT](LICENSE) © Erik Conradie
