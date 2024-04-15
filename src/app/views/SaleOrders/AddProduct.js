import React, { useState, useEffect } from "react";
import {
  fetchCompanyData,
  fetchContactData,
  fetchCurrencyData,
  fetchCustomerData,
  fetchCustomerPartnerData,
  fetchModelData,
  fetchProductActionData,
  fetchSelectedCustomerData,
} from "app/services/rest";
import {
  COMPANY_MODEL,
  COMPANY_REQ_BODY,
  CURRENCY_MODEL,
  CURRENCY_REQ_BODY,
  PARTNER_MODEL,
  PARTNER_REQUEST_BOBY2,
  PARTNER_REQUEST_BOBY1,
  CONTACT_REQ_BODY1,
  CONTACT_REQ_BODY2,
  CUSTOMER_ACTION_REQ_BODY,
  CONTACT_ACTION_BODY,
  FINAL_DATA,
  SALE_MODEL,
  STEPS,
} from "app/Utils/Constant";
import ToolBar from "../../components/ToolBar";
import { useNavigate } from "react-router-dom";
import SearchSelect from "../../components/SearchSelect";
import AdditionalSearchSelect from "../../components/AdditionalSearchSelect";
import Address from "app/components/Address";
import "../../../Styles/AddProduct.css";
import OrderLine from "app/components/OrderLine";
import ProductTotal from "app/components/ProductTotal";
import Product from "app/components/Product";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Step, StepLabel, Stepper } from "@mui/material";
import BasicTabs from "app/components/BasicTabs";

function AddProduct() {
  const [company, setCompany] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState({});
  const [isCompanySelectOpen, setIsCompanySelectOpen] = useState(false);
  const [currency, setCurrency] = useState([]);
  const [isCurrencySelectOpen, setIsCurrencySelectOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [additionalCurrency, setAdditionalCurrency] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({});
  const [additionalCustomerDetails, setAdditionalCustomerDetails] = useState(
    {}
  );
  const [isCustomerSelectOpen, setIsCustomerSelectOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({
    fullName: "",
    id: "",
    $version: "",
  });
  const [additionalCustomer, setAdditionalCustomer] = useState([]);
  const [contact, setContact] = useState([]);
  const [isContactSelectOpen, setIsContactSelectOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState("");
  const [additionalContact, setAdditionalContact] = useState([]);
  const [mainAddress, setMainAddress] = useState({
    fullName: "",
    id: "",
    $version: "",
  });
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: "",
    id: "",
    $version: "",
  });
  const [isSelected, setIsSelected] = useState(false);
  const [isAdditionalSelected, setIsAdditionalSelected] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [orderLinesList, setOrderLinesList] = useState([]);
  const [productTotalDetails, setProductTotalDetails] = useState({
    inTaxTotal: 0.0,
    taxTotal: 0.0,
    exTaxTotal: 0.0
  })
  const [confirmOpen, setConfirmOpen] = useState(false);

  let DOMAIN = "";

  const handleAddOrders = (order) => {
    const existingOrderIndex = orderLinesList.findIndex(existingOrder => existingOrder.product.code === order.product.code);
    if (existingOrderIndex !== -1) {
      const updatedOrderLinesList = [...orderLinesList];
      updatedOrderLinesList[existingOrderIndex] = {
        ...updatedOrderLinesList[existingOrderIndex],
        qty: Number(updatedOrderLinesList[existingOrderIndex].qty) + Number(order.qty),
        exTaxTotal: Number(updatedOrderLinesList[existingOrderIndex].exTaxTotal) + Number(order.exTaxTotal),
        inTaxTotal: Number(updatedOrderLinesList[existingOrderIndex].inTaxTotal) + Number(order.inTaxTotal),
        priceDiscounted: Number(updatedOrderLinesList[existingOrderIndex].priceDiscounted) + Number(order.priceDiscounted),
      };
      setOrderLinesList(updatedOrderLinesList);
    } else {
      setOrderLinesList([
        ...orderLinesList,
        order,
      ]);
    }
  }

  const handleDeleteOrder = (orders) => {
    setOrderLinesList(orderLinesList.filter((order) => !orders.includes(order)));
  };


  useEffect(() => {
    if (orderLinesList) {
      let taxTotal = 0;
      let inTaxTotal = 0;
      let exTaxTotal = 0;
      orderLinesList.map((orderLine) => {
        exTaxTotal = exTaxTotal + Number(orderLine.exTaxTotal);
        inTaxTotal = inTaxTotal + Number(orderLine.inTaxTotal);
        taxTotal = taxTotal + Number(orderLine.inTaxTotal) - Number(orderLine.exTaxTotal);
      })
      setProductTotalDetails({
        inTaxTotal: inTaxTotal,
        exTaxTotal: exTaxTotal,
        taxTotal: taxTotal
      })
    }
  }, [orderLinesList])

  const handleChange = (event, identifier) => {
    const value = event.target.value;
    if (identifier === "main-address") {
      setMainAddress(value);
    } else if (identifier === "delivery-address") {
      setDeliveryAddress(value);
    }
  };
  const currency_body = { ...CURRENCY_REQ_BODY };
  currency_body.limit = 166;
  const getCompanyData = async () => {
    try {
      const res = await fetchCompanyData(COMPANY_MODEL, COMPANY_REQ_BODY);
      setCompany(res.data);
    } catch (error) {
      alert(`Error Fetch data: ${error}`);
    }
  };

  const getCurrencyData = async (MODEL, reqBody, setData) => {
    try {
      const response = await fetchCurrencyData(MODEL, reqBody);
      setData(response.data);
    } catch (error) {
      alert(`Error Fetch data: ${error}`);
    }
  };

  const getCustomerPartnerData = async (MODEL, reqBody, setData) => {
    try {
      const response = await fetchCustomerPartnerData(MODEL, reqBody);
      setData(response.data);
    } catch (error) {
      alert(`Error Fetch data: ${error}`);
    }
  };

  const getContactData = async (MODEL, reqBody, setData) => {
    try {
      const res = await fetchContactData(MODEL, reqBody);
      setData(res.data);
    } catch (error) {
      alert(`Error Fetch data: ${error}`);
    }
  };

  const getCustomerDetails = async (reqBody, setData) => {
    try {
      const response = await fetchSelectedCustomerData(reqBody);
      if (response) {
        setData(response);
        setMainAddress({ ...response.data[0]?.values?.mainInvoicingAddress });
        setDeliveryAddress({ ...response.data[0]?.values?.deliveryAddress });
        getCurrencyData(CURRENCY_MODEL, currency_body, setCurrency);
        setSelectedCurrency({ ...response.data[0]?.values?.currency });
      }
    } catch (error) {
      alert(`Error Fetch data: ${error}`);
    }
  };

  useEffect(() => {
    if (isCompanySelectOpen) {
      getCompanyData();
    }
    if (isCurrencySelectOpen) {
      getCurrencyData(CURRENCY_MODEL, CURRENCY_REQ_BODY, setCurrency);
    }
    if (isCustomerSelectOpen && !isSelected && !isAdditionalSelected) {
      getCustomerPartnerData(PARTNER_MODEL, PARTNER_REQUEST_BOBY1, setCustomer);
    }
    if (isContactSelectOpen && !isSelected && !isAdditionalSelected) {
      getContactData(PARTNER_MODEL, CONTACT_REQ_BODY1, setContact);
    }
  }, [
    isCompanySelectOpen,
    isCurrencySelectOpen,
    isCustomerSelectOpen,
    isContactSelectOpen,
    isSelected,
    isAdditionalSelected,
  ]);

  useEffect(() => {
    const reqBody = { ...CUSTOMER_ACTION_REQ_BODY };
    if (selectedCustomer && isSelected) {
      reqBody.data.context.clientPartner = customerDetails;
      getCustomerDetails(reqBody, setCustomerDetails);
    }
    if (selectedCustomer && isAdditionalSelected) {
      reqBody.data.context.clientPartner = additionalCustomerDetails;
      getCustomerDetails(reqBody, setAdditionalCustomerDetails);
    }
  }, [selectedCustomer]);

  const getSelectedContactData = async (reqBody) => {
    const response = await fetchSelectedCustomerData(reqBody);
    DOMAIN = (response?.data[0]?.attrs?.contactPartner?.domain);
  };

  useEffect(() => {
    const reqBody = { ...CONTACT_ACTION_BODY };
    if (isSelected) {
      reqBody.data.context.clientPartner =
        customerDetails.data[1].values.clientPartner;
      getSelectedContactData(reqBody)
        .then(() => {
          const contactBody = { ...CONTACT_REQ_BODY1 };
          contactBody.data._domainContext.currency = selectedCurrency;
          contactBody.data._domainContext.company = selectedCompany;
          contactBody.data._domainContext.clientPartner = selectedCustomer;
          contactBody.data._domainContext.mainInvoicingAddress = mainAddress;
          contactBody.data._domainContext.deliveryAddress = deliveryAddress;
          contactBody.data._domain = DOMAIN;
          getContactData(PARTNER_MODEL, contactBody, setContact);
        })
        .catch((error) => {
          console.error(`Error Fetch data: ${error}`);
        });
    }
    if (isAdditionalSelected) {
      reqBody.data.context.clientPartner =
        additionalCustomerDetails.data[1].values.clientPartner;
      getSelectedContactData(reqBody)
        .then(() => {
          const contactBody = { ...CONTACT_REQ_BODY2 };
          contactBody.data._domain = DOMAIN;
          contactBody.data._domainContext.currency = selectedCurrency;
          contactBody.data._domainContext.company = selectedCompany;
          contactBody.data._domainContext.clientPartner = selectedCustomer;
          contactBody.data._domainContext.mainInvoicingAddress = mainAddress;
          contactBody.data._domainContext.deliveryAddress = deliveryAddress;
          getContactData(PARTNER_MODEL, contactBody, setContact);
        })
        .catch((error) => {
          console.error(`Error Fetch data: ${error}`);
        });
    }
  }, [isContactSelectOpen]);

  const handle = () => {
    setIsVisible(true);
  };

  const handleFinalize = async () => {
    try {
      if (orderLinesList.length === 0) {
        alert("Order line list is empty!");
        return;
      }

      const prepareData = async () => {
        const taxAdjustedOrderLines = orderLinesList.map(orderLine => ({
          ...orderLine,
          id: null,
          taxTotal: orderLine.productinTaxTotal - orderLine.exTaxTotal,
        }));

        const response = await fetchProductActionData({
          action: "action-group-sale-order-finalize-quotation",
          model: "com.axelor.apps.sale.db.SaleOrder",
          data: { context: { saleOrderLineList: taxAdjustedOrderLines } },
        });

        if (response) {
          return response.data[0].pending;
        }
      };

      const getOrderId = async () => {
        const QuotationState = await prepareData();

        if (QuotationState) {
          const reqBody = { ...FINAL_DATA };
          reqBody.data = {
            ...reqBody.data,
            taxTotal: productTotalDetails.taxTotal,
            inTaxTotal: productTotalDetails.inTaxTotal,
            exTaxTotal: productTotalDetails.exTaxTotal,
            currency: selectedCurrency,
            clientPartner: selectedCustomer,
            mainInvoicingAddress: mainAddress,
            deliveryAddress: deliveryAddress,
            contactPartner: selectedContact,
          };

          reqBody.data.saleOrderLineList = orderLinesList.map(orderLine => ({
            ...orderLine,
            inTaxPrice: orderLine.inTaxTotal,
          }));

          const res = await fetchModelData(SALE_MODEL, reqBody);

          if (res) {
            const orderId = res.data[0].id;
            navigate(`/home/edit/${orderId}`, {
              state: {
                data: {
                  action: QuotationState,
                  model: "com.axelor.apps.sale.db.SaleOrder",
                  id: orderId,
                  currency: selectedCurrency,
                  clientPartner: selectedCustomer,
                  mainInvoicingAddress: mainAddress,
                  deliveryAddress: deliveryAddress,
                  contactPartner: selectedContact,
                  orderLinesList: orderLinesList,
                  formStep: res.data[0].statusSelect + 1,
                }
              }
            });
          }
        }
      };

      await getOrderId();
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  useEffect(() => {
    if (Object.keys(selectedCurrency).length !== 0) {
      const reqBody = {
        "fields": [
          "numberOfDecimals",
          "symbol"
        ]
      }
      const getCurrencySymbol = async () => {
        const response = await fetchCustomerData(CURRENCY_MODEL, selectedCurrency.id, reqBody);
        if (response) {
          selectedCurrency.symbol = response.data[0].symbol;
        }
      }
      getCurrencySymbol();
    }
  }, [selectedCurrency])

  const goBack = () => {
    navigate(-1);
  };

  const handleConfirmOpen = () => {
    if (
      Object.keys(selectedCustomer).length > 0 ||
      Object.keys(selectedCurrency).length > 0 ||
      Object.keys(mainAddress).length > 0 ||
      Object.keys(deliveryAddress).length > 0 ||
      Object.keys(selectedContact).length > 0 ||
      Object.keys(selectedCompany).length > 0 ||
      orderLinesList.length > 0
    ) {
      setConfirmOpen(true);
    }
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleConfirmProceed = () => {
    setSelectedCustomer({});
    setSelectedCurrency({});
    setMainAddress({});
    setDeliveryAddress({});
    setSelectedContact({});
    setSelectedCompany({});
    setOrderLinesList([]);
    setIsSelected(false);
    setIsAdditionalSelected(false);
    setConfirmOpen(false);
  };

  const TABS = [
    {
      label: 'Content', content: <OrderLine
        onClick={handle}
        orderLines={orderLinesList}
        deleteOrder={handleDeleteOrder}
      />
    },
    { label: 'Tax', content: "Tax" },
    { label: "Delivery", content: "Delivery" },
    { label: "Invoicing", content: "Invoicing" },
    { label: "Production", content: "Production" },
    { label: "Business Project", content: "Business project" },
    { label: "TimeTable", content: "TimeTable" }
  ]

  return (
    <>
      <ToolBar
        searchToggle="hidden"
        add={handleConfirmOpen}
        toggle={true}
        saveToggle={true}
        backToggle={true}
        backAction={goBack}
        saveSelected={handleFinalize}
        cardBtn={() => navigate(`/home/saleorders`)}
        gridBtn={() => navigate(`/home/list`)}
      />
      <Dialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        PaperProps={{
          style: {
            minWidth: '300px',
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <DialogContent>
          <DialogContentText>
            Current changes will be lost. Do you really want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmProceed} color="primary">
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
      <Container>
        <Grid item xs={12} sm={6}>
          {isSelected || isAdditionalSelected ? (
            <>
              {" "}
              <div className="container-main-card">
                <div className="main-card">
                  <div className="form">
                    <Button
                      variant="contained"
                      onClick={handleFinalize}
                    >
                      Finalize
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )
          }
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="container-main-card">
            <div className="main-card">
              <div>
                <div className="stepper">
                  <Stepper activeStep={1} alternativeLabel>
                    {STEPS.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </div>
                <div className="form">

                  <SearchSelect
                    label="Company"
                    value={selectedCompany?.name || ""}
                    onOpen={() => setIsCompanySelectOpen(true)}
                    onClose={() => setIsCompanySelectOpen(false)}
                    options={company}
                    onMenuSelected={setSelectedCompany}
                  />

                  <AdditionalSearchSelect
                    label="Currency"
                    onOpen={() => setIsCurrencySelectOpen(true)}
                    onClose={() => setIsCurrencySelectOpen(false)}
                    disabled={orderLinesList.length !== 0}
                    value={selectedCurrency?.name || ""}
                    options={currency}
                    addititonalOptions={additionalCurrency}
                    onAddClick={() => {
                      getCurrencyData(
                        CURRENCY_MODEL,
                        currency_body,
                        setAdditionalCurrency
                      );
                    }}

                    onMenuSelected={setSelectedCurrency}
                  />

                  <AdditionalSearchSelect
                    label="Customer"
                    onOpen={() => setIsCustomerSelectOpen(true)}
                    onClose={() => setIsCustomerSelectOpen(false)}
                    value={
                      selectedCustomer?.fullName ||
                      `${selectedCustomer.partnerSeq}-${selectedCustomer?.simpleFullName}` ||
                      ""
                    }
                    selected={setIsSelected}
                    additionalSelected={setIsAdditionalSelected}
                    onFirstOptionsClick={setCustomerDetails}
                    onNewOptionsClick={setAdditionalCustomerDetails}
                    options={customer}
                    addititonalOptions={additionalCustomer}
                    onAddClick={() =>
                      getCustomerPartnerData(
                        PARTNER_MODEL,
                        PARTNER_REQUEST_BOBY2,
                        setAdditionalCustomer
                      )
                    }
                    onMenuSelected={setSelectedCustomer}
                  />

                  <AdditionalSearchSelect
                    label="Customer contact"
                    onOpen={() => setIsContactSelectOpen(true)}
                    onClose={() => setIsContactSelectOpen(false)}
                    value={
                      selectedContact?.fullName ||
                      `${selectedContact.partnerSeq}-${selectedContact?.FullName}` ||
                      ""
                    }
                    options={contact}
                    addititonalOptions={additionalContact}
                    onAddClick={() =>
                      getContactData(
                        PARTNER_MODEL,
                        CONTACT_REQ_BODY2,
                        setAdditionalContact
                      )
                    }
                    onMenuSelected={setSelectedContact}
                  />
                  <Address
                    label="Main/Invoicing address"
                    onChange={(event) => handleChange(event, "main-address")}
                    value={mainAddress?.fullName || ""}
                  />
                  <Address
                    label="Delivery address"
                    onChange={(event) => handleChange(event, "delivery-address")}
                    value={deliveryAddress?.fullName || ""}
                  />
                </div>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12}>
          {
            isSelected || isAdditionalSelected ? (
              <>
                <div className="container-main-card">
                  <div className="main-card">
                    <BasicTabs tabs={TABS} />
                  </div>
                </div>
                {isVisible ? (
                  <>
                    <Product
                      onClick={() => setIsVisible(false)}
                      clientPartner={selectedCustomer}
                      handleAddOrders={handleAddOrders}
                      currency={selectedCurrency}
                      visible={isVisible}
                    />
                  </>
                ) : (
                  <></>
                )}
                <div>
                  <ProductTotal
                    data={{
                      currency: selectedCurrency, exTaxTotal: productTotalDetails.exTaxTotal
                      , inTaxTotal: productTotalDetails.inTaxTotal, taxTotal: productTotalDetails.taxTotal
                    }}
                  />
                </div>
              </>
            ) : (
              <></>
            )
          }
        </Grid>

      </Container>
    </>
  );
}

export default AddProduct;
