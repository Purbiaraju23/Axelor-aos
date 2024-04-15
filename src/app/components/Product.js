import React, { useState, useEffect } from "react";
import AdditionalSearchSelect from "./AdditionalSearchSelect";
import "../../Styles/AddProduct.css";
import { Close } from "@mui/icons-material";
import { fetchProductActionData, fetchProductData } from "app/services/rest";
import {
  PRODUCT_ACTION_REQ_BODY,
  PRODUCT_BODY,
  PRODUCT_MODEL,
  PRODUCT_UNIT_BODY,
  PRODUCT_UNIT_MODEL,
} from "app/Utils/Constant";
import LabelledTextField from "./LabelledTextField";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

function Product({
  onClick,
  clientPartner,
  handleAddOrders,
  currency,
  visible,
}) {
  const [product, setProduct] = useState([]);
  const [isProductSelectOpen, setIsProductSelectOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productName, setProductName] = useState("");
  const [productQty, setProductQty] = useState("1.000");
  const [productUnitPrice, setProductUnitPrice] = useState("0.000000");
  const [productUnit, setProductUnit] = useState([]);
  const [selectedProductUnit, setSelectedProductUnit] = useState({});
  const [productPrice, setProductPrice] = useState("0.00");
  const [productinTaxTotal, setProductinTaxTotal] = useState("0.00");
  const [selected, setSelected] = useState(false);
  const [isProductUnitSelected, setIsProductUnitSelected] = useState(false);

  const handleChange = (event, identifier) => {
    const value = event.target.value;
    if (identifier === "product") {
      setProductName(value);
    } else if (identifier === "productQty") {
      setProductQty(value);
    } else if (identifier === "productUnitPrice") {
      setProductUnitPrice(value);
    }
  }

  useEffect(() => {
    if (isProductSelectOpen) {
      const getProductdata = async () => {
        const res = await fetchProductData(PRODUCT_MODEL, PRODUCT_BODY);
        setProduct(res.data);
      };
      getProductdata();
    }
  }, [isProductSelectOpen]);

  useEffect(() => {
    if (isProductUnitSelected) {
      const getProductUnitData = async () => {
        const res = await fetchProductData(
          PRODUCT_UNIT_MODEL,
          PRODUCT_UNIT_BODY
        );
        setProductUnit(res.data);
      };
      getProductUnitData();
    }
  }, [isProductUnitSelected]);

  useEffect(() => {
    if (selected) {
      let body = { ...PRODUCT_ACTION_REQ_BODY };
      body.data.context = {
        ...body.data.context,
        product: selectedProduct,
        currency: currency,
        currencySymbol: currency?.symbol || ""
      };
      body.data.context._parent = {
        ...body.data.context._parent,
        clientPartner: clientPartner,
        currency: currency
      };

      const getData = async () => {
        const res = await fetchProductActionData(body);
        setProductName(res.data[0].values.productName);
        setProductQty(res.data[0].values.qty);
        setProductUnitPrice(res.data[0].values.price);
        setSelectedProductUnit(res.data[0].values.unit);
        setProductPrice(res.data[1].values.exTaxTotal);
        setProductinTaxTotal(res.data[1].values.inTaxTotal);
      };
      getData();
    }
  }, [selectedProduct]);

  return (
    <Dialog open={visible} onClose={onClick} PaperProps={
      { style: { overflow: "hidden", width: "100%" } }
    }>
      <DialogTitle>
        SO Line <Close className="close-icon" onClick={onClick} />
      </DialogTitle>
      <DialogContent>
        <div className="form">
          <AdditionalSearchSelect
            label="Product"
            onOpen={() => setIsProductSelectOpen(true)}
            onClose={() => setIsProductSelectOpen(false)}
            options={product}
            onMenuSelected={setSelectedProduct}
            value={selectedProduct?.fullName || ""}
            selected={setSelected}
          />
          <LabelledTextField
            label="Displayed Product Name"
            onChange={(event) => handleChange(event, "product")}
            value={productName || ""}
          />

          <LabelledTextField
            label={'Quantity'}
            type='number'
            value={productQty}
            onChange={
              (event) => {
                const newValue = parseInt(event.target.value);
                if (!isNaN(newValue) && newValue >= 0) {
                  handleChange(event, "productQty")
                }
              }
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                const fetchdata = async () => {
                  const reqBody = { ...PRODUCT_ACTION_REQ_BODY };
                  reqBody.data.context = {
                    ...reqBody.data.context,
                    qty: productQty,
                  };
                  reqBody.data.context = {
                    ...reqBody.data.context,
                    product: selectedProduct,
                  };
                  reqBody.data.context._parent = {
                    ...reqBody.data.context._parent,
                    clientPartner: clientPartner,
                  };
                  const res = await fetchProductActionData(reqBody)
                  if (res) {
                    setProductPrice(res.data[0].values.exTaxTotal);
                    setProductinTaxTotal(res.data[0].values.inTaxTotal);
                  }
                };
                fetchdata();
              }
            }}
          />
          <AdditionalSearchSelect
            label="Unit"
            onOpen={() => setIsProductUnitSelected(true)}
            onClose={() => setIsProductUnitSelected(false)}
            options={productUnit}
            onMenuSelected={setSelectedProductUnit}
            value={selectedProductUnit?.name || ""}
            selected={setSelected}
          />

          <LabelledTextField
            label={"Unit Price"}
            value={productUnitPrice}
            onChange={(event) => handleChange(event, 'productUnitPrice')}
          />

          <LabelledTextField label='Total W.T.' value={productPrice} disabled={true} />
          <br />

          <Button variant="contained" onClick={() => {
            if (product.length !== 0) {
              handleAddOrders({
                product: selectedProduct,
                productName: productName,
                qty: productQty,
                inTaxTotal: productinTaxTotal,
                exTaxTotal: productPrice,
                unit: selectedProductUnit,
                priceDiscounted: productUnitPrice,
              });
              onClick();
            }
            else {
              alert("Please add product");
            }
          }}>
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Product;
