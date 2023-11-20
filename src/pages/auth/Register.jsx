import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
//styles
import "./auth.scss";
//antd
import { Form, Input, Button, message } from "antd";
import { Alert, Space } from "antd";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectServerMessageUsername,
  selectServerMessageEmail,
  selectServerMessageSimilarPassword,
  selectServerMessageCommonPassword,
  selectServerMessageNumericPassword,
  selectServerMessageSimilarEmailPassword,
  selectOpenSnack,
  selectDisabledBtn,
  selectSendRequest,
} from "../../redux/slice/errorSlice";

import {
  usernameExists,
  emailExists,
  similarPassword,
  commonPassword,
  numericPassword,
  similarEmailPassword,
  openTheSnack,
  disableTheButton,
  allowTheButton,
  changeSendRequest,
} from "../../redux/slice/errorSlice";


//assets
import gif from "../../assets/gif.gif";



function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [dataIsLoading, setDataIsLoading] = useState(false);

  const sendRequest = useSelector(selectSendRequest);
  const openSnack = useSelector(selectOpenSnack);
  console.log(openSnack)
  const disabledBtn = useSelector(selectDisabledBtn);
  const serverMessageUsername = useSelector(selectServerMessageUsername);
  const serverMessageEmail = useSelector(selectServerMessageEmail);
  const serverMessageSimilarPassword = useSelector(
    selectServerMessageSimilarPassword
  );
  const serverMessageCommonPassword = useSelector(
    selectServerMessageCommonPassword
  );
  const serverMessageNumericPassword = useSelector(
    selectServerMessageNumericPassword
  );
  const serverMessageSimilarEmailPassword = useSelector(
    selectServerMessageSimilarEmailPassword
  );

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "ثبت نام با موفقیت انجام شد!",
    });
  };

  const onFinish = (values) => {
    if (
      !serverMessageUsername &&
      !serverMessageEmail &&
      !serverMessageSimilarPassword &&
      !serverMessageCommonPassword &&
      !serverMessageNumericPassword &&
      !serverMessageSimilarEmailPassword
    ) {
      dispatch(changeSendRequest());
      dispatch(disableTheButton());
    }
  };



  useEffect(() => {
    if (sendRequest) {
      const source = Axios.CancelToken.source();
      async function SignUp() {
        try {
          const response = await Axios.post(
            "https://api.teetrends.ir/api-auth-djoser/users/",
            {
              username: form.getFieldValue("username"),
              email: form.getFieldValue("email"),
              password: form.getFieldValue("password"),
              re_password: form.getFieldValue("re_password"),
            },
            {
              cancelToken: source.token,
            }
          );
          console.log(response);
          dispatch(openTheSnack());
        } catch (error) {
          console.log(error.response);
          dispatch(allowTheButton());
          if (error.response.data.username) {
            dispatch(usernameExists());
          } else if (error.response.data.email) {
            dispatch(emailExists());
          } else if (
            error.response.data.password[0] ===
            "این رمز عبور بسیار شبیه نام کاربری می‌باشد."
          ) {
            dispatch(similarPassword());
          } else if (
            error.response.data.password[0] === "این رمز عبور بسیار رایج است."
          ) {
            dispatch(commonPassword());
          } else if (
            error.response.data.password[0] === "رمز شما کلا عدد است"
          ) {
            dispatch(numericPassword());
          } else if (
            error.response.data.password[0] ===
            "این رمز عبور بسیار شبیه email می‌باشد."
          ) {
            dispatch(similarEmailPassword());
          }

        }
      }
      SignUp();
      return () => {
        source.cancel();
      };
    }
  }, [sendRequest]);



  //SETTING FOR SNACKBAR
  useEffect(() => {
    if (openSnack) {
      success();
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    }
  }, [openSnack]);



// useEffect(() => {
//   setDataIsLoading(true);
// },[])




  if (dataIsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img src={gif} alt="pic" className="animate-spin h-8 w-8" />
      </div>
    );
  }





  return (
    <div className="authPage">
      {contextHolder}
      <Card cardClass="cardAuth">
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          {serverMessageUsername ? (
            <Space
              direction="vertical"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              <Alert
                message={serverMessageUsername}
                type="error"
                closable
                style={{ background: "#ff4d4f" }}
              />
            </Space>
          ) : (
            ""
          )}

          {serverMessageEmail ? (
            <Space
              direction="vertical"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              <Alert
                message={serverMessageEmail}
                type="error"
                closable
                style={{ background: "#ff4d4f" }}
              />
            </Space>
          ) : (
            ""
          )}

          {serverMessageSimilarPassword ? (
            <Space
              direction="vertical"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              <Alert
                message={serverMessageSimilarPassword}
                type="error"
                closable
                style={{ background: "#ff4d4f" }}
              />
            </Space>
          ) : (
            ""
          )}

          {serverMessageCommonPassword ? (
            <Space
              direction="vertical"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              <Alert
                message={serverMessageCommonPassword}
                type="error"
                closable
                style={{ background: "#ff4d4f" }}
              />
            </Space>
          ) : (
            ""
          )}

          {serverMessageNumericPassword ? (
            <Space
              direction="vertical"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              <Alert
                message={serverMessageNumericPassword}
                type="error"
                closable
                style={{ background: "#ff4d4f" }}
              />
            </Space>
          ) : (
            ""
          )}

          {serverMessageSimilarEmailPassword ? (
            <Space
              direction="vertical"
              style={{ width: "100%", marginBottom: "5px" }}
            >
              <Alert
                message={serverMessageSimilarEmailPassword}
                type="error"
                closable
                style={{ background: "#ff4d4f" }}
              />
            </Space>
          ) : (
            ""
          )}

          <Form.Item
            label="نام کاربری"
            name="username"
            rules={[
              { required: true, message: "این فیلد نباید خالی باشد!" },
              { min: 5, message: "نام کاربری حداقل باید پنج حرف داشته باشد!" },
              {
                pattern: /^[a-zA-Z0-9]+$/,
                message: "نام کاربری نباید از علائم نگارشی خاص ساخته شود",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ایمیل"
            name="email"
            rules={[
              { required: true, message: "این فیلد نباید خالی باشد!" },
              { type: "email", message: "ایمیل معتبر نمی باشد!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="رمز عبور"
            rules={[
              {
                required: true,
                message: "این فیلد نباید خالی باشد",
              },
              { min: 8, message: "رمز عبور باید حداقل هشت کاراکتر باشد." },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="re_password"
            label="تکرار رمز"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "لطفاً رمز عبور خود را تکرار کنید!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("رمز عبور جدید شبیه نمی باشد!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
            <Button type="primary" htmlType="submit" disabled={disabledBtn}>
              ثبت نام
            </Button>
            <span className="link">
              یا<a href="/login">حساب کاربری دارید؟</a>
            </span>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
