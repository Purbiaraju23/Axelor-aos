import React, { useCallback, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { InputAdornment, IconButton, Tooltip } from "@mui/material";
import { InputBase } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TableViewIcon from "@mui/icons-material/TableView";
import AppsIcon from "@mui/icons-material/Apps";
import "../../Styles/Toolbar.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { Delete, Edit } from "@mui/icons-material";
import debounce from "debounce";

function ToolBar({
  refresh,
  add,
  searchToggle,
  backToggle,
  backAction,
  saveToggle,
  saveSelected,
  search,
  editSelected,
  toggle,
  refreshToggle,
  deleteToggle,
  cardBtn,
  gridBtn,
  deleteAction
}) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    optimizedSearch(value);
  };

  const debounceSearch = search ? debounce(search, 1000) : null
  const optimizedSearch = useCallback(debounceSearch, [])

  const handleClearSearch = () => {
    setSearchValue("");
    search("");
  };

  return (
    <div>
      <Box sx={{ flexGrow: "1" }} id="toolbar">
        <AppBar position="static" variant="outlined" id="appbar">
          <Toolbar variant="dense" id="toolbar_content">
            <div id="toolbar_left">
              <AddIcon
                onClick={add}
                id="add_btn"
              ></AddIcon>

              {toggle ? (
                saveToggle ? (
                  <SaveIcon id="save_btn" onClick={saveSelected} />
                ) : (
                  <Edit id="edit_btn" onClick={editSelected} />
                )
              ) : (
                <></>
              )}
              {deleteToggle && <Delete id="delete_btn" onClick={deleteAction} />}
              {backToggle && <ArrowBackIcon onClick={backAction} id="back_btn" />}
              {refreshToggle && < RefreshIcon onClick={() => {
                refresh();
                setSearchValue("");
              }} id="refresh_btn" />}
              <InputBase
                placeholder="Search..."
                sx={{
                  borderRadius: "4px",
                  border: "1px solid lightgray",
                  paddingLeft: "8px",
                  marginLeft: "2px",
                  marginBottom: "5px",
                  "& .MuiIconButton-root:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                style={{ visibility: `${searchToggle}` }}
                id="search"
                value={searchValue}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="cancel" onClick={handleClearSearch}>
                      <CloseIcon />
                    </IconButton>
                    <IconButton aria-label="search" onClick={optimizedSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                onChange={handleInputChange}
              />
            </div>
            <div id="viewType">
              <Tooltip title="Cards">
                <AppsIcon className="icon" onClick={cardBtn} />
              </Tooltip>
              <Tooltip title="Grid">
                <FormatListBulletedIcon className="icon" onClick={gridBtn} />
              </Tooltip>
              <Tooltip title="Calendar">
                <CalendarMonthIcon className="icon" />
              </Tooltip>
              <Tooltip title="Form">
                <TableViewIcon className="icon" onClick={add} />
              </Tooltip>
              <Tooltip title="Customize">
                <SettingsIcon className="icon" />
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default ToolBar;
