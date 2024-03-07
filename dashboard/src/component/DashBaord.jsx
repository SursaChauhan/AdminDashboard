import { Button,Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import  IconButton from "@mui/material/IconButton"
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Colors } from "../styles/theme";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import * as Yup from 'yup';

import {Formik, Form, Field, ErrorMessage} from 'formik';
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function  Dashboard (){
    const [products,setProducts]=useState([]);
    const[open,setOpen] =useState(false);
    const[editopen,setEditOpen] =useState(false);
    const [productid,setProductId] =useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [age, setAge] = useState('');
    const [sortOrder, setSortOrder] = useState('');


    const [initialValues,setInitialValues] =useState({
        _id:'',
        name: "",
        gender:"",
        category:"&living",
        price:"",
        description:"",
    })
    const handleAddProduct =()=>{
        setInitialValues({
        name: "",
        gender:"",
        category:"",
        price:"",
        description:"", 
        })
        setOpen(true);

    };
    const handlePostProduct =async(product)=>{
    const   token=  localStorage.getItem('usertoken')
        console.log(product);
        try {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            const data= await axios.post('http://localhost:7100/api/products', product,config, {
                headers: {
                  'Content-Type': 'application/json'
                }
              })        
                  console.log(data);
                  handlegetProduct();
          } catch (error) {
           
            console.log(error.message);
          }
          setOpen(!true);
    }

    const handlegetProduct =async()=>{
         const   token=  localStorage.getItem('usertoken')
        //     console.log(product);
            try {
                const config = {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                };
                const data= await axios.get(`http://localhost:7100/api/products?page=${currentPage}`);     
                      console.log(data);
                    //   products.push(data);
                    setProducts(data.data.products);
              } catch (error) {
               
                console.log(error.message);
              }
        }
    const handleProductEdit =async(product)=>{
        const id =product._id;
        setInitialValues({
        name: product.name,
        gender:product.gender,
        category:product.category,
        price:product.price,
        description:product.description, 
        })
        setEditOpen(true);
        setProductId(id);

    };
    
    
     
    const handleProductUpdate=async(product)=>{
        console.log('Update product',product);
       
        const id = productid;

        const   token=  localStorage.getItem('usertoken')
            console.log(id,token);
            try {
                const config = {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                };
                const data= await axios.patch(`http://localhost:7100/api/products/${id}`,{
                    name: product.name,
            gender: product.gender,
            category: product.category,
            price: product.price,
            description: product.description, 
                });     
                      console.log("data from update",data);
                      handlegetProduct();
                    // setProducts(data.data.products);
              } catch (error) {
               
                console.log(error.message);
              }
              setEditOpen(!editopen);

    };
    const handleDeleteProduct =async(product)=>{
      
        const id =product._id;
        const   token=  localStorage.getItem('usertoken')
        //     console.log(product);
            try {
                const config = {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                };
                const data= await axios.delete(`http://localhost:7100/api/products/${id}`,config);     
                      console.log("Delete product",data);
                      handlegetProduct();
                    //   products.push(data);
                    // setProducts(data.data.products);
              } catch (error) {
               
                console.log(error.message);
              }
              console.log('Delete product',product);

    }

    const handleSubmit =(values)=>{
        console.log('values',values);
        setOpen(false);
    }

    const handleChange = (event) => {
      setSortOrder(event.target.value);

      const newData = [...products];

      // Perform sorting based on the selected sort order
      if (event.target.value === 'asc') {
        newData.sort((a, b) => (a.price > b.price ? 1 : -1)); // Sorting alphabetically A-Z
      } else if (event.target.value === 'desc') {
        newData.sort((a, b) => (a.price < b.price ? 1 : -1)); // Sorting alphabetically Z-A
      }
  
      // Update the state with the sorted data
      setProducts(newData);
    };

    const handlePageChange =(event,page)=>{
setCurrentPage(page);
    }


    useEffect(() => {
handlegetProduct(currentPage);
      }, []);

  useEffect(() => {
handlegetProduct(currentPage);
      }, [currentPage]);

    return (
    <>
        {/* <Typography sx={{mb:1}}  variant="h4"/> */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"auto"}}>

        <Button startIcon={<AddIcon/>} variant="contained" onClick={handleAddProduct}>Add Product</Button>
     
     
     <Box sx={{ minWidth: 150 }}>
   <FormControl fullWidth  style={{padding:"5px 5px"}}>
     <InputLabel id="demo-simple-select-label">Sort</InputLabel>
     <Select
       labelId="demo-simple-select-label"
       id="demo-simple-select"
       value={sortOrder}
       label="price"
       onChange={handleChange}
     >
       <MenuItem value="asc">Low-High</MenuItem>
       <MenuItem value="desc">High-Low</MenuItem>
     </Select>
   </FormControl>
 </Box>

        </div>
     



        <TableContainer>
<Table>
<TableHead>
    <TableRow>
        <TableCell>
            Product
        </TableCell>
        <TableCell>
            Gender
        </TableCell>
        <TableCell>
            Category
        </TableCell>
        <TableCell>
            Price
        </TableCell>
        <TableCell>
            Description
        </TableCell>
        <TableCell>
            Action
        </TableCell>

    </TableRow>
</TableHead>
<TableBody>
    {products.map(p=>
        <TableRow>
<TableCell>{p.name}</TableCell>
<TableCell>{p.gender}</TableCell>
<TableCell>{p.category}</TableCell>
<TableCell>{p.price}</TableCell>
<TableCell>{p.description}</TableCell>
<TableCell>
    <IconButton onClick={()=> handleProductEdit(p)}>
        {<DriveFileRenameOutlineIcon/>}
    </IconButton>
    <IconButton onClick={()=> handleDeleteProduct(p)}>
        {<DeleteForeverIcon sx={{color:Colors.danger}}/>}
    </IconButton>
</TableCell>
        </TableRow>  
        )}
</TableBody>

</Table>
        </TableContainer>

      {/* pagination */}

      <div style={{display:'flex',justifyContent:'center',alignItems:"center",marginTop:"3%"}}>
      <Stack spacing={2}>
      
      <Pagination count={10} variant="outlined" shape="rounded" page={currentPage} onChange={handlePageChange}/>
    </Stack>
      </div>

    
        <Dialog open={open}
        fullWidth
        maxWidth='lg'>
            <DialogTitle>
{"ADD PRODUCT"}
            </DialogTitle>
            <Formik initialValues={initialValues} validationSchema={""} onSubmit={handlePostProduct}>
                {({dirty, isValid, getFieldProps})=>(
                    
                
           <Form>
           <DialogContent>
<Grid container spacing={2}>
<Grid xs={12}>
    <Field as={TextField} name="name"  label ="Name"required fullWidth />
    <ErrorMessage name="name">{(message)=>(<Typography color={'red'}>{message}</Typography>)}</ErrorMessage>
</Grid>
<Grid xs={12}>
    <Field as={TextField} name="gender"  label ="Gender"required fullWidth />
    <ErrorMessage name="gender">{(message)=>(<Typography color={'red'}>{message}</Typography>)}</ErrorMessage>
</Grid>
<Grid xs={12}>
    <Field as={TextField} name="category"  label ="Category"required fullWidth />
    <ErrorMessage name="category">{(message)=>(<Typography color={'red'}>{message}</Typography>)}</ErrorMessage>
</Grid>
<Grid xs={12}>
    <Field as={TextField} name="price"  label ="Price"required fullWidth />
    <ErrorMessage name="price">{(message)=>(<Typography color={'red'}>{message}</Typography>)}</ErrorMessage>
</Grid>
<Grid xs={12}>
    <Field as={TextField} name="description"  label ="Description"required fullWidth />
    <ErrorMessage name="description">{(message)=>(<Typography color={"red"}>{message} </Typography>)}</ErrorMessage>
</Grid>
</Grid>
</DialogContent>
<DialogActions> 
    {getFieldProps('_id').value !== -1?
(<Button disabled={!dirty || !isValid}  type="submit" variant="contained" color="primary" >Save/Edit</Button>
)           :
(<Button disabled={!dirty || !isValid} onClick={handlePostProduct} type="submit" variant="contained" color="primary" >Save</Button>
)           }
<Button onClick={()=>setOpen(false)} color="primary" >Cancel</Button>

</DialogActions>
           </Form>
           )}
           </Formik>
        </Dialog>

        <Dialog open={editopen}
        fullWidth
        maxWidth='lg'>
            <DialogTitle>
{"EDIT PRODUCT"}
            </DialogTitle>
            <Formik initialValues={initialValues} validationSchema={""} onSubmit={handleProductUpdate}>
                {({dirty, isValid, getFieldProps})=>(

                
           <Form>
           <DialogContent>
<Grid container spacing={2}>
<Grid xs={12}>
    <Field as={TextField} name="name"  label ="Name"required fullWidth />
    <ErrorMessage name="name">{(message)=>(<Typography color={'red'}>{message}</Typography>)}</ErrorMessage>
</Grid>
<Grid xs={12}>
    <Field as={TextField} name="gender"  label ="Gender"required fullWidth />
    <ErrorMessage name="gender">{(message)=>(<Typography color={'red'}>{message}</Typography>)}</ErrorMessage>
</Grid>
<Grid xs={12}>
    <Field as={TextField} name="category"  label ="Category"required fullWidth />
    <ErrorMessage name="category">{(message)=>(<Typography color={'red'}>{message}</Typography>)}</ErrorMessage>
</Grid>
<Grid xs={12}>
    <Field as={TextField} name="price"  label ="Price"required fullWidth />
    <ErrorMessage name="price">{(message)=>(<Typography color={'red'}>{message}</Typography>)}</ErrorMessage>
</Grid>
<Grid xs={12}>
    <Field as={TextField} name="description"  label ="Description"required fullWidth />
    <ErrorMessage name="description">{(message)=>(<Typography color={"red"}>{message} </Typography>)}</ErrorMessage>
</Grid>
</Grid>
</DialogContent>
<DialogActions> 
    {getFieldProps('_id').value !== -1?
(<Button disabled={!dirty || !isValid}  type="submit" variant="contained" color="primary" >Save/Edit</Button>
)           :
(<Button disabled={!dirty || !isValid} onClick={handlePostProduct} type="submit" variant="contained" color="primary" >Save</Button>
)           }
<Button onClick={()=>setEditOpen(false)} color="primary" >Cancel</Button>

</DialogActions>
           </Form>
           )}
           </Formik>
        </Dialog>
        </>
    )
    }