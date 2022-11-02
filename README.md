# Tambayan: sa Gedli
<a href="https://tambayan.netlify.app">Tambayan</a> is an open-source chat platform where you can chat with other people, make more friends, and tumambay. Join Tambayan rooms, start chatting with people, have fun with bots, and much more!

## Contributions

If you like this project, please consider giving it a start. Tambayan is open to contributions, but I recommend creating an issue or replying in a comment to let me know what you are working on first that way we don't overwrite each other.

### Built With
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind](https://tailwindcss.com/)

## Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

Here is what you need to be able to run Tambayan.

- Node.js (Version: >=15.x <17)
- A Firebase project

## Development

### Setup

1. Clone the repo into a public GitHub repository (or fork https://github.com/jabezborja/tambayan/fork).

   ```sh
   git clone https://github.com/jabezborja/tambayan.git
   ```

2. Go to the project folder

   ```sh
   cd tambayan
   ```

3. Install packages with `npm`

   ```sh
   npm install
   ```

4. Set up your .env file
   - Duplicate `.env.example` to `.env.local`
   - Go to your Firebase Project and copy your `firebaseConfig` (follow [these steps](https://support.google.com/firebase/answer/7015592?hl=en))
   - Paste them to your `.env` respectively

5. Enable Google login or GitHub login to your Firebase project
6. Turn on Firestore and set the rules to public

7. Run the app
  
  ```sh
  npm run dev
  ```
  
8. Commit your changes

  ```sh
  git add -A
  git commit -m "impl: some changes"
  git push origin HEAD
  ```
9. Submit a Pull Request on the `staging` branch.

### Contributors
<a href="https://github.com/jabezborja/tambayan/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jabezborja/tambayan" />
</a>

## Code of Conduct

Please read [CODE_OF_CONDUCT.md](https://github.com/jabezborja/tambayan/blob/staging/CODE_OF_CONDUCT.md) for details on our code of conduct.
