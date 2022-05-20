import './AddCategory.css'
import Button from '@mui/material/Button';
import { TextField, Input } from '@mui/material';
import React, { useState } from 'react';
import { addNewCategory } from '../../Store/ListCategoryStore';
import axios from 'axios';
import { PropagateLoader } from 'react-spinners';


function AddCategory({ setAdding, setNeedLoading, needLoading }) {
    const [isLoading, setIsLoading] = useState(false)
    const [category, setCategory] = useState({
        name: '',
        cost: '',
        image: '',
        description: ''
    })
    const [file, setFile] = useState({
        file: null
    })
    const handleClick = async () => {
        setIsLoading(true);
        let date = Date.now();
        const formData = new FormData();
        formData.append("file", file);
        axios.post("https://api.bandeck.com/v1/user/storage/upload?access_token=w4fCq2xrZsKYwpLCm2zCmMKUbMKWaW3CmmjDhmhuwpxuwp1waWrDhcKUwpfCmcKdwpQ=&name=" + date, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
            addNewCategory({
                name: category.name,
                cost: category.cost,
                image: "https://cdn.bandeck.com/" + response?.data.data.id,
                description: category.description
            }).then((result) => {
                if (result.status === "success") {
                    alert("Adding successful")
                    setAdding(false)
                    setNeedLoading(needLoading + 1)
                } else {
                    alert(result?.msg)
                };
                setIsLoading(false)
            })
        })


    }
    const handleChange = (event) => {
        const { value } = event.target;
        setCategory({ ...category, [event.target.name]: value })
    }
    const handleChangeFile = (event) => {
        const file = event.target.files[0];
        console.log(file)
        setFile(file)
        setCategory({ ...category })
    }
    return (
        <div className='Dung_NA_AddCategory'>
            <h6 className='Dung_NA_TitleOfAddCateScr' >Thêm</h6>

            <div className='Dung_NA_AddInforOfCate'>
                <span style={{
                    display: "flex",
                    alignSelf: "center",
                    width: "10%"
                }}>Tên loại xe</span>
                <TextField sx={{
                    width: "20%",
                    marginLeft: "3%",
                    borderRadius: "30px"
                }}

                    name="name"
                    fullWidth
                    value={category.name}
                    margin="dense"
                    variant="outlined"
                    onChange={handleChange}
                />

            </div>
            <div className='Dung_NA_AddInforOfCate'>
                <span style={{
                    display: "flex",
                    width: "10%"
                }}>Giá thuê</span>
                <TextField sx={{
                    width: "20%",

                    marginLeft: "3.5%"
                }}
                    label=""
                    name="cost"
                    fullWidth
                    value={category.cost}
                    margin="dense"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}

                    onChange={handleChange}
                />
                <span style={{
                    marginLeft: "2%"
                }}>đ/giờ</span>
            </div>
            <div className='Dung_NA_AddInforOfCate'>
                <span style={{
                    display: "flex",
                    width: "10%"
                }}>Ảnh mô tả</span>
                <label htmlFor="contained-button-file" style={{ marginLeft: "3%" }}>
                    {/* <Input accept="image/png, image/jpeg" id="contained-button-file" multiple type="file" onChange={handleChangeFile} /> */}
                    <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={(e)=>handleChangeFile(e)}></input>
                </label>
            </div>
            <div style={{
                display: "flex",
                fontFamily: "Inter",
                flexDirection: "row",
                height: "20%",
                width: "90%",
                fontWeight: "600",
                marginTop: "4%",
                marginLeft: "3%",
            }}>
                <span style={{
                    display: "flex",
                    width: "10%"
                }}>Mô tả</span>
                <TextField sx={{
                    width: "80%",
                    marginTop: "-1%",
                    marginLeft: "3%",
                }}
                    label=""
                    name="description"
                    fullWidth
                    value={category.description}
                    margin="dense"
                    variant="outlined"
                    onChange={handleChange}
                    multiline
                    rows={4}
                />
            </div>
            <div style={{ display: "grid", justifyContent: "center", gap: "5px" }}>
                <button id='Dung_NA_AddCateButton' style={{
                    backgroundColor: "#6160DC",
                    fontFamily: "'Roboto', sans-serif",
                    boxShadow: "0px 4px 4px #EFEFEF",
                    border: "1px solid #6160DC",
                    color: "white",
                    width: "100px",
                    height: "40px",
                    cursor: "pointer",
                    textAlign: "center",
                    paddingTop: "10px",
                    paddingBottom: "20px",
                    paddingLeft: "20px",
                    borderRadius: "5px"

                }} disabled={isLoading} variant="contained" onClick={() => handleClick()}> {(isLoading) ? <PropagateLoader color="white" size={10} /> : "Add new"} </button>
                <Button id='Dung_NA_XButton' sx={{
                    backgroundColor: "red",
                    width: "100px",
                    height: "40px"
                }} variant="contained" onClick={() => { setAdding(false) }}>Cancel</Button>
            </div>
        </div>
    )
}
export default AddCategory
