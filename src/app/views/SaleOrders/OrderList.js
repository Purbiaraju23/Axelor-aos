import ToolBar from 'app/components/ToolBar'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchSalesData } from 'app/services/rest';
import { SALE_MODEL, SALE_ORDERLINE_REQ_BODY, SEARCH_REQ_BODY } from 'app/Utils/Constant';
import GridView from 'app/components/GridView';
import { Edit, Print, Mail } from '@mui/icons-material';

function OrderList() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [searchContent, setSearchContent] = useState("");
    const [deleteToggle, setDeleteToggle] = useState(false)
    const navigate = useNavigate();

    const fetchOrders = async (model, reqBody) => {
        try {
            const response = await fetchSalesData(model, reqBody);
            setOrderList(response.total === 0 ? [] : response.data);
        } catch (error) {
            alert("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (searchContent !== "") {
            const fields = [
                "endOfValidityDate",
                "saleOrderSeq",
                "company",
                "stockLocation",
                "clientPartner",
                "externalReference",
                "confirmationDateTime",
                "exTaxTotal",
                "inTaxTotal",
                "amountInvoiced",
                "currency",
                "currency.numberOfDecimals",
                "deliveryState",
                "statusSelect",
                "salespersonUser"
            ];

            let Criteria = [
                {
                    "fieldName": "saleOrderSeq",
                    "operator": "like",
                    value: `${searchContent}`,
                },
                {
                    "fieldName": "company.name",
                    "operator": "like",
                    value: `${searchContent}`,
                },
                {
                    "fieldName": "stockLocation.name",
                    "operator": "like",
                    value: `${searchContent}`,
                },
                {
                    "fieldName": "clientPartner.fullName",
                    "operator": "like",
                    value: `${searchContent}`,
                },
                {
                    "fieldName": "externalReference",
                    "operator": "like",
                    value: `${searchContent}`,
                },
                {
                    "fieldName": "currency.name",
                    "operator": "like",
                    value: `${searchContent}`,
                },
                {
                    "fieldName": "salespersonUser.fullName",
                    "operator": "like",
                    value: `${searchContent}`,
                },
                {
                    "fieldName": "deliveryState",
                    "operator": "=",
                    value: `${searchContent}`,
                },
                {
                    "fieldName": "statusSelect",
                    "operator": "=",
                    value: `${searchContent}`,
                },
                {
                    fieldName: "exTaxTotal",
                    operator: "=",
                    value: `${searchContent}`,
                },
                {
                    fieldName: "inTaxTotal",
                    operator: "=",
                    value: `${searchContent}`,
                }
            ];

            if (searchContent.trim() === "") {
                Criteria = [];
            }
            if (isNaN(searchContent.trim())) {
                Criteria.pop();
                Criteria.pop();
                Criteria.pop();
                Criteria.pop();
            }

            let reqBody = { ...SEARCH_REQ_BODY };
            reqBody.data.operator = "or";
            reqBody.data.criteria = Criteria;
            reqBody = {
                ...reqBody,
                fields: fields,
            };
            reqBody.data._searchText = `${searchContent}`;
            fetchOrders(SALE_MODEL, reqBody);
        }
        else {
            getOrderListData();
        }
    }, [searchContent]);

    const getOrderListData = async () => {
        const reqBody = { ...SALE_ORDERLINE_REQ_BODY }
        const response = await fetchSalesData(SALE_MODEL, reqBody);
        if (response) {
            setOrderList(response.data);
        }
    }

    const handleCheckboxChange = (order) => {
        if (order.length > 0) {
            setSelectedItems(order)
            setDeleteToggle(true);
        }
        else {
            setSelectedItems(order);
            setDeleteToggle(false);
        }
    };

    const columns = [
        {
            field: 'edit', headerName: '', width: 50, renderCell: (params) => <Edit onClick={() => navigate(`/home/edit/${params.row.id}`)} />
        },
        { field: 'internalNumber', headerName: 'Internal Number', width: 100 },
        { field: 'company', headerName: 'Company', width: 100 },
        { field: 'stockLocation', headerName: 'Stock Location', width: 150 },
        { field: 'customer', headerName: 'Customer', width: 150 },
        { field: 'customerReference', headerName: 'Customer reference', width: 100 },
        { field: 'confirmationDate', headerName: 'Confirmation date', width: 150 },
        { field: 'totalWT', headerName: 'Total W.T.', width: 100 },
        { field: 'totalATI', headerName: 'Total A.T.I', width: 100 },
        { field: 'currency', headerName: 'Currency', width: 100 },
        { field: 'deliveryState', headerName: 'Delivery State', width: 150, valueGetter: (params) => params.row.deliveryState === 1 ? "Not Delivered" : "Delivered" },
        { field: 'status', headerName: 'Status', width: 150, valueGetter: (params) => params.row.statusSelect === 3 ? "Order Confirmed" : "Not Confirmed" },
        { field: 'salesperson', headerName: 'Salesperson', width: 150 },
        { field: 'print', headerName: '', width: 50, renderCell: () => <Print /> },
        { field: 'mail', headerName: '', width: 50, renderCell: () => <Mail /> },
    ];

    const rows = orderList.map((order) => ({
        id: order.id,
        internalNumber: order.saleOrderSeq,
        company: order.company.name,
        stockLocation: order.stockLocation?.name,
        customer: order.clientPartner.fullName,
        customerReference: order.externalReference,
        confirmationDate: order.confirmationDateTime,
        totalWT: order.exTaxTotal,
        totalATI: order.inTaxTotal,
        currency: order.currency.name,
        deliveryState: order.deliveryState,
        status: order.statusSelect,
        salesperson: order.salespersonUser.fullName,
    }));

    return (
        <>
            <ToolBar
                add={() => navigate('/home/edit')}
                search={setSearchContent}
                searchToggle="visible"
                refreshToggle={true}
                refresh={() => fetchOrders(SALE_MODEL, SALE_ORDERLINE_REQ_BODY)}
                deleteToggle={deleteToggle}
                cardBtn={() => navigate("/home/saleorders")}
                gridBtn={() => navigate("/home/list")}
                deleteAction={() => alert("It is not possible to delete a confirmed order.")}
            />
            <GridView
                dataList={orderList}
                handleCheckboxChange={handleCheckboxChange}
                rows={rows}
                columns={columns}
            />
        </>
    )
}

export default OrderList