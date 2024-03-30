import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="container flex max-w-[550px] flex-col items-center justify-center gap-4 ">
      <h2 className="mb-2 text-center text-5xl font-bold">
        Simplify your{" "}
        <span className=" text-sky-500">
          links
        </span>{" "}
        amplify your{" "}
        <span className=" text-sky-500">
          message!
        </span>
      </h2>

      <h3 className="text-center font-semibold text-muted-foreground">
        Say goodbye to lengthy links and hello to simplicity in just seconds!
      </h3>
    </div>
  );
};

export default Hero;
