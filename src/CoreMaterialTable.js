import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useTheme } from '@material-ui/styles';

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
  
/**
 * Trying to create a minimalistic compatible placeholder for https://github.com/mbrn/material-table 
 * The aim is to replace <MaterialTable> tag with <CoreMaterialTable> without other changes to the sourcecode
 * @material-ui library is used to replicate most features
 * Note: Advanced features are not to be supported to keep it leightweight.. no jspdf or similar dependencies, just a basic Table!
 * @param {*} props 
 */
function CoreMaterialTable(props) {
  const theme = useTheme();

  const [columns, setcolumns] = useState([]);
  const [data, setdata] = useState([]);

  useEffect(() => {
    console.log("CoreMaterialTable => useEffect");
    setdata(props.data);
    setcolumns(props.columns);
  }, [props.data]);

  function getBooleanJSXStyle(val){
    if(val === true){
      return <span style={{background: theme.palette.primary.main, color: theme.palette.primary.contrastText, paddingLeft: 8, paddingRight: 8, borderRadius: 6}}>true</span>;
    } else {
      return <span style={{background: theme.palette.secondary.main, color: theme.palette.secondary.contrastText, paddingLeft: 8, paddingRight: 8, borderRadius: 6}}>false</span>;
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns.map((column) => ( column.hidden !== true &&
              <TableCell key={uuidv4()}>{column.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((dataitem) => (
            <TableRow key={uuidv4()}>
              {columns.map((column) => (column.hidden !== true &&
                <TableCell key={uuidv4()}>
                    {column.render === undefined && dataitem[column.field]}
                    {column.render === undefined && column.type === "boolean" && getBooleanJSXStyle(dataitem[column.field])}
                    {column.render !== undefined && column.render(dataitem)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CoreMaterialTable;
