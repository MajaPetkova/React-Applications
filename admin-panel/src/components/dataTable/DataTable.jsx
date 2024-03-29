import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../dataTableSource";
import { Link } from "react-router-dom";
import { useState } from "react";

const DataTable = () => {
  const [data, setData]= useState(userRows);

  const handleDelete =(id)=>{
     setData(data.filter(item =>item.id !== id))
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{textDecoration: "none"}}>
            <div className="viewBtn"> View</div>
            </Link>
            <div className="deleteBtn" onClick={()=>handleDelete(params.row.id)}> Delete</div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="dataTable">
      <div className="dataTableTitle">
        Add new User
        <Link to="/users/new" style={{textDecoration: "none"}} className="link">Add new</Link>
      </div>
      <DataGrid className="dataGrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 9 },
          },
        }}
        pageSizeOptions={[9, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
