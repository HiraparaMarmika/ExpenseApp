import * as Yup from "yup";
export const loginschema = Yup.object({
  name: Yup.string().min(2).max(25).required("enter your name please!"),
  email: Yup.string().email().required("enter your email please!"),
  password: Yup.string().min(6).required("enter your password!"),
});
