import { type NextPage } from "next";
import Header from "~/components/header";
import { Separator } from "~/components/ui/separator";
import Shortener from "~/components/shortener";
import UserDashCard from "~/components/UserDashCard";

const Dash: NextPage = () => {
  return (
    <>
      <Header />
      <Separator />
      <div className="gap-4 px-4 py-8 ">
        <Shortener />
      </div>
      <Separator />
      <div className="container mx-auto">
        <div className=" gap-4 flex flex-wrap justify-center items-center">
          <div className="p-4">
            <UserDashCard
              key="default"
              avatarSrc="https://www.google.com/s2/favicons?sz=40&domain_url=github.com"
              username="mnlade"
              shorturl="l/LHIFYt4"
              url="https://github.com/mnlade/short-me"
              description="This is a description
      This is a descriptionThis is a descriptionThis is a description
      This is a descriptionThis is a descriptionThis is a description
      This is a descriptionThis is a descriptionThis is a description
      This is a descriptionThis is a description"
      date="2021-09-01"
            />
          </div>

          <div className=" p-4">
            <UserDashCard
              key="default"
              avatarSrc="https://www.google.com/s2/favicons?sz=40&domain_url=github.com"
              username="mnlade"
              shorturl="l/LHIFYt4"
              url="https://github.com/mnlade/short-me"
              description="This is a description
      This is a descriptionThis is a description"
      date="2021-09-01"

            />
          </div>

          <div className="p-4">
            <UserDashCard
              key="default"
              avatarSrc="https://www.google.com/s2/favicons?sz=40&domain_url=github.com"
              username="mnlade"
              shorturl="l/LHIFYt4"
              url="https://github.com/mnlade/short-me"
              description="This is a description
      This is a descriptionThis is a description"
      date="2021-09-01"

            />
            
          </div>

          <div className="p-4">
            <UserDashCard
              key="default"
              avatarSrc="https://www.google.com/s2/favicons?sz=40&domain_url=github.com"
              username="mnlade"
              shorturl="l/LHIFYt4"
              url="https://github.com/mnlade/short-me"
              description="This is a description
      This is a descriptionThis is a description"
      date="2021-09-01"

            />
          </div>

          <div className="p-4">
            <UserDashCard
              key="default"
              avatarSrc="https://www.google.com/s2/favicons?sz=40&domain_url=github.com"
              username="mnlade"
              shorturl="l/LHIFYt4"
              url="https://github.com/mnlade/short-me"
              description="This is a description
      This is a descriptionThis is a description"
      date="2021-09-01"
            />
          </div>

          <div className="p-4">
            <UserDashCard
              key="default"
              avatarSrc="https://www.google.com/s2/favicons?sz=40&domain_url=github.com"
              username="mnlade"
              shorturl="l/LHIFYt4"
              url="https://github.com/mnlade/short-me"
              description="This is a description
      This is a descriptionThis is a description"
      date="2021-09-01"

            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dash;
