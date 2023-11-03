import { useFormik } from "formik";
import * as yup from "yup";
const validationSchema = yup.object({
  email: yup
    .string()
    .email(`И-Мэйл хүчин төгөлдөр биш байна`)
    .required(`И-Мэйл хоосон байж болохгүй`),
});

export function IntroductionFormEmail() {
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (value) => {
      const otpRequest = await onRequestCode(formik.values.email);
      if (otpRequest) setEmail(value.email);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        onChange={formik.handleChange("email")}
        value={formik.values.email}
        variant={formik.errors.email ? "error" : "default"}
      />
      {formik.errors.email && <p>{formik.errors.email}</p>}

      <button type="submit">submit</button>
    </form>
  );
}
