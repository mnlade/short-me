import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="container flex max-w-[550px] flex-col items-center justify-center gap-4 ">
      <h2 className="mb-2 text-center text-5xl font-bold">
        Simplify your{" "}
        <span className="bg-gradient-to-r from-sky-500 via-sky-600 to-sky-500 bg-clip-text text-transparent">
          links
        </span>{" "}
        amplify your{" "}
        <span className="bg-gradient-to-r from-sky-500 via-sky-600 to-sky-500 bg-clip-text text-transparent">
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
