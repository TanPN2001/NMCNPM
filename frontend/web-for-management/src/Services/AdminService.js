import axios from "axios"
const url = "https://nmcnpm.herokuapp.com/api/v2/";

export const postCategory = async (data) => {
  const token = localStorage.getItem("token");
    const result = await axios.post(url + "category/add", data, {
        headers: { "Authorization": `Bearer ${token}` },
      })
    return result.data;
}

export const uploadImage= async(data)=>{
   const fileName = Date.now();
   const rs = await axios.post
   ('https://api.bandeck.com/v1/user/storage/upload?access_token=w4fCq2xrZsKYwpLCm2zCmMKUbMKWaW3CmmjDhmhuwpxuwp1waWrDhcKUwpfCmcKdwpQ=&name='+fileName,
   data,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
   })
   return rs.data;
}

export const getCategoryByIDService= async (id)=>{
  const token = localStorage.getItem("token");
  const result = await axios.get(url+`category/detail/${id}`, {
    headers: { "Authorization": `Bearer ${token}` },
  })
  return result.data;
}

export const deleteCategoryService = async (id)=>{
  const token = localStorage.getItem("token");
  const result = await axios.delete(url+`category/delete/${id}`,
  {
    headers: { "Authorization": `Bearer ${token}` },
  })
  return result.data;
}

export const updateCategoryService= async(id, data)=>{
  const token = localStorage.getItem("token");
  const result = await axios.put(url+`category/edit${id}`,data,
  {
    headers: { "Authorization": `Bearer ${token}` },
  })
  return result.data
}

export const getAllStation = async () => {
  const token = localStorage.getItem("token");
  const result = await axios.get(url + "station", {
      headers: { "Authorization": `Bearer ${token}` }
  })
  return result.data;
}


export const addBikeService=async(data)=>{
  const token = localStorage.getItem("token");
  const result = await axios.post(url + "bike/add", data,{
    headers: { "Authorization": `Bearer ${token}` }
})
return result.data;
}



export const getStationByID = async (id) => {
  const token = localStorage.getItem("token");
  const result = await axios.get(url + `station/detail/statistic/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
  })

  return result.data;
  
}
