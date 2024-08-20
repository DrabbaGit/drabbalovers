## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Firebase

Log in to your Firebase account, create a project, enable Firebase Database and Storage services.
Then go to the project configuration, select the option to initialize a web application and copy the "firebaseconfig" of your project.

Inside of the project, you will find a fill called 'lib/firebase.js', where are the configuration variables for firebase services such as database and storage:

`firebaseConfig = {
  apiKey: YOUR_FIREBASE_CONFIGURATION,
  authDomain: YOUR_FIREBASE_CONFIGURATION,
  projectId: YOUR_FIREBASE_CONFIGURATION,
  storageBucket: YOUR_FIREBASE_CONFIGURATION,
  messagingSenderId: YOUR_FIREBASE_CONFIGURATION,
  appId: YOUR_FIREBASE_CONFIGURATION
};`

Inicializing the fireebase app 
`export const firebaseApp = initializeApp(firebaseConfig);`

Inicializing the storage to the images
`export const storage = getStorage(firebaseApp);`

