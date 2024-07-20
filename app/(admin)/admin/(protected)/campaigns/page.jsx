"use client";
import { Table } from "@/components/ui/table";
import { useGetAllCampaignQuery } from "@/redux/services/campaignApi";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import Link from "next/link";
import React from "react";

const CampaignList = () => {
  const { data, isLoading } = useGetAllCampaignQuery();
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 40,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
    },
    {
      field: "campaign_name",
      headerName: "Campaign Name",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link
            href={`/admin/campaigns/${params.id}`}
            prefetch={false}
            className="text-primary text-blue-500"
          >
            {params.value}
          </Link>
        );
      },
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
      sortable: false,
    },
    {
      field: "minimum_amount",
      headerName: "Min Amount",
      // type: "number",
      width: 110,
      sortable: false,
    },
    {
      field: "event",
      headerName: "Event",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "created_at",
      headerName: "Created At",
      // type: "number",
      width: 150,
      sortable: false,
      valueGetter: (value) => moment(value).calendar(),
    },
  ];

  return (
    <section className="w-full">
      <div
        width={"100%"}
        className="flex justify-between flex-row items-center pb-3 w-full"
      >
        <h2 className="text-2xl font-bold ">Campaign List</h2>
        <Link href={"/admin/campaigns/create"} prefetch={false}>
          <Button variant="contained">Create</Button>
        </Link>
      </div>
      <DataGrid
        loading={isLoading}
        rows={data?.campaigns || []}
        getRowId={(row) => row.id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </section>
  );
};

export default CampaignList;
