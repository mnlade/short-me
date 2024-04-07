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
  PaginationEllipsis,
} from "~/components/ui/pagination";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "~/components/footer";
import { useProtectedView } from "~/hooks/useProtectedView";

const Dash: NextPage = () => {
  const { status } = useProtectedView("/login");
  
  const { data, error, isLoading, refetch } =
    api.createLinkRouter.getLinksByUser.useQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Move the state and mutation hooks outside of the map function
  const [newDescription] = useState("");
  const updateLinkDescriptionMutation =
    api.createLinkRouter.updateLinkDescription.useMutation();

  const cards = data
    ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    .map((link) => {
      const formattedDate = new Date(link.createdAt).toLocaleDateString(
        "es-ES",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        },
      );

      function updateLinkDescription() {
        updateLinkDescriptionMutation.mutate({
          short: link.short,
          newDescription: newDescription,
        });
      }

      return (
        <motion.div
          className="p-4"
          key={link.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          // exit={{ opacity: 0, scale: 0.9 }} // Remove the exit animation for prevent overflow
          transition={{ duration: 0.5 }}
        >
          <UserDashCard
            avatarSrc={`https://www.google.com/s2/favicons?sz=40&domain=${link.url}`}
            username={link.short}
            shorturl={link.short}
            url={link.url}
            description={link.description ?? ""}
            date={formattedDate}
            onAddDescription={updateLinkDescription}
            onDeleteLink={refetch}  
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            clickcounter={link.clicks}        
          />
        </motion.div>
      );
    });

  const totalPages = Math.ceil((data?.length ?? 0) / itemsPerPage);

  return (
    <>
      <Header />
      <Separator />
      <div className="gap-4 px-4 py-8 ">
        <Shortener onNewLinkCreated={refetch} />
      </div>
      <Separator />
      <div className=" mx-auto w-full max-w-[1400px] pb-20">
        <div className="flex  flex-wrap items-center justify-center gap-4 overflow-hidden">
          {isLoading || status ==="loading" ? (
            <Spinner />
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <AnimatePresence>{cards}</AnimatePresence>
          )}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => setCurrentPage(1)}
                  isActive={1 === currentPage}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {currentPage > 2 && <PaginationEllipsis />}
              {currentPage > 1 && currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={() => setCurrentPage(currentPage)}
                    isActive={true}
                  >
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
              )}
              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    isActive={currentPage + 1 === currentPage}
                  >
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              {currentPage < totalPages - 1 && <PaginationEllipsis />}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={() => setCurrentPage(totalPages)}
                  isActive={totalPages === currentPage}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setCurrentPage((page) => Math.min(page + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <div className=" fixed bottom-0 w-full bg-white/60 text-sm text-muted-foreground backdrop-blur-sm animate-in fade-in-25 dark:bg-neutral-900/60">
        <Separator />
        <Footer />
      </div>
    </>
  );
};

export default Dash;
