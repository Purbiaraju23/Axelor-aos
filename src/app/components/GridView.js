import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function GridView({ dataList, handleCheckboxChange, columns, rows }) {

    const onRowsSelectionHandler = (ids) => {
        const selectedRowsData = dataList.filter((order) => ids.includes(order.id));
        handleCheckboxChange(selectedRowsData);
    };

    return (
        <div style={{ width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
                autoHeight
                onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
            />
        </div>
    );
}

export default GridView;
