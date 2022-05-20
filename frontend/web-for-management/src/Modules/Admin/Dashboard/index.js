import React, { useState } from "react";
import { Box, Container, Grid } from "@mui/material"
import BillingHistory from "../../Receptionist/Dashboard/BillingHistory/BillingHistory";
import PendingAccount from "../../Receptionist/Dashboard/PendingAccount/PendingAccount";
import ChangePassword from "./ChangePassword/ChangePassword";
import UserInfor from "./UserInfo/UserInfor";
import RenderBarChart from "./Chart/Chart";

export default function AdminDashboard({ setToken }) {
  const [isChange, setIsChange] = useState(false)
  return (
    <div className="adminDashboard">
      <UserInfor tag="Admin in Ecopark BikeRenting" setToken={setToken} setIsChange={setIsChange} ></UserInfor>
      {
        isChange && <ChangePassword callBack={() => { setIsChange(false) }} />
      }
      <Grid container sx ={{width: "100%"}}>
          <Box width="100%" height="100%">
            <RenderBarChart></RenderBarChart>
          </Box>
      </Grid>
    </div>
  )
}
