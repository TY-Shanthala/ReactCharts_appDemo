import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  IconButton,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SortIcon from "@mui/icons-material/Sort";

// Sorting helpers
function descendingComparator(a, b, orderBy) {
  if (orderBy === "col1") {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
  } else {
    if (b[orderBy].toString().toLowerCase() < a[orderBy].toString().toLowerCase()) return -1;
    if (b[orderBy].toString().toLowerCase() > a[orderBy].toString().toLowerCase()) return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  filterOption,
  filterselectInitialData,
  setRows,
  tablerow,
  headCells,
  checkBoxSelected,
  showCheckbox,
  showActions, // ✅ now used
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const [selected, setSelected] = useState(filterselectInitialData);

  useEffect(() => {
    let selectedkeys = Object.keys(selected);
    let filteredarray = [...tablerow];
    selectedkeys.forEach((val) => {
      if (selected[val].length) {
        let filtered = filteredarray.filter((e) =>
          selected[val].includes(e[val]?.key ? e[val].key : e[val])
        );
        filteredarray = [...filtered];
      }
    });
    setRows(filteredarray);
    checkBoxSelected([]);
  }, [selected]);

  return (
    <TableHead sx={{ backgroundColor: "#F0F3F9" }}>
      <TableRow>
        <TableCell sx={{ borderBottom: 0 }} padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
            sx={{ visibility: showCheckbox ? "visible" : "hidden" }}
          />
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ borderBottom: 0, fontWeight: 600, color: "#3c3838" }}
          >
            {headCell.sort ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                IconComponent={headCell.sortBy === "date" ? SortIcon : SortByAlphaIcon}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}

        {showActions && ( // ✅ optional Actions column
          <TableCell sx={{ borderBottom: 0, fontWeight: "bold" }}>Actions</TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

export default function TableComponent({
  tablerow = [],
  headCells = [],
  filterselectInitialData = [],
  editIconClick = () => {},
  deleteIconClick = () => {},
  showCheckbox = true,
  showEditAndDelete = true,
  showActions = true, // ✅ default true
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("col1");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState(tablerow);

  useEffect(() => {
    setRows(tablerow);
    setSelected([]);
  }, [tablerow]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.col1);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) newSelected = [...selected, name];
    else newSelected = selected.filter((item) => item !== name);
    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Box sx={{ width: "100%", margin: "10px auto" }}>
      <TableContainer>
        <Table sx={{ minWidth: 1000 }}>
          <EnhancedTableHead
            rows={rows}
            setRows={setRows}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            filterOption={{}}
            filterselectInitialData={filterselectInitialData}
            headCells={headCells}
            tablerow={tablerow}
            checkBoxSelected={setSelected}
            showCheckbox={showCheckbox}
            showActions={showActions} // ✅ pass down
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isItemSelected = isSelected(row.col1);
                return (
                  <TableRow hover key={row.col1}>
                    <TableCell padding="checkbox" sx={{ borderBottom: 0 }}>
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event, row.col1)}
                        sx={{ visibility: showCheckbox ? "visible" : "hidden" }}
                      />
                    </TableCell>

                    {Object.entries(row).map(([key, value], i) => (
                      <TableCell key={i} sx={{ borderBottom: 0 }}>
                        {value}
                      </TableCell>
                    ))}

                    {showActions && ( // ✅ only render if true
                      <TableCell sx={{ borderBottom: 0 }}>
                        {showEditAndDelete && (
                          <>
                            <IconButton onClick={() => editIconClick(row.col1)}>
                              <Tooltip title="Edit">
                                <EditOutlinedIcon color="primary" />
                              </Tooltip>
                            </IconButton>
                            <IconButton onClick={() => deleteIconClick(row.col1)}>
                              <Tooltip title="Delete">
                                <DeleteOutlineOutlinedIcon
                                  sx={{ color: "#1976d2", "&:hover": { color: "red" } }}
                                />
                              </Tooltip>
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {rows.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        )}
      </TableContainer>
    </Box>
  );
}
