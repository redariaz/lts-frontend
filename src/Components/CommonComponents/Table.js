
import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({
  rows = [],
  columns = [],
  loading = false,
  pageSizeOptions = [5, 10, 25],
  height = 450,
  getRowId
}) => {
  return (
    <Box sx={{ width: "100%", height }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        getRowId={getRowId}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 5
            }
          }
        }}
        pageSizeOptions={pageSizeOptions}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default Table;
