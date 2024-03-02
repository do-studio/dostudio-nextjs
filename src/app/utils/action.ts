"use server";

import { sessionOptions, SessionData, defaultSession } from "../../app/utils/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

let username = process.env.USER_USERNAME;
let password = process.env.USER_PASSWORD;


export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }


  return session;
};

export const login = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSession();

  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;

  // CHECK USER IN THE DB
  // const user = await db.getUser({username,password})

  if (formUsername !== username || formPassword !== password) {
    return { error: "Wrong Credentials!" };
  }

  session.userId = "1";
  session.username = formUsername;
  session.password = formPassword;
  session.isLoggedIn = true;

  await session.save();
  redirect("/dashboard");
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/login");
};


