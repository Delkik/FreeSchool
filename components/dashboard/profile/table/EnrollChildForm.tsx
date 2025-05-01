import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "@/modules/components/dashboard/profile/table/EnrollChildForm.module.css";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { BaseUser } from "@/schemas/User";

interface ChildSignUpForm {
  name: string;
  email: string;
  grade: string;
  password: string;
  confirm: string;
}

interface EnrollChildFormProps {
  handlePostSubmit?: () => void;
}

export default function EnrollChildForm({
  handlePostSubmit,
}: EnrollChildFormProps) {
  const { data: session, update } = useSession();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      grade: "",
      password: "",
      confirm: "",
    },
  });

  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<ChildSignUpForm> = async (
    data: ChildSignUpForm
  ) => {
    const { name, email, grade, password, confirm } = data;

    try {
      const splitName = name.split(" ");
      if (splitName.length < 2) {
        setError("Please include your First and Last name.");
        return;
      }
      if (password !== confirm) {
        setError("Passwords must match!");
        return;
      }
      setError("");

      const resData = {
        firstName: splitName[0],
        lastName: splitName.slice(1).join(" "),
        email,
        password,
        role: "student",
        grade,
        parentId: session?.user?.id,
      };

      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resData),
      });

      const json = await response.json();

      const child: BaseUser = json.user;
      if (child) {
        const user = session!.user!;
        user.children = user.children || [];
        user.children.push(child);

        const url2 = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${session?.user?.id}/documents/ihip`;

        await fetch(url2, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            childName: child.firstName,
            grade: child.grade,
          }),
        });

        await update({ user });
      } else {
        throw new Error(json.error);
      }

      handlePostSubmit?.();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e);
      setError(e?.response?.data?.error || e?.error || e?.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <span className={styles.error_text}>{error}</span>
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
