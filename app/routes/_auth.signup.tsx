import type { V2_MetaFunction } from "@remix-run/node";
import AppTitle from "~/utils/AppTitle";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: AppTitle({ subtitle: "Sign up" }),
    },
  ];
};

const SignupPage = () => {
  return <div>SignupPage</div>;
};

export default SignupPage;
