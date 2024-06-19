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
    const [users,setusers]=useState([]);
    const[open,setOpen] =useState(false);
    const[editopen,setEditOpen] =useState(false);
    const [userid,setUserId] =useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pages,setPages] =useState(0);

    const [age, setAge] = useState('');
    const [sortOrder, setSortOrder] = useState('');


    const [initialValues,setInitialValues] =useState({
        _id:'',
        title:"",
        sector: "sector",
        topic:"topic",
        region:"region",
        pestle:"",
        
    })
    const handleAddProduct =()=>{
        setInitialValues({
          title:"",
          sector: "",
          topic:"",
          region:"",
          pestle:"",
        })
        setOpen(true);

    };
    const handlePostUser =async(user)=>{
    const   token=  localStorage.getItem('usertoken')
        console.log(user);
        try {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            const data= await axios.post('https://backend-mongo-3.onrender.com/api/users', user,config, {
                headers: {
                  'Content-Type': 'application/json'
                }
              })        
                  console.log(data);
                  handlegetUser();
          } catch (error) {
           
            console.log(error.message);
          }
          setOpen(!true);
    }

//strike checking

    const handlegetUser =async()=>{
         const   token=  localStorage.getItem('usertoken')
         const limit = 8; 
        //     console.log(product);
            try {
                const config = {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                };
                const data= await axios.get(`https://backend-mongo-3.onrender.com/api/users?${pages}&limit=8`);     
                      console.log(data.data);
                    const dataPages = Math.ceil(data.data.length /limit);
                    console.log(dataPages);
                    setusers(data.data);
                    setPages(dataPages);
                    
              } catch (error) {
               
                console.log(error.message);
              }
        }
    const handleUserEdit =async(user)=>{
        const id =user._id;
        setInitialValues({
          title:user.title,
          sector: user.sector,
          topic:user.topic,
          region:user.region,
          pestle:user.pestle, 
        })
        setEditOpen(true);
        setUserId(id);

    };
    
    
     
    const handleUserUpdate=async(user)=>{
        console.log('Update User',user);
       
        const id = userid;

        const   token=  localStorage.getItem('usertoken')
            console.log(id,token);
            try {
                const config = {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                };
                const data= await axios.patch(`https://backend-mongo-3.onrender.com/api/users/${id}`,{
                  title:user.title,
                  sector: user.sector,
                  topic:user.topic,
                  region:user.region,
                  pestle:user.pestle, 
                });     
                      console.log("data from update",data);
                      handlegetUser();
                    // setusers(data.data.users);
              } catch (error) {
               
                console.log(error.message);
              }
              setEditOpen(!editopen);

    };
    const handleDeleteUser =async(user)=>{
      
        const id =user._id;
        const   token=  localStorage.getItem('usertoken')
        //     console.log(product);
            try {
                const config = {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                };
                const data= await axios.delete(`https://backend-mongo-3.onrender.com/api/users/${id}`,config);     
                      console.log("Delete product",data);
                      handlegetUser();
                    //   users.push(data);
                    // setusers(data.data.users);
              } catch (error) {
               
                console.log(error.message);
              }
              console.log('Delete product',user);

    }

    const handleSubmit =(values)=>{
        console.log('values',values);
        setOpen(false);
    }

    const handleChange = (event) => {
      setSortOrder(event.target.value);

      const newData = [...users];

      // Perform sorting based on the selected sort order
      if (event.target.value === 'asc') {
        newData.sort((a, b) => (a.price > b.price ? 1 : -1)); // Sorting alphabetically A-Z
      } else if (event.target.value === 'desc') {
        newData.sort((a, b) => (a.price < b.price ? 1 : -1)); // Sorting alphabetically Z-A
      }
  
      // Update the state with the sorted data
      setusers(newData);
    };

    const handlePageChange =(event,page)=>{
setCurrentPage(page);
    }


    useEffect(() => {
handlegetUser(currentPage);
      }, []);

  useEffect(() => {
handlegetUser(currentPage);
      }, [currentPage]);

    return (
    <>
       
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"auto"}}>

        <Button startIcon={<AddIcon/>} variant="contained" onClick={handleAddProduct}>Add DATA</Button>
     
     
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
            Title
        </TableCell>
        <TableCell>
            Sector
        </TableCell>
        <TableCell>
            Topic
        </TableCell>
        <TableCell>
            Region
        </TableCell>
        <TableCell>
            Pestle
        </TableCell>
        <TableCell>
            Action
        </TableCell>

    </TableRow>
</TableHead>
<TableBody>
    {users.map(p=>
        <TableRow>
<TableCell>{p.title}</TableCell>
<TableCell>{p.sector}</TableCell>
<TableCell>{p.topic}</TableCell>
<TableCell>{p.region}</TableCell>
<TableCell>{p.pestle}</TableCell>
<TableCell>
    <IconButton onClick={()=> handleUserEdit(p)}>
        {<DriveFileRenameOutlineIcon/>}
    </IconButton>
    <IconButton onClick={()=> handleDeleteUser(p)}>
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
      
      <Pagination count={pages} variant="outlined" shape="rounded" page={currentPage} onChange={handlePageChange}/>
    </Stack>
      </div>

    
        <Dialog open={open}
        fullWidth
        maxWidth='lg'>
            <DialogTitle>
{"ADD PRODUCT"}
            </DialogTitle>
            <Formik initialValues={initialValues} validationSchema={""} onSubmit={handlePostUser}>
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
(<Button disabled={!dirty || !isValid} onClick={handlePostUser} type="submit" variant="contained" color="primary" >Save</Button>
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
            <Formik initialValues={initialValues} validationSchema={""} onSubmit={handleUserUpdate}>
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
(<Button disabled={!dirty || !isValid} onClick={handlePostUser} type="submit" variant="contained" color="primary" >Save</Button>
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