import React from "react";
import Table from "react-bootstrap/Table";
import { useTable, useSortBy } from "react-table";
import Form from "react-bootstrap/Form";

const GridBase = props => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns: props.columns,
      data: props.data,
      initialState: {
        pageIndex: 0,
        hiddenColumns: ["id"]
      }
    },
    useSortBy
  );

  //hack to only sort for certain columns
  headerGroups[0].headers.map(
    h =>
      (h.canSort =
        props.columns.find(c => c.Header === h.Header).canSort === false
          ? false
          : true)
  );

  return (
    <Table striped bordered hover responsive size="sm" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{ textAlign: "center" }}
              >
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return typeof cell.value === "boolean" ? (
                  <td {...cell.getCellProps()} style={{ textAlign: "center" }}>
                    <Form.Check type="checkbox" disabled checked={cell.value} />
                  </td>
                ) : (
                  <td {...cell.getCellProps()} style={{ textAlign: "center" }}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default GridBase;
