import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Pagination,
  Card,
  CardContent,
} from "@mui/material";
import { getData } from "../redux/Action";

const StDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");

  const { loginData, data, page, totalPages, IsLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleGetCourses = async () => {
    try {
      const limit = 2;
      const { token } = loginData;
      dispatch(getData(token, currentPage, limit));
    } catch (error) {
      console.error(error.message);
    }
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

  useEffect(() => {
    setCourses(data);
  }, [data]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "auto",
        }}
      >
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

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {courses?.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card>
              <CardContent>
                <img src={course.ImageURl} width={200} height={200} />
                <Typography variant="h6" component="div">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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
            count={totalPages}
            variant="outlined"
            shape="rounded"
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default StDashboard;
