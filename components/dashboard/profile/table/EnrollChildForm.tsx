import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "@/modules/components/dashboard/profile/table/EnrollChildForm.module.css";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

interface ChildSignUpForm {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export default function EnrollChildForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      grade: "",
      password: "",
      confirm: "",
    },
  });

  const onSubmit: SubmitHandler<ChildSignUpForm> = async (
    data: ChildSignUpForm
  ) => {
    console.log("hi", data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Box className={styles.form_inputs}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <TextField {...field} required label="Name" />}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField {...field} required label="Email" />
          )}
        />
        <FormControl required fullWidth>
          <InputLabel id="grade-label">Grade</InputLabel>
          <Controller
            name="grade"
            control={control}
            render={({ field }) => (
              <Select {...field} labelId="grade-label" label="Grade">
                <MenuItem value={"K"}>K</MenuItem>
                {Array.from({ length: 12 }).map((_, i) => (
                  <MenuItem key={i} value={(i + 1).toString()}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Password" required type="password" />
          )}
        />
        <Controller
          name="confirm"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Confirm Password"
              required
              type="password"
            />
          )}
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        size="large"
        className={styles.sign_up}
      >
        Sign Up
      </Button>
    </form>
  );
}
