import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width:"100%",
        dispaly: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="صفحه یافت نشد!"
        extra={
          <Button onClick={() => navigate("/")} type="primary">
            برگشت به خانه
          </Button>
        }
      />
    </div>
  );
}

export default NotFound;
