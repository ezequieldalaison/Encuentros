import React from 'react';
import Table from 'react-bootstrap/Table';
import { useTable } from 'react-table'
import Form from 'react-bootstrap/Form';

const GridBase = (props) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ 
        columns: props.columns, 
        data: props.data,
        initialState: { 
            pageIndex: 0,
            hiddenColumns: ['id']
        }
    });
    return (
    <Table striped bordered hover responsive size="sm" {...getTableProps()}>
        <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th {...column.getHeaderProps()} style={{textAlign: 'center'}} >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                    typeof(cell.value) === "boolean" ? (
                        <td {...cell.getCellProps()} style={{textAlign: 'center'}} >
                            <Form.Check type="checkbox" disabled checked={cell.value} />
                        </td>
                    ) : (
                        <td {...cell.getCellProps()} style={{textAlign: 'center'}} >
                            {cell.render('Cell')}
                        </td>
                    )
                )
               })}
             </tr>
           )
         })}
       </tbody>
    </Table>
    );
}

export default GridBase;