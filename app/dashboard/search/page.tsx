"use client";

import CoursePreview from "@/components/dashboard/search/CoursePreview";
import { Course } from "@/schemas/Course";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "@/modules/app/dashboard/search/Search.module.css";

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
    <Box className={styles.container}>
      <h1 className={styles.title}>Search</h1>
      <div className={styles.search}>
        <TextField
          className={styles.searchBar}
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
        <span className={styles.sad}>
          Couldn&apos;t find the classes you&apos;re looking for. Try again with
          another search!
        </span>
      ) : (
        <ul className={styles.grid}>
          {data.map((course) => {
            return (
              <li key={course.id}>
                <CoursePreview course={course} />
              </li>
            );
          })}
        </ul>
      )}
    </Box>
  );
}
