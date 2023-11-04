import { getAuth } from "firebase/auth";
import fbConfig from "./firebase";
const auth = getAuth(fbConfig);
export default auth