import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { api } from "~/utils/api";
import { AnimatePresence, motion } from "framer-motion";
import DashCard from "~/components/dashcard";
import { SkeletonDashCard } from "~/components/skeletonDashcard";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";

const ShortenerWithCard: React.FC = () => {
  const [bigurl, setUrl] = useState("");
  const [cards, setCards] = useState<JSX.Element[]>([
    <DashCard
      key="default"
      avatarSrc="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
      username="mnlade"
      shorturl="l/LHIFYt4"
      url="https://github.com/mnlade/short-me"
    />,
    <motion.div
      key="skeleton1"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.1 }}
    >
      <SkeletonDashCard />
    </motion.div>,
    <motion.div
      key="skeleton2"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.1 }}
    >
      <SkeletonDashCard />
    </motion.div>,
    <motion.div
      key="skeleton3"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.1 }}
    >
      <SkeletonDashCard />
    </motion.div>,
  ]);

  const createShortUrlMutation =
    api.createLinkRouter.createShortUrl.useMutation();

  function createShortUrl() {
    createShortUrlMutation.mutate({
      url: bigurl,
    });
  }

  useEffect(() => {
    if (createShortUrlMutation.data) {
      addNewCard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createShortUrlMutation.data]); // Trigger when mutation data changes
  const addNewCard = () => {
    const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${createShortUrlMutation.data?.url}`; // Get the favicon of the URL
    const newCard = (
      <motion.div
        key={createShortUrlMutation.data?.short}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.1 }}
      >
        <DashCard
          avatarSrc={faviconUrl}
          username={createShortUrlMutation.data?.short ?? ""}
          shorturl={createShortUrlMutation.data?.short ?? ""}
          url={createShortUrlMutation.data?.url ?? ""}
        />
      </motion.div>
    );

    // Replace the first skeleton with the new card
    const newCards = [...cards];
    const skeletonIndex = newCards.findIndex(
      (card) => card.key && card.key.startsWith("skeleton"),
    );
    if (skeletonIndex !== -1) {
      newCards.splice(skeletonIndex, 1, newCard);
      setCards(newCards);
      // Show toast
      toast({
        description: "The link has successfully created.",
        action: (
          <ToastAction
            altText="Copy"
            onClick={() =>
              copyToClipboard(
                "https://short-me-omega.vercel.app/l/" +
                  createShortUrlMutation.data?.short,
              )
            }
          >
            Copy It
          </ToastAction>
        ),
      });
    }
  };

  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied to clipboard:", text);
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  const hasSkeletonCards = cards.some(
    (card) => card.key && card.key.startsWith("skeleton"),
  );
  return (
    <div className="container flex flex-col items-center justify-center px-4">
      <form
        className="m-2 flex w-[370px] items-center space-x-2"
        onSubmit={(e) => {
          e.preventDefault();
          setUrl(""); // Clear the input value
          createShortUrl(); // Add new card
        }}
      >
        <Input
          required
          id="bigurl"
          type="url"
          placeholder="Place your Url Here"
          value={bigurl}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          type="submit"
          disabled={!hasSkeletonCards} // Disable the button if there are no SkeletonDashCards left
        >
          Short-It
        </Button>
      </form>
      <div id="cards">
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {card}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {!hasSkeletonCards && (
        <a href="./login" className="font-bold text-sky-500">
          Sign in for more links
        </a>
      )}
    </div>
  );
};

export default ShortenerWithCard;
