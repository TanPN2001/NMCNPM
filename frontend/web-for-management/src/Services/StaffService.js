import axios from "axios"
const url = "https://nmcnpm.herokuapp.com/api/";

export const getAllStation = async () => {
    const token = localStorage.getItem("token");
    const result = await axios.get(url + "v2/station", {
        headers: { "Authorization": `Bearer ${token}` }
    })
    return result.data;
}

export const getStationByID = async (id) => {
    const token = localStorage.getItem("token");
    const result = await axios.get(url + `v2/station/detail/statistic/${id}`, {
        headers: { "Authorization": `Bearer ${token}` }
    })

    return result.data;
}
export const getCategoryByIDServiceStaff= async (id)=>{
    const token = localStorage.getItem("token");
    const result = await axios.get(url+`v3/staff/category/detail/${id}`, {
      headers: { "Authorization": `Bearer ${token}` },
    })
    return result.data;
  }
export const getStationByName = async (name) => {
    const token = localStorage.getItem("token");
    const result = await axios.get(url + `v2/search/station?s=${name}`, {
        headers: { "Authorization": `Bearer ${token}` }
    })

    return result.data;
}

export const getLocations = async () => {
    const token = localStorage.getItem("token");
    const result = await axios.get(url + "v2/location", {
        headers: { "Authorization": `Bearer ${token}` }
    })
    return result.data;
}

export const getLocationForAdding= async (id)=>{
    const token = localStorage.getItem("token");
    const result = await axios.get(url + "v2/locations", {
        headers: { "Authorization": `Bearer ${token}` }
    })
    return result.data;
}

export const getStaffForAdding = async () => {
    const token = localStorage.getItem("token");
    const result = await axios.get(url+"v2/staff", {
        headers: { "Authorization": `Bearer ${token}` }
    })
    return result.data;

}

export const editingStation = async (data, stationID) => {
    const token = localStorage.getItem("token");
    const result = await axios.put(url + "v2/station/edit/" + stationID, data,
        {
            headers: { "Authorization": `Bearer ${token}` }
        }
    )
    return result.data;
}
export const addNewLocation = async (data) => {
    const token = localStorage.getItem("token");
    console.log(data)
    const result = await axios.post(url + "v2/location/add", data,
        {
            headers: { "Authorization": `Bearer ${token}` }
        }
    )
    return result.data;
}

export const addNewStation = async (data) => {
    const token = localStorage.getItem("token");
    const result = await axios.post(url + "v2/station/add", {
        name: data.name,
        location: data.place,
        staff: data.employee,
        phoneNumber: data.phoneNumber
    },
        {
            headers: { "Authorization": `Bearer ${token}` }
        }
    )
    return result.data;
}

export const getStaffs = async () => {
    const token = localStorage.getItem("token");
    const url1 = "https://nmcnpm.herokuapp.com/api/v1/accounts?type=staff"
    const result = await axios.get(url1, {
        headers: { "Authorization": `Bearer ${token}` }
    })
    return result.data;

}


export const deleteStationService=async (id)=>{
    const token = localStorage.getItem("token");
    const result = await axios.delete(url+`v2/station/delete/${id}`,
  {
    headers: { "Authorization": `Bearer ${token}` },
  })
  return result.data;
}

export const updateStartTime = async (data) => {
    const token = localStorage.getItem("token");
    const result = await axios.post(url + "v3/staff/verify/hiring/bill", {
        billID: data.billID,
        date: data.time
    },
        {
            headers: { "Authorization": `Bearer ${token}` }
        }
    )
    return result.data;
}


export const updateReturnTime = async (data) => {
    const token = localStorage.getItem("token");
    const result = await axios.post(url + "v3/staff/verify/return/bill", {
        billID: data.billID,
        date: data.time,
        status: data.status
    },
        {
            headers: { "Authorization": `Bearer ${token}` }
        }
    )
    return result.data;
}

export const getRentReturnBike = async () => {
    const token = localStorage.getItem("token");
    const result = await axios.get(url+"v3/staff/dashboard", {
        headers: { "Authorization": `Bearer ${token}` }
    })
    return result.data;

}
