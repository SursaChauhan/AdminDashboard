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
import { getEnrollData } from '../redux/Action';

const Lectures = () => {
  const [lectures, setLectures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const { loginData, enrollmentData, LectureData, totalPages, page } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
console.log(enrollmentData);
  useEffect(() => {
    dispatch(getEnrollData(loginData.token));
  }, []);

  useEffect(() => {
    setLectures(LectureData);
  }, [LectureData]);

  const handleCourseChange = (event) => {
    setSelectedCourseId(event.target.value);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

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
          <InputLabel id="course-filter-label">Filter by Course</InputLabel>
          <Select
            labelId="course-filter-label"
            id="course-filter-select"
            value={selectedCourseId}
            onChange={handleCourseChange}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {enrollmentData.map(enrollment => (
              <MenuItem key={enrollment.courseId} value={enrollment.courseId}>
                {enrollment.courseTitle} {/* Assuming you have courseTitle in enrollment data */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
  {lectures?.map((lecture) => (
    <Grid item xs={12} sm={6} md={4} key={lecture._id}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div">
            {lecture.title}
          </Typography>
          <video src={lecture.video} controls width="100%" height="auto" />
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
    // <div>
    //     "ji"
    // </div>
  );
};

export default Lectures;
