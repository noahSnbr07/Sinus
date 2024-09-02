import { PreferenceProfile } from '../interfaces/PreferenceProfile'

//returns a boolean weather a profile has been initialized yet or not
const isInitialized = (): boolean => {
   return localStorage.getItem("profile") ? true : false;
}

//the default profile which is initialized bey default
const defaultProfile: PreferenceProfile = {
   background: '000000ff',
   textColor: '#ffffffff',
}

//initialize the profile in the local Storage
const initialize = (): void => {
   localStorage.setItem("profile", JSON.stringify(defaultProfile));
   console.log('profile has been initialized')
}

//set a nee profile
const setProfile = ({ profile }: { profile: PreferenceProfile }): void => {
   localStorage.setItem("profile", JSON.stringify(profile));
   console.log("new profile has been set");
}

//get the current profile
const getProfile = (): PreferenceProfile => {
   return JSON.parse(localStorage.getItem("profile")!);
}

export {
   isInitialized,
   setProfile,
   getProfile,
   initialize,
}