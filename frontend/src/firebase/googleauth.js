import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

function handleGoogleLogin() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      console.log(user);
      console.log(user.email);
      console.log(user.displayName);
    })
    .catch((error) => {
      console.log(error);
    });
}

export default handleGoogleLogin;
