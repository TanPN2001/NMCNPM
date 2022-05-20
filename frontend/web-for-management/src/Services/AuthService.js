import axios from "axios";

const url = 'https://nmcnpm.herokuapp.com/api/v1/';

export const postData = async ({email, password, role}) => {
    const response = await axios.post(url + `${role}/login`,{
        email:email,
        password:password
    });
    return response.data;
}
