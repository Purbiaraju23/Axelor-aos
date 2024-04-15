import { Add as AddIcon, Edit, Delete } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import "../../Styles/AddProduct.css";

const OrderLine = ({ onClick, orderLines, deleteOrder }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (selectedRows) => {
    setSelectedItems(selectedRows);
  };

  const handleDeleteProduct = () => {
    deleteOrder(selectedItems);
    setSelectedItems([]);
  };

  const columns = [
    { field: "id", headerName: "", width: 10 },
    {
      field: "edit",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        selectedItems.includes(row.id) && <Edit onClick={onClick} />
      ),
    },
    { field: "productCode", headerName: "Code", width: 120 },
    { field: "productName", headerName: "Displayed Product name", width: 200 },
    { field: "qty", headerName: "Qty", width: 80 },
    { field: "unit", headerName: "Unit", width: 80 },
    { field: "priceDiscounted", headerName: "Unit price W.T.", width: 120 },
    { field: "exTaxTotal", headerName: "Total W.T.", width: 120 },
  ];

  const rows = orderLines.map((item) => ({
    id: item.productName,
    productCode: item["product.code"] || item.product.code,
    productName: item.productName,
    qty: item.qty,
    unit: item.unit.name,
    priceDiscounted: item.priceDiscounted,
    exTaxTotal: item.exTaxTotal,
  }));


  const onRowsSelectionHandler = (ids) => {
    const selectedRowData = orderLines.filter((order) => ids.includes(order.productName))
    handleCheckboxChange(selectedRowData);
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="container-main-card">
            <div className="main-card">
              <Grid container alignItems="center">
                <Grid item xs={6}>
                  <Typography variant="h6">Details Lines</Typography>
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                  <AddIcon onClick={onClick} />
                  {orderLines.length !== 0 && (
                    <Delete onClick={handleDeleteProduct} />
                  )}
                </Grid>
              </Grid>
              <div style={{ width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  checkboxSelection
                  disableSelectionOnClick
                  autoHeight
                  onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderLine;
