import { type NextPage } from "next";
import Header from "~/components/header";
import { Separator } from "~/components/ui/separator";
import Shortener from "~/components/shortener";
import UserDashCard from "~/components/UserDashCard";
import { api } from "~/utils/api";
import Spinner from "~/components/spinner";


const Dash: NextPage = () => {
  const {data, error, isLoading} = api.createLinkRouter.getLinksByUser.useQuery();

  const cards = data?.map((link) => (
    <div className="p-4" key={link.id}>
      <UserDashCard
        avatarSrc={`https://www.google.com/s2/favicons?sz=40&domain=${link.url}`}
        username={link.short}
        shorturl={link.short}
        url={link.url}
        description={link.description ?? ""}
        date={link.createdAt}
      />
    </div>
  ));

  return (
    <>
      <Header />
      <Separator />
      <div className="gap-4 px-4 py-8 ">
        <Shortener />
      </div>
      <Separator />
      <div className="container mx-auto">
        <div className="gap-4 flex flex-wrap justify-center items-center">
          {isLoading ? <Spinner/> : error ? <p>Error: {error.message}</p> : cards}
        </div>
      </div>
    </>
  );
};

export default Dash;