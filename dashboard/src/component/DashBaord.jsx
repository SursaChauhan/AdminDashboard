import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  IconButton,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getData ,postCourse,patchCourse,deleteCourse} from "../redux/Action";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [sortOrder, setSortOrder] = useState("");

  const {loginData,data} =useSelector((state)=>state.auth);
  const dispatch =useDispatch();

  const [initialValues, setInitialValues] = useState({
    _id: "",
    title: "",
    description: "",
  
  });

  const handleAddCourse = () => {
    setInitialValues({
      title: "",
      description: "",
     
    });
    setOpen(true);
  };

  const handlePostCourse = async (course) => {
    try {
      const {token} =loginData;
      dispatch(postCourse(token));
      handleGetCourses();
    } catch (error) {
      console.error(error.message);
    }
    setOpen(false);
  };

  const handleGetCourses = async () => {
    try {
      // const token = localStorage.getItem("usertoken");
      // const limit = 8;
      const {token} =loginData;
      dispatch(getData(token));

      console.log(data);
      // const totalPages = Math.ceil(response.data.length / limit);
      setCourses(data);
      // setPages(totalPages);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCourseEdit = (course) => {
    const id = course._id;
    setInitialValues({
      title: course.title,
      description: course.description,
      // topic: course.topic,
      // region: course.region,
      // pestle: course.pestle,
    });
    setCourseId(id);
    setEditOpen(true);
  };

  const handleCourseUpdate = async (course) => {
    const id = courseId;
    try {
      const {token} =loginData;
      dispatch(patchCourse(token, id, course));
      console.log("Updated course:");
      handleGetCourses();
    } catch (error) {
      console.error(error.message);
    }
    setEditOpen(false);
  };

  const handleDeleteCourse = async (course) => {
    const id = course._id;
    try {
      const {token} =loginData;
      dispatch(deleteCourse(token, id));
     
      console.log("Deleted course:");
      handleGetCourses();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    setOpen(false);
  };

  const handleChange = (event) => {
    setSortOrder(event.target.value);

    const sortedCourses = [...courses];

    if (event.target.value === "asc") {
      sortedCourses.sort((a, b) => (a.title > b.title ? 1 : -1));
    } else if (event.target.value === "desc") {
      sortedCourses.sort((a, b) => (a.title < b.title ? 1 : -1));
    }

    setCourses(sortedCourses);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    handleGetCourses();
  }, [currentPage]);

   useEffect(()=>{
  //   handleGetCourses();
     setCourses(data);
    },[data]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleAddCourse}
        >
          Add Course
        </Button>

        <FormControl fullWidth style={{ padding: "5px 5px" }}>
          <InputLabel id="sort-label">Sort</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={sortOrder}
            onChange={handleChange}
          >
            <MenuItem value="asc">A-Z</MenuItem>
            <MenuItem value="desc">Z-A</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              {/* <TableCell>Topic</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Pestle</TableCell>
              <TableCell>Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.description}</TableCell>
                {/* <TableCell>{course.topic}</TableCell>
                <TableCell>{course.region}</TableCell>
                <TableCell>{course.pestle}</TableCell> */}
                <TableCell>
                  <IconButton onClick={() => handleCourseEdit(course)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCourse(course)}>
                    <DeleteForeverIcon sx={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "3%",
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={pages}
            variant="outlined"
            shape="rounded"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </div>

      {/* Add Course Dialog */}
      <Dialog open={open} fullWidth maxWidth="lg">
        <DialogTitle>Add Course</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("description is required"),
            // topic: Yup.string().required("Topic is required"),
            // region: Yup.string().required("Region is required"),
            // pestle: Yup.string().required("Pestle is required"),
          })}
          onSubmit={handlePostCourse}
        >
          {({ dirty, isValid, getFieldProps }) => (
            <Form>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="title"
                      label="Title"
                      fullWidth
                      {...getFieldProps("title")}
                    />
                    <ErrorMessage name="title">
                      {(message) => (
                        <Typography color="error">{message}</Typography>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="description"
                      label="description"
                      fullWidth
                      {...getFieldProps("description")}
                    />
                    <ErrorMessage name="description">
                      {(message) => (
                        <Typography color="error">{message}</Typography>
                      )}
                    </ErrorMessage>
                  </Grid>
                  
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  disabled={!dirty || !isValid}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
                <Button onClick={() => setOpen(false)} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog open={editOpen} fullWidth maxWidth="lg">
        <DialogTitle>Edit Course</DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("description is required"),
            // topic: Yup.string().required("Topic is required"),
            // region: Yup.string().required("Region is required"),
            // pestle: Yup.string().required("Pestle is required"),
          })}
          onSubmit={handleCourseUpdate}
        >
          {({ dirty, isValid, getFieldProps }) => (
            <Form>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="title"
                      label="Title"
                      fullWidth
                      {...getFieldProps("title")}
                    />
                    <ErrorMessage name="title">
                      {(message) => (
                        <Typography color="error">{message}</Typography>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="description"
                      label="description"
                      fullWidth
                      {...getFieldProps("description")}
                    />
                    <ErrorMessage name="description">
                      {(message) => (
                        <Typography color="error">{message}</Typography>
                      )}
                    </ErrorMessage>
                  </Grid>
                 
                 
                
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  disabled={!dirty || !isValid}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
                <Button onClick={() => setEditOpen(false)} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default Dashboard;
