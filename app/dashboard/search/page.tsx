"use client";

import CoursePreview from "@/components/dashboard/search/CoursePreview";
import { Course } from "@/schemas/Course";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Partial<Course>[]>([]);

  const handleOnClick = async () => {
    try {
      const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/courses`;
      const url = searchValue ? `${baseUrl}/search/${searchValue}` : baseUrl;

      const response = await axios.get(url);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const getInitialCourses = async () => {
      setIsLoading(true);
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/courses`;

        const response = await axios.get(url);
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };
    getInitialCourses();
  }, []);

  return (
    <Box>
      <div>
        <TextField
          className=""
          label="Search"
          value={searchValue}
          onChange={handleOnChange}
        />
        <Button
          variant="contained"
          size="large"
          onClick={handleOnClick}
          disabled={isLoading}
        >
          Search
        </Button>
      </div>

      {!data.length ? (
        <span>
          Couldn&apos;t find the classes you&apos;re looking for. Try again with
          another search!
        </span>
      ) : (
        <>
          {data.map((course) => {
            return <CoursePreview course={course} key={course.id} />;
          })}
        </>
      )}
    </Box>
  );
}
