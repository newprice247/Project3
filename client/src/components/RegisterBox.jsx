import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import Auth from "../../utils/auth";
import { createUser } from "../../utils/API";

 
export default function RegisterBox() {
  const [userFormData, setUserFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleRegister = async () => {
    try {
      const response = await createUser(userFormData);
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const { token, user } = await response.json();
      console.log(user);
      Auth.register(token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
    className="flex items-center justify-center p-6 bg-gray-50"
    >
      <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-5">
            Your Name
          </Typography>
          <Input
            size="lg"
            placeholder="Ex: John Doe"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e) =>
              setUserFormData({ ...userFormData, name: e.target.value })
            }
          />
          <Typography variant="h6" color="blue-gray" className="-mb-5">
            Username
          </Typography>
          <Input
            size="lg"
            placeholder="Ex: johndoe"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e) =>
              setUserFormData({ ...userFormData, username: e.target.value })
            }
          />
          <Typography variant="h6" color="blue-gray" className="-mb-5">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e) =>
              setUserFormData({ ...userFormData, email: e.target.value })
            }
          />
          <Typography variant="h6" color="blue-gray" className="-mb-5">
            Phone Number
          </Typography>
          <Input
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            placeholder="(555) 555-5555"
            onChange={(e) =>
              setUserFormData({ ...userFormData, phone: e.target.value })
            }
          />
          <Typography variant="h6" color="blue-gray" className="-mb-5">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            onChange={(e) =>
              setUserFormData({ ...userFormData, password: e.target.value })
            }
          />
        </div>
        <Button 
        className="mt-6 text-black" 
        fullWidth
        onClick={() => {
          handleRegister();
        }}
        >
          sign up
        </Button>
        
      </form>
    </Card>
     </div>
     
  );
}