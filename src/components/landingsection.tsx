import React from "react";

const LandingSection: React.FC = () => {
  return (
    <div className="container flex max-w-[550px] flex-col items-center justify-center ">
      <h2 className="mb-2 text-center text-2xl font-bold">
        <span className=" text-sky-500">Feel</span> the{" "}
        <span className=" text-sky-500">power</span> of{" "}
        <span className=" text-sky-500">vitaminized</span> links
      </h2>

      <h3 className="text-center font-semibold text-muted-foreground">
        Sign in to take your marketing to the next level. Enjoy QR codes with each link
        for easy sharing and click counter to track engagement.
      </h3>
    </div>
  );
};

export default LandingSection;