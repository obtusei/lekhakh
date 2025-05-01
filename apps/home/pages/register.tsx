import { useState, useEffect } from "react";
import { UserSign } from "ui";
import RegisterUser from "ui/components/Sign/Register";
import { registerTheUser, GetSession } from "../api/user";
import { useRouter } from "next/router";
import { showNotification } from "ui";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";

function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("register");
  const { session, isLoading } = GetSession();
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const registerData = {
    title: t("register"),
    subTitle: t("createAnAccount"),
    name: t("name"),
    username: t("username"),
    email: t("email"),
    password: t("password"),
    confirmPassword: t("confirmPassword"),
    button: t("register"),
    footer: t("alreadyHaveAccount"),
    subFooter: t("login"),
    nameRequired: t("nameRequired"),
    usernameRequired: t("usernameRequired"),
    emailRequired: t("emailIsNotValid"),
    passwordRequired: t("passwordRequired"),
    confirmPasswordRequired: t("passwordIsNotMatch"),
    pname: t("pname"),
    pusername: t("pusername"),
    pemail: t("pemail"),
    ppassword: t("password"),
    pcpassword: t("confirmPassword"),
    usernameExist: t("usernameAlreadyExists"),
    emailExist: t("emailAlreadyExists"),
    fillName: t("fillName"),
    fillEmail: t("fillEmail"),
    fillUsername: t("fillUsername"),
    fillPassword: t("fillPassword"),
    passwordIsNotMatch: t("passwordIsNotMatch"),
  };
  useEffect(() => {
    if (session && session.user) {
      router.push("/");
    }
  });

  if (session && session.user) {
    return <></>;
  } else if (isLoading) {
    return <>Loading...</>;
  } else {
    return (
      <div>
        <UserSign>
          <RegisterUser
            onSubmit={async (values) => {
              const { name, username, email, password } = values;
              axios
                .post(
                  "/auth/register",
                  { name, email, username, password },
                  { withCredentials: true }
                )
                .then((res) => {
                  showNotification({
                    message: t("successfullyRegistered"),
                    color: "green",
                  });
                  router.push("/login");
                })
                .catch((err) => {
                  console.log(err.response.data);
                  if (err.response.data.doesEmailExist) {
                    setEmailError(true);
                  } else {
                    setUsernameError(true);
                  }
                });
            }}
            loading={loading}
            stringData={registerData}
            emailError={emailError}
            usernameError={usernameError}
          />
        </UserSign>
      </div>
    );
  }
}

export default Register;
