import React from "react";
import Table from "react-bootstrap/Table";
import { useTable, useSortBy } from "react-table";
import Form from "react-bootstrap/Form";
import {
  EditButton,
  ActivateInactivateButton,
  DeleteButton
} from "./GridButtons";

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

  const renderButtons = (header, cell, row) => {
    let buttons = [];

    if (header.includes("edit")) {
      buttons.push(
        <EditButton
          key={"edit" + row.values.id}
          onUpdate={props.onUpdate}
          id={row.values.id}
        />
      );
    }

    if (header.includes("delete")) {
      buttons.push(
        <DeleteButton
          key={"delete" + row.values.id}
          onDelete={props.onDelete}
          id={row.values.id}
        />
      );
    }

    if (header.includes("activateInactivate")) {
      buttons.push(
        <ActivateInactivateButton
          key={"activateInactivate" + row.values.id}
          id={row.values.id}
          inactivate={props.inactivate}
          activate={props.activate}
          isActive={row.values.isActive}
        />
      );
    }

    const td = (
      <td style={{ width: "auto" }} key={cell.column.Header}>
        {buttons}
      </td>
    );

    return td;
  };

  return (
    <Table
      striped
      bordered
      hover
      responsive
      size="sm"
      {...getTableProps()}
      style={{ fontSize: "small", textAlign: "center", marginBottom: "3px" }}
    >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header").includes("customButtons")
                  ? "-"
                  : column.render("Header")}
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
                ) : cell.column.Header.includes("customButtons") ? (
                  renderButtons(cell.column.Header, cell, row)
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
