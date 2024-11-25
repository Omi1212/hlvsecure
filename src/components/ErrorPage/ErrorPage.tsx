import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-[100vh]">
      <h1 className="bg-red-300 font-bold text-2xl">Oops! 404 not found</h1>
      <p>Possibly you are looking where you shouldn't.</p>

      <Link to="dashboard">
        <Button>Return</Button>
      </Link>
    </div>
  );
};
export default ErrorPage;
