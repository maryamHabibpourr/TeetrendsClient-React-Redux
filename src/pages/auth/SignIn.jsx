import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

//styles
import "./auth.scss";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ACTIVE_USER,
  CHACH_SERVER_ERROR,
} from "../../redux/slice/authSlice";
import { selectServerError } from "../../redux/slice/authSlice";


import {
  OPEN_SNAKBAR,
  DISABLE_BUTTON,
  ALLOW_BUTTON,
  CHANGE_SEND_REQUEST,
} from "../../redux/slice/authSlice";

import {
  selectOpenSnackLogin,
  selectDisabledBtnLogin,
  selectSendRequestLogin,
} from "../../redux/slice/authSlice";

//antd
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { message } from "antd";
import { Alert, Space } from "antd";


function SignIn() {
  const [form] = Form.useForm();
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sendRequestLogin = useSelector(selectSendRequestLogin);
  const openSnackLogin = useSelector(selectOpenSnackLogin);
  const disabledBtnLogin = useSelector(selectDisabledBtnLogin);
  const serverError = useSelector(selectServerError);



  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "با موفقیت وارد شدید!",
    });
  };

  // setting loggin user
  const onFinish = (values) => {
    if (!serverError) {
      dispatch(CHANGE_SEND_REQUEST());
      dispatch(DISABLE_BUTTON());
    }
  };

  useEffect(() => {
    if (sendRequestLogin) {
      const source = Axios.CancelToken.source();
      async function SignIn() {
        try {
          const response = await Axios.post(
            "https://api.teetrends.ir/api-auth-djoser/token/login/",
            {
              username: form.getFieldValue("username"),
              password: form.getFieldValue("password"),
            },
            {
              cancelToken: source.token,
            }
          );
          setToken(response.data.auth_token);
          const { auth_token } = response.data;
          dispatch(
            SET_ACTIVE_USER({
              userToken: auth_token,
            })
          );
          localStorage.setItem("theUserToken", auth_token);
          console.log(response);
        } catch (error) {
          console.log(error.response);
          dispatch(ALLOW_BUTTON());
          dispatch(CHACH_SERVER_ERROR());
        }
      }
      SignIn();
      return () => {
        source.cancel();
      };
    }
  }, [sendRequestLogin, form, dispatch]);



  //Get user Info
  useEffect(() => {
    if (token !== "") {
      const source = Axios.CancelToken.source();
      async function GetUserInfo() {
        try {
          const response = await Axios.get(
            "https://api.teetrends.ir/api-auth-djoser/users/me/",
            {
              headers: { Authorization: "Token ".concat(token) },
            },
            {
              cancelToken: source.token,
            }
          );
          const { id, username, email } = response.data;
          dispatch(
            SET_ACTIVE_USER({
              userUsername: username,
              userEmail: email,
              userId: id,
            })
          );
          localStorage.setItem("theUserId", id);
          localStorage.setItem("theUserusename", username);
          localStorage.setItem("theUserEmail", email);
          console.log(response);
          dispatch(OPEN_SNAKBAR());
        } catch (error) {
          console.log(error.response);
        }
      }
      GetUserInfo();
      return () => {
        source.cancel();
      };
    }
  }, [token]);

  //SETTING FOR SNACKBAR
  useEffect(() => {
    if (openSnackLogin) {
      success();
      setTimeout(() => {
        navigate("/");
      }, 2500);
    }
  }, [openSnackLogin]);


  
  return (
    <div className="authPage">
      {contextHolder}
      <Card cardClass="cardAuth">
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          {serverError ? (
            <Space
              direction="vertical"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              <Alert
                message="نام کاربری یا کلمه عبور اشتباه است!"
                type="error"
                closable
                style={{ background: "#ff4d4f" }}
              />
            </Space>
          ) : (
            ""
          )}

          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "لطفا نام کاربری را وارد نمایید!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="نام کاربری"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "لطفاً رمز عبور را وارد نمایید!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="رمز عبور"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ color: "#fff", fontFamily:"YekanBakh" }}>مرا به خاطر بسپار</Checkbox>
            </Form.Item>

            <a
              className="login-form-forgot"
              href=""
              style={{ marginRight: "5px" , fontFamily:"YekanBakh"}}
            >
              فراموشی رمز عبور
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={disabledBtnLogin}
            >
              ورود
            </Button>
            <span className="link">
              یا <a href="/register">الان ثبت نام انجام بده!</a>
            </span>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default SignIn;
