import React, { useEffect, useState } from "react";
import { FETCH_PAYLOAD, FINALIZE_ACTION_BODY, SALEORDERLINE_MODEL, ORDERLINE_REQ_BODY, CONTACT_ACTION_BODY, CONTACT_REQ_BODY1, PARTNER_MODEL, SAVE_CHANGES_BODY, SAVE_CHANGES_MODEL_BODY, STEPS } from "app/Utils/Constant";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchContactData, fetchCustomerData, fetchModelData, fetchOrderLine, fetchProductActionData, fetchSelectedCustomerData } from "app/services/rest";
import { SALE_MODEL } from "app/Utils/Constant";
import { Alert, Button, Container, Snackbar, Step, StepLabel, Stepper } from "@mui/material";
import ToolBar from "app/components/ToolBar";
import OrderLine from "app/components/OrderLine";
import ProductTotal from "app/components/ProductTotal";
import AdditionalSearchSelect from "app/components/AdditionalSearchSelect";
import Address from "app/components/Address";
import SearchSelect from "app/components/SearchSelect";
import BasicTabs from "app/components/BasicTabs";

function EditForm() {
  const [fetchData, setFetchData] = React.useState([]);
  const [saleOrder, setSaleOrder] = useState(null);
  const [productList, setProductList] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(true);
  const [fieldDisable, setFieldDisable] = useState(true);
  const [contact, setContact] = useState([]);
  const [isContactSelectOpen, setIsContactSelectOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState("");
  const [saveToggleState, setSaveToggleState] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [message, setMessage] = useState("")
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(0);
  let domain = "";

  const fetchdata = async () => {
    try {
      const response = await fetchCustomerData(
        SALE_MODEL,
        id,
        FETCH_PAYLOAD
      );
      setFetchData(response.data);
      setFormStep(response.data[0].statusSelect);
      setSaleOrder(response.data[0].saleOrderLineList);
    } catch (error) {
      alert("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    if (saleOrder) {
      let orderIds = saleOrder.map((item) => item.id);
      const reqBody = { ...ORDERLINE_REQ_BODY };
      reqBody.data._domainContext = {
        ...reqBody.data._domainContext,
        _field_ids: orderIds,
      }
      reqBody.data._domainContext._parent = {
        ...reqBody.data._domainContext._parent,
        id: id
      }
      const getOrderLines = async () => {
        const response = await fetchOrderLine(SALEORDERLINE_MODEL, reqBody)
        if (response) {
          setProductList(response.data);
        }
      }
      getOrderLines();
    }
  }, [saleOrder, id])

  useEffect(() => {
    if (state && state.data && saleOrder) {
      setOrderConfirmed(false);
      setFormStep(state.data.formStep);
      let reqBody = { ...FINALIZE_ACTION_BODY };
      reqBody = {
        ...reqBody,
        action: state.data.action,
        model: state.data.model
      };
      reqBody.data.context = {
        ...reqBody.data.context,
        clientPartner: state.data.clientPartner,
        contactPartner: state.data.contactPartner,
        currency: state.data.currency,
        deliveryAddress: state.data.deliveryAddress,
        mainInvoicingAddress: state.data.mainInvoicingAddress,
        saleOrderSeq: `#${state.data.id}`,
      };
      reqBody.data.context.saleOrderLineList = saleOrder;
      const getData = async () => {
        const response = await fetchProductActionData(reqBody);

        if (response) {
          const ACTION = response.data[0].pending;
          reqBody = { ...reqBody, action: ACTION };
          reqBody.data.context = {
            ...reqBody.data.context,
            id: `${state.data.id}`
          }
          const actionResponse = await fetchProductActionData(reqBody);
          if (actionResponse) {
            const salesData = await fetchCustomerData(SALE_MODEL, id, FETCH_PAYLOAD)
            if (salesData) {
              setFetchData(salesData.data);
            }
          }

        }
      }
      getData();
    }
  }, [state, saleOrder, id])

  const confirmOrder = async () => {
    if (!state) return;

    const reqBody = {
      ...FINALIZE_ACTION_BODY,
      action: "action-group-budget-sale-order-confirm-onclick",
      model: state.data.model,
    };
    reqBody.data.context = {
      ...reqBody.data.context,
      clientPartner: state.data.clientPartner,
      contactPartner: state.data.contactPartner,
      currency: state.data.currency,
      deliveryAddress: state.data.deliveryAddress,
      mainInvoicingAddress: state.data.mainInvoicingAddress,
      saleOrderSeq: fetchData[0].saleOrderSeq,
      saleOrderLineList: saleOrder
    }

    try {
      const response = await fetchProductActionData(reqBody);
      if (!response || !response.data[0].pending) return;

      const actionResponse = response.data[0].pending;
      reqBody.data.context._signal = "confirmOrderBtn";
      reqBody.data.context._source = "confirmOrderBtn";
      reqBody.action = actionResponse;

      const secondAction = await fetchProductActionData(reqBody);
      if (!secondAction || !secondAction.data[0].pending) return;

      const secondResponse = secondAction.data[0].pending;
      reqBody.action = secondResponse;

      const finalAction = await fetchProductActionData(reqBody);
      if (finalAction.data[0].pending === "action-sale-group-confirmed[4]") {
        setFormStep((prevState) => prevState + 1);
        setMessage("Order placed successfully!");
        setOrderConfirmed(true);
        setSuccessMessageOpen(true);
      }
    } catch (error) {
      console.error("Error confirming order:", error);
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

  const getSelectedContactData = async (reqBody) => {
    const response = await fetchSelectedCustomerData(reqBody);
    domain = (response?.data[0]?.attrs?.contactPartner?.domain);
  };

  useEffect(() => {
    if (isContactSelectOpen) {
      if (fetchData) {
        const reqBody = { ...CONTACT_ACTION_BODY };
        reqBody.data.context.clientPartner =
          fetchData[0].clientPartner;
        getSelectedContactData(reqBody)
          .then(() => {
            const contactBody = { ...CONTACT_REQ_BODY1 };
            contactBody.data._domainContext.currency = fetchData[0].currency;
            contactBody.data._domainContext.company = fetchData[0].company;
            contactBody.data._domainContext.clientPartner = fetchData[0].clientPartner;
            contactBody.data._domainContext.mainInvoicingAddress = fetchData[0].mainInvoicingAddress;
            contactBody.data._domainContext.deliveryAddress = fetchData[0].deliveryAddress;
            contactBody.data._domain = domain;
            getContactData(PARTNER_MODEL, contactBody, setContact);
          })
          .catch((error) => {
            console.error(`Error Fetch data: ${error}`);
          });
      }
    }

  }, [isContactSelectOpen]);


  const editSelected = () => {
    setSaveToggleState(true);
    setFieldDisable(false);
  };

  const saveEditData = async () => {
    try {
      const saveChangesReqBody = {
        ...SAVE_CHANGES_BODY,
        data: {
          context: {
            ...SAVE_CHANGES_BODY.data.context,
            id: fetchData[0].id,
            contactPartner: selectedContact
          }
        }
      };

      const saveChangesResponse = await fetchProductActionData(saveChangesReqBody);
      if (!saveChangesResponse) return;

      const saveChangesModelReqBody = {
        ...SAVE_CHANGES_MODEL_BODY,
        data: {
          ...SAVE_CHANGES_MODEL_BODY.data,
          id: fetchData[0].id,
          contactPartner: selectedContact,
          version: fetchData[0].version
        }
      };

      const modelDataResponse = await fetchModelData(SALE_MODEL, saveChangesModelReqBody);
      if (!modelDataResponse) return;

      setMessage("Sale Order Successfully Edited");
      setSuccessMessageOpen(true);
      setSaveToggleState(false);
      setFieldDisable(true);
      navigate(`/home/edit/${fetchData[0].id}`);
    } catch (error) {
      console.error("Error saving edit data:", error);
      alert("Changes cannot be saved.");
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessageOpen(false);
  };

  const TABS = [
    { label: 'Content', content: <OrderLine orderLines={productList} /> },
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
        backToggle={true}
        backAction={goBack}
        searchToggle={"hidden"}
        add={() => navigate(`/home/edit`)}
        saveToggle={saveToggleState}
        toggle={true}
        editSelected={editSelected}
        saveSelected={saveEditData}
        cardBtn={() => navigate(`/home/saleorders`)}
        gridBtn={() => navigate(`/home/list`)}
      />
      <Snackbar
        open={successMessageOpen}
        autoHideDuration={5000}
        onClose={handleCloseSuccessMessage}
      >
        <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width: "100%" }} >{message}</Alert>
      </Snackbar>
      <Container>
        <div className="container-main-card">
          <div className="main-card">
            <div className="form">
              {
                orderConfirmed ? (saveToggleState ? <Button variant="contained" onClick={saveEditData}>Save Changes</Button> : <Button variant="contained" onClick={editSelected}>Edit Order</Button>) : (
                  <>
                    <Button variant="contained" onClick={() => {
                      confirmOrder();
                    }}>Confirm Order</Button>
                  </>)
              }
            </div>
          </div>
        </div>

        {fetchData && fetchData.map((data, index) => (
          <div className="container-main-card">
            <div className="main-card">
              <div className='stepper'>
                <Stepper activeStep={formStep} alternativeLabel>
                  {STEPS.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
              <div className="form" key={index}>
                {!orderConfirmed ? <h1>Quotation {data.saleOrderSeq}</h1> : <h1>Sale order {data.saleOrderSeq}</h1>}
                <SearchSelect
                  label="Company"
                  value={data.company.name}
                  options={[data.company]}
                  disabled={true}
                />
                <AdditionalSearchSelect
                  label="Currency"
                  value={data.currency.name}
                  options={[data.currency]}
                  disabled={true}
                />
                <AdditionalSearchSelect label="Customer"
                  value={data.clientPartner !== null && data.clientPartner.fullName}
                  options={[data.clientPartner]} disabled={true} />

                <AdditionalSearchSelect
                  label="Customer contact"
                  value={selectedContact ? selectedContact?.fullName : data.contactPartner !== null ? data.contactPartner.fullName : ""}
                  options={contact.length !== 0 ? contact : [data.contactPartner]}
                  disabled={fieldDisable}
                  onOpen={() => setIsContactSelectOpen(true)}
                  onClose={() => setIsContactSelectOpen(false)}
                  onMenuSelected={setSelectedContact}
                />
                <Address
                  label="Main/Invoicing address"
                  value={data.mainInvoicingAddress.fullName}
                />
                <Address
                  label="Delivery address"
                  value={data.deliveryAddress.fullName}
                />
              </div>
            </div>
          </div>
        ))
        }
        {productList ?
          (<div className="container-main-card">
            <div className="main-card">
              <BasicTabs tabs={TABS} />
            </div>
          </div>) : null}
        {fetchData && fetchData.map((item, index) => (<div key={index}><ProductTotal data={item} /></div>))}
      </Container >
    </>
  );
}


export default EditForm;
