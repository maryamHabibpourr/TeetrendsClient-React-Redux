import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  selectAllProoducts,
  selectLoading,
} from "../../../redux/slice/productsSlice";

//assets
import gif from "../../../assets/gif.gif";

//components
import ProductItem from "../productItem/ProductItem";

//styles
import "./ProductList.scss";

//icons
import { IoMdWoman } from "react-icons/io";
import { ImMan, ImArrowUp, ImArrowDown } from "react-icons/im";
import { FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";
import { RiCloseCircleFill } from "react-icons/ri";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

//slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//data
import { Images } from "../../constant/data";

const settings = {
  centerMode: true,
  infinite: true,
  speed: 500,
  nextArrow: <MdArrowBackIosNew />,
  prevArrow: <MdArrowForwardIos />,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        centerMode: false,
      },
    },
    {
      breakpoint: 910,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        centerMode: false,
      },
    },
    {
      breakpoint: 610,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
  ],
};

function ProductList() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProoducts);
  const dataIsLoading = useSelector(selectLoading);
  console.log("products", allProducts);

  const [currentCategory, setCurrentCategory] = useState(null);

  const fetchCategoryProducts = (categoryId = currentCategory, ordering) => {
    if (categoryId !== null) {
      setCurrentCategory(categoryId);
    }
    dispatch(fetchAllProducts({ categoryId, ordering }));
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  if (dataIsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img src={gif} alt="pic" className="animate-spin h-8 w-8" />
      </div>
    );
  }



  return (
    <div className="productListContainer">
    <div className="gallery">
      {Images.map((image) => (
        <div key={image.id} className="galleryContainer">
          <img
            src={image.image}
            alt={image.image}
          />
        </div>
      ))}
    </div>

      <div className="title">
        <h1>تی ترندز</h1>
      </div>

      <div className="filterProducts">
        <button onClick={() => fetchCategoryProducts(1, null)}>
          مردانه
          <ImMan />
        </button>
        <button onClick={() => fetchCategoryProducts(2, null)}>
          زنانه
          <IoMdWoman />
        </button>

        <button
          onClick={() => fetchCategoryProducts(currentCategory, "unit_price")}
        >
          قیمت
          <ImArrowDown />
        </button>
        <button
          onClick={() => fetchCategoryProducts(currentCategory, "-unit_price")}
        >
          قیمت
          <ImArrowUp />
        </button>
        <button
          onClick={() => fetchCategoryProducts(currentCategory, "inventory")}
        >
          موجودی
          <FiArrowDownLeft />
        </button>
        <button
          onClick={() => fetchCategoryProducts(currentCategory, "-inventory")}
        >
          موجودی
          <FiArrowUpRight />
        </button>
        <button onClick={() => navigate(0)}>
          حذف فیلتر
          <RiCloseCircleFill />
        </button>
      </div>

      <div className="spam">
        <div className="contain">
          <Slider {...settings}>
            {allProducts &&
              allProducts.map((product) => {
                return <ProductItem key={product.id} product={product} />;
              })}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
