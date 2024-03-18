import React from 'react';
import DataTable from 'react-data-table-component';


const GenericTable = ({ columns, data, fixedHeader = true, fixedHeaderScrollHeight = '600px' }) => (
    <DataTable
        columns={columns}
        data={data}
        fixedHeader={fixedHeader}
        fixedHeaderScrollHeight={fixedHeaderScrollHeight}
        pagination
    />
);


export default GenericTable;