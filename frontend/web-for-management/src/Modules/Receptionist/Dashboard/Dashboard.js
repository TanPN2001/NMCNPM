import { useState } from "react";
import BillingHistory from "./BillingHistory/BillingHistory";
import ChangePassword from "./ChangePassword/ChangePassword";
import PendingAccount from "./PendingAccount/PendingAccount";
import UserInfo from "./UserInfo/UserInfor";


export default function DashboardOfReceptionist({ setToken }) {
    const [setChange, setIsChange] = useState(false)
    return (
        <div>
            <UserInfo
                tag="Receptionist in Ecopark BikeRenting"
                setToken={setToken}
                setIsChange={setIsChange}
            >
            </UserInfo>
            <div style={{ top: '32%', position: 'absolute', width: '80%' }}>
                <BillingHistory ></BillingHistory>
            </div>
            {
                (setChange) && <ChangePassword callBack={() => { setIsChange(false) }} />
            }

        </div>
    )
}

