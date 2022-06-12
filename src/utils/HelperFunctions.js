import { showMessage } from "../library/messages";

export const isEmailValid = (email) => {
    const regExForEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExForEmail.test(email);
  };

  export const handleErrorFromEmailLogin = (code, message) => {
    switch (code) {
      case "auth/user-not-found":
        return showMessage("error", "This account does not exist. Create one!");
      case "auth/wrong-password":
        return showMessage("error", "Entered incorrect password");
      default:
        return showMessage("error", message);
    }
  };


  export const isWebsiteLinkValid=(link)=>{
    const regExForLinks = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

    return regExForLinks.test(link)
  }


 