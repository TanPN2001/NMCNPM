import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { updateCategory } from "../../Store/ListCategoryStore";
export default function EditCategory({ setEdit, setNeedLoading, needLoading, currentCategory }) {
    const [category, setCategory]= useState({
        name:currentCategory.name,
        cost:currentCategory.cost,
        image:currentCategory.image,
        description:currentCategory.description
    })

    const handleChange = (event) => {
        const {name,value}= event.target;
        setCategory({...category,[name]:value})
        return 0;
    }

    const handleSubmit = async()=>{
        const result = await updateCategory(currentCategory._id,category);
        if(result!=="Failed to update"){
            alert(result.msg)
            setNeedLoading(needLoading+1);
            setEdit(false)
        }else{
            alert(result);
        }
    }

    return (
        <div className='Dung_NA_AddCategory'>
            <h6 className='Dung_NA_TitleOfAddCateScr' >Edit</h6>
            <div className='Dung_NA_AddInforOfCate'>
                <span style={{
                    display: "flex",
                    alignSelf: "center",
                    width: "10%"
                }}>Model</span>
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
                    marginLeft: "3%"
                }}
                    label=""
                    name="cost"
                    fullWidth
                    type="number"
                    InputLabelProps={{
                    shrink: true,
                    }}
                    value={category.cost}
                    margin="dense"
                    variant="outlined"
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
                }}>Link ảnh</span>
                <TextField sx={{
                    width: "80%",
                    marginLeft: "3%"
                }}
                    label=""
                    name="image"
                    fullWidth
                    value={category.image}
                    margin="dense"
                    variant="outlined"
                    onChange={handleChange}
                />
            </div>
            <div style={{
                display: "flex",
                fontFamily: "Inter",
                flexDirection: "row",
                height: "8%",
                width: "100%",
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
            <Button sx={{
                display: "flex",
                width: "20%",
                alignSelf: "center",
                marginTop: "10%",
                }} 
                variant="contained"
                color="secondary" 
                onClick={handleSubmit}
                >Save</Button>
            <Button sx={{
                display: "flex",
                width: "20%",
                alignSelf: "center",
                marginTop: "2%",
                backgroundColor: "red"
            }} variant="contained" onClick={() => { setEdit(false) }}>Cancle</Button>
        </div>
    )
}
