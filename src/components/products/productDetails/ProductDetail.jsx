import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
//styles
import styles from "./ProductDetail.module.scss";
//ant
import { Image, message } from "antd";

//persian tools
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";
//assets
import gif from "../../../assets/gif.gif";
//date
import moment from "moment-jalaali";
//validate
import { validatePostComment } from "./validatePostComment";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  postCommentRequested,
  postCommentSucceeded,
  postCommentFailed,
  disableTheButton,
  allowTheButton,
  setCommentValue,
} from "../../../redux/slice/commentSlice";

import {
  selectOpenSnack,
  selectDisabledBtn,
  selectSendRequest,
  selectCommentValue,
} from "../../../redux/slice/commentSlice";

function ProductDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const commentValue = useSelector(selectCommentValue);
  const sendRequest = useSelector(selectSendRequest);
  const openSnack = useSelector(selectOpenSnack);
  const disabledBtn = useSelector(selectDisabledBtn);
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const [productInf, setProductInfo] = useState("");
  const [productComments, setProductComments] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    async function GetProductInfo() {
      setDataIsLoading(true);
      try {
        const response = await Axios.get(
          `https://api.teetrends.ir/store/products/${params.id}/`
        );
        console.log(response.data);
        setProductInfo(response.data);
        setDataIsLoading(false);
      } catch (e) {
        console.log(e.response);
      }
    }
    GetProductInfo();
  }, []);

  useEffect(() => {
    async function GetProductComments() {
      try {
        const response = await Axios.get(
          `https://api.teetrends.ir/store/products/${params.id}/comments`
        );
        console.log(response.data);
        setProductComments(response.data);
      } catch (e) {
        console.log(e.response);
      }
    }
    GetProductComments();
  }, []);

  //setting for comment
  const formSubmit = (e) => {
    e.preventDefault();
    const formData = {
      commentValue: commentValue,
    };
    const formErrors = validatePostComment(formData);
    setErrors(formErrors);
    if (!Object.keys(formErrors).length) {
      dispatch(postCommentRequested());
      dispatch(disableTheButton());
    } else {
      setTouched({
        commentValue: true,
      });
    }
  };

  useEffect(() => {
    if (sendRequest) {
      async function CommentBody() {
        const formData = new FormData();
        formData.append("body", commentValue);
        try {
          const response = await Axios.post(
            `https://api.teetrends.ir/store/products/${productInf.id}/comments/`,
            formData
          );
          console.log(response.data);
          dispatch(postCommentSucceeded());
          dispatch(openTheSnack());
        } catch (e) {
          console.log(e.message);
          dispatch(postCommentFailed());
          dispatch(allowTheButton());
        }
      }
      CommentBody();
    }
  }, [sendRequest]);

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "با موفقیت ارسال شد!",
    });
  };

  useEffect(() => {
    if (openSnack) {
      success();
      setTimeout(() => {
        navigate(0);
      }, 2500);
    }
  }, [openSnack]);

  if (dataIsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img src={gif} alt="pic" className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <div className={styles.productDetailPage}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h3>{productInf.name}</h3>
          <p className={styles.description}>{productInf.description}</p>
          <p className={styles.category}>
            <span>قیمت محصول:</span>
            {`${digitsEnToFa(addCommas(productInf.unit_price))} تومان`}
          </p>
          <div className={styles.buttonContainer}>
            <Link to="/products">برگشت به فروشگاه</Link>
          </div>
        </div>

        <div className={styles.mediaCart}>
          <Image.PreviewGroup>
            <Image
              width={500}
              height={600}
              src={productInf.image}
            />
          </Image.PreviewGroup>
        </div>
      </div>

      <div className={styles.commentContainer}>
        <div className={styles.textfeildContainer}>
          {productComments.length > 0 ? (
            <h2>
              <span>{digitsEnToFa(productComments.length)}</span>نظر برای این
              محصول وجود دارد!
            </h2>
          ) : (
            <h2>نظری یرای این محصول ثبت نشده است!</h2>
          )}

          {productComments &&
            productComments.map((comment) => {
              return (
                <div key={comment.id} className={styles.commentTextfield}>
                  <div className={styles.body}>
                    <p>{comment.body}</p>
                  </div>
                  <span>
                    {digitsEnToFa(
                      moment(comment.time, "YYYY-MM-DD HH:mm").format(
                        "jYYYY/jMM/jDD HH:mm"
                      )
                    )}
                  </span>
                </div>
              );
            })}
        </div>
        <div className={styles.postComment}>
          {contextHolder}
          <h1>نظر خود را برای این محصول ثبت نمایید!</h1>
          <form onSubmit={formSubmit}>
            <input
              className={
                errors.commentValue && touched.commentValue
                  ? styles.uncompleted
                  : styles.formInput
              }
              type="text"
              name="commentValue"
              value={commentValue}
              onChange={(e) => dispatch(setCommentValue(e.target.value))}
            />
            {errors.commentValue && touched.commentValue && (
              <span className={styles.errorSpan}>{errors.commentValue}</span>
            )}
            <button type="submit" disabled={disabledBtn}>
              ارسال
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
