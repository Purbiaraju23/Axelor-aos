import React, { useState, useEffect } from "react";
import "../../../index.css";
import { Grid } from "@mui/material";
import { fetchSalesData } from "../../services/rest";
import { SALE_MODEL, SEARCH_REQ_BODY } from "app/Utils/Constant";
import { useNavigate } from "react-router-dom";
import { SALE_REQ_BODY } from "app/Utils/Constant";
import ToolBar from "app/components/ToolBar";
import { ThreeDots } from "react-loader-spinner";
import NotFound from "app/components/NotFound";
import SaleOrderCard from "app/components/SaleOrderCard";

function SaleOrders() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchContent, setSearchContent] = useState("");
  const navigate = useNavigate();

  const cardSelect = (id) => {
    navigate("/home/edit/" + id);
  };

  const fetchOrders = async (model, reqBody) => {
    try {
      setLoading(true);
      const response = await fetchSalesData(model, reqBody);
      setData(response.total > 0 ? response.data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchContent !== "") {
      let Criteria = [
        {
          fieldName: "saleOrderSeq",
          operator: "like",
          value: searchContent,
        },
        {
          fieldName: "externalReference",
          operator: "like",
          value: searchContent,
        },
        {
          fieldName: "clientPartner.fullName",
          operator: "like",
          value: searchContent,
        },
        {
          fieldName: "currency.symbol",
          operator: "like",
          value: searchContent,
        },
        {
          fieldName: "company.name",
          operator: "like",
          value: searchContent,
        },
        {
          fieldName: "tradingName.name",
          operator: "like",
          value: searchContent,
        },
        {
          fieldName: "stockLocation.name",
          operator: "like",
          value: searchContent,
        },
      ];

      if (!isNaN(searchContent)) {
        Criteria.push(
          {
            fieldName: "exTaxTotal",
            operator: "=",
            value: searchContent,
          },
          {
            fieldName: "inTaxTotal",
            operator: "=",
            value: searchContent,
          }
        );
      }
      const reqBody = {
        ...SEARCH_REQ_BODY,
        data: {
          criteria: Criteria,
          operator: 'or',
          _searchText: searchContent
        }
      };
      fetchOrders(SALE_MODEL, reqBody);
    } else {
      fetchOrders(SALE_MODEL, SALE_REQ_BODY);
    }
  }, [searchContent]);

  return (
    <>
      <ToolBar
        refresh={() => fetchOrders(SALE_MODEL, SALE_REQ_BODY)}
        add={() => navigate("/home/edit")}
        searchToggle="visible"
        toggle={false}
        refreshToggle={true}
        search={setSearchContent}
        cardBtn={() => navigate(`/home/saleorders`)}
        gridBtn={() => navigate(`/home/list`)}
      />
      {loading ? (
        <div className="loader">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <span>Please Wait....</span>
        </div>
      ) : (
        <>
          <Grid container spacing={2} padding={2}>
            {data.length === 0 ? (
              <>
                <NotFound />
              </>
            ) : (
              data.map((order) => (
                <SaleOrderCard
                  key={order.id}
                  order={order}
                  onSelect={cardSelect}
                />
              ))
            )}
          </Grid>
        </>
      )}
    </>
  );
}

export default SaleOrders;
