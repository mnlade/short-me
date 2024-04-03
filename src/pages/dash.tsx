import { type NextPage } from "next";
import Header from "~/components/header";
import { Separator } from "~/components/ui/separator";
import Shortener from "~/components/shortener";

const Dash: NextPage = () => {
  return (
    <>
      <Header />
      <Separator />
      <div className="gap-4 px-4 py-8 ">
        <Shortener />
      </div>
      <Separator />

    </>
  );
};
export default Dash;
