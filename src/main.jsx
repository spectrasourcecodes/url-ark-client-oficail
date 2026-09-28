import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserAuthProvider } from './auth/userAuth';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserAuthProvider>
      <App />
    </UserAuthProvider>
  </React.StrictMode>
);

// console.log("🔍 PWA Debug Started");

// window.addEventListener(
//   "beforeinstallprompt",
//   (event) => {
//     console.log(
//       "🎉 beforeinstallprompt fired"
//     );

//     console.log(event);
//   }
// );

// window.addEventListener(
//   "appinstalled",
//   () => {
//     console.log(
//       "✅ PWA installed successfully"
//     );
//   }
// );

// //
// // ==========================
// // SERVICE WORKER
// // ==========================
// //

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', async () => {
//     try {
//       console.log('Registering SW...');

//       const registration =
//         await navigator.serviceWorker.register('/service-worker.js');

//       console.log(
//         '✅ SW Registered:',
//         registration.scope
//       );

//       await navigator.serviceWorker.ready;

//       console.log('✅ SW Ready');
//     } catch (err) {
//       console.error(
//         '❌ SW Registration Failed'
//       );

//       console.error(err);
//     }
//   });
// }

// //
// // ==========================
// // ONLINE / OFFLINE
// // ==========================
// //

// window.addEventListener(
//   "online",
//   () => {
//     console.log("🌐 Online");

//     document.body.classList.remove(
//       "offline"
//     );
//   }
// );

// window.addEventListener(
//   "offline",
//   () => {
//     console.log("📡 Offline");

//     document.body.classList.add(
//       "offline"
//     );
//   }
// );

// //
// // ==========================
// // VISIBILITY
// // ==========================
// //

// document.addEventListener(
//   "visibilitychange",
//   () => {
//     if (document.hidden) {
//       console.log(
//         "👁️ App Hidden"
//       );
//     } else {
//       console.log(
//         "👁️ App Visible"
//       );
//     }
//   }
// );
