import React from "react";
import Table from "react-bootstrap/Table";
import { useTable, useSortBy } from "react-table";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

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
    <Table
      striped
      bordered
      hover
      responsive
      size="sm"
      {...getTableProps()}
      style={{ fontSize: "small", textAlign: "center" }}
    >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                  <td {...cell.getCellProps()}>
                    <Form.Check type="checkbox" disabled checked={cell.value} />
                  </td>
                ) : cell.column.Header === "-" ? (
                  <td style={{ width: "auto" }} key={cell.column.Header}>
                    <Button
                      variant="link"
                      onClick={() => console.log("Editar")}
                      style={{
                        fontSize: "small",
                        padding: "0",
                        marginRight: "5px"
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="link"
                      onClick={() =>
                        row.values.isActive
                          ? props.inactivate(row.values.id)
                          : props.activate(row.values.id)
                      }
                      style={{ fontSize: "small", padding: "0" }}
                    >
                      {row.values.isActive ? "Inactivar" : "Activar"}
                    </Button>
                  </td>
                ) : (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
