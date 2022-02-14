import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiGet } from "../../helpers/Api/ApiData";
import Auth from "../../helpers/auth";

function LogoutCom() {
  const history = useHistory();

  useEffect(() => {
    const result = window.confirm("Do you want to logout ?");
    if (result) {
      ApiGet("logout", {})
        .then((res) => {
          console.log("res", res);
          if (res.data.success) {
            toast.success(res.data.message, {
              autoClose: 5000,
              hideProgressBar: true,
            });
            Auth.clearLocalStorage();
            history.push("/login");
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      history.push("/home");
    }
  }, []);

  return <div style={{ minHeight: "calc(100vh - 177px)" }}></div>;
}

export default LogoutCom;
