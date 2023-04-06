import LockClosedIcon from "@heroicons/react/24/outline/LockClosedIcon";
import { Alert, Typography } from "@material-tailwind/react";
import type { ActionFunction, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { isAxiosError } from "axios";
import invariant from "tiny-invariant";
import { login } from "~/models/user.server";
import { createUserSession } from "~/session.server";
import AppTitle from "~/utils/AppTitle";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: AppTitle({ subtitle: "Login" }),
    },
  ];
};

type ActionData = {
  data: AR_Login | null;
  errors: any;
  errorType: string | null;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  invariant(typeof email === "string", "Email must be string");
  invariant(typeof password === "string", "Password must be string");
  try {
    const user = await login({ request, email, password });
    return createUserSession({
      redirectTo: "/",
      accessToken: user.data.data.access_token,
      request,
    });
  } catch (error: any) {
    if (isAxiosError(error)) {
      if (error.response?.status === 403) {
        return json<ActionData>({
          data: null,
          errors: error.response?.data,
          errorType: "FORM_ERROR",
        });
      }
      if (error.response?.status === 404) {
        return json<ActionData>({
          data: null,
          errors: error.response?.data?.errors?.message,
          errorType: "MSG_FAILED",
        });
      }
      return json<ActionData>({
        data: null,
        errors: "Gagal melakukan permintaan anda.",
        errorType: "MSG_FAILED",
      });
    } else {
      return json<ActionData>({
        data: null,
        errors: "Gagal melakukan permintaan anda.",
        errorType: "MSG_FAILED",
      });
    }
  }
};

const LoginPage = () => {
  const action = useActionData<ActionData>();
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Typography
            className="mx-auto text-center uppercase font-bold"
            variant="h1"
          >
            🦊
          </Typography>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up if you don't have account
            </Link>
          </p>
          {action?.errorType === "MSG_FAILED" ? (
            <Alert className="mt-4" color="red">
              {action?.errors}
            </Alert>
          ) : null}
        </div>
        <Form className="mt-8 space-y-6" method="POST">
          <div className="space-y-3 rounded-md shadow-sm">
            <div>
              <input
                id="email-address"
                name="email"
                type="text"
                className="relative block w-full rounded border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
              />
              {action?.errorType === "FORM_ERROR" ? (
                <ul className="text-xs">
                  {action?.errors?.email?.map(
                    (error: string, index: number) => (
                      <li className="text-red-600" key={index}>
                        - {error}
                      </li>
                    )
                  )}
                </ul>
              ) : null}
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                className="relative block w-full rounded border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Password"
              />
              {action?.errorType === "FORM_ERROR" ? (
                <ul className="text-xs">
                  {action?.errors?.password?.map(
                    (error: string, index: number) => (
                      <li className="text-red-600" key={index}>
                        - {error}
                      </li>
                    )
                  )}
                </ul>
              ) : null}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label> */}
            </div>

            <div className="text-sm">
              <Link
                to="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
