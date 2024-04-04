import { type NextPage } from "next";
import Header from "~/components/header";
import { Separator } from "~/components/ui/separator";
import Shortener from "~/components/shortener";
import UserDashCard from "~/components/UserDashCard";
import { api } from "~/utils/api";
import Spinner from "~/components/spinner";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

const Dash: NextPage = () => {
  const {data, error, isLoading} = api.createLinkRouter.getLinksByUser.useQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const cards = data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((link) => {
    const formattedDate = new Date(link.createdAt).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div className="p-4" key={link.id}>
        <UserDashCard
          avatarSrc={`https://www.google.com/s2/favicons?sz=40&domain=${link.url}`}
          username={link.short}
          shorturl={link.short}
          url={link.url}
          description={link.description ?? ""}
          date={formattedDate}
        />
      </div>
    );
  });

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

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
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink href="#" onClick={() => setCurrentPage(pageNum)} isActive={pageNum === currentPage}>
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default Dash;