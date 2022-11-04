# Contributing to Tambayan

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:
- Reporting an issue
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change. 

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Code of Conduct
The code of conduct is described in [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

## Pull Request Process

This project is using the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) standard. Please follow these steps to ensure your commit messages are standardized:

1. Ensure any install or build dependencies are removed before the end of the layer when doing a 
   build.
2. Update the README.md with details of changes to the interface, this includes new environment 
   variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this
   Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you 
   do not have permission to do that, you may request the second reviewer to merge it for you.

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