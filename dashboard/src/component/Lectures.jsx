import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@mui/material";
import { getEnrollData, getLecturesById } from "../redux/Action";

const Lectures = () => {
  const [lectures, setLectures] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const { loginData, enrollmentData, LectureData } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("getting enroll data");
    dispatch(getEnrollData(loginData.token));
  }, [dispatch, loginData.token]);

  useEffect(() => {
    if (selectedCourseId) {
      dispatch(getLecturesById(loginData.token, selectedCourseId));
    }
  }, [dispatch, loginData.token, selectedCourseId]);

  useEffect(() => {
    setLectures(LectureData);
  }, [LectureData]);

  const handleCourseChange = (event) => {
    setSelectedCourseId(event.target.value);
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
            {enrollmentData.map((enrollment) => (
              <MenuItem key={enrollment._id} value={enrollment.course._id}>
                {enrollment.course.title} {/* Assuming you have courseTitle in enrollment data */}
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
    </div>
  );
};

export default Lectures;
