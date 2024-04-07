import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { api } from "~/utils/api";
import { AnimatePresence, motion } from "framer-motion";
import DashCard from "~/components/dashcard";
import { SkeletonDashCard } from "~/components/skeletonDashcard";
import { useToast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
import Spinner from "./spinner";

const ShortenerWithCard: React.FC = () => {
  const clickdata = api.createLinkRouter.getLinkStats.useQuery();
  const [clickCounterValue, setClickCounterValue] = useState(0); // default value
  const [bigurl, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (clickdata && clickdata.data && typeof clickdata.data.clicks ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setClickCounterValue(clickdata.data.clicks);
    }
  }, [clickdata]);

  useEffect(() => {
    setCards([
      <DashCard
        key="default"
        avatarSrc="https://www.google.com/s2/favicons?sz=40&domain_url=github.com"
        username="mnlade"
        shorturl="LHIFYt4"
        url="https://github.com/mnlade/short-me"
        clickcounter={clickCounterValue}
      />,
      <motion.div
        key="skeleton1"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.2 }}
      >
        <SkeletonDashCard />
      </motion.div>,
    <motion.div
      key="skeleton2"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.2 }}
    >
      <SkeletonDashCard />
    </motion.div>,
    <motion.div
      key="skeleton3"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.2 }}
    >
      <SkeletonDashCard />
    </motion.div>,
]);
}, [clickCounterValue]);

  const createShortUrlMutation =
    api.createLinkRouter.createShortUrl.useMutation();

  function createShortUrl() {
    setIsLoading(true); // Set loading to true when the function is called
    createShortUrlMutation.mutate({
      url: bigurl,
    });
  }

  useEffect(() => {
    if (createShortUrlMutation.data) {
      addNewCard();
      setIsLoading(false); // Set loading to false when the data is received
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createShortUrlMutation.data]); // Trigger when mutation data changes

  const addNewCard = () => {
    const faviconUrl = `https://www.google.com/s2/favicons?sz=40&domain=${createShortUrlMutation.data?.url}`; // Get the favicon of the URL
    const newCard = (
      <motion.div
        key={createShortUrlMutation.data?.short}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.2 }}
      >
        <DashCard
          avatarSrc={faviconUrl}
          username={createShortUrlMutation.data?.short ?? ""}
          shorturl={createShortUrlMutation.data?.short ?? ""}
          url={createShortUrlMutation.data?.url ?? ""}
          clickcounter={createShortUrlMutation.data?.clicks as number}
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
          disabled={!hasSkeletonCards || isLoading} // Disable the button if there are no SkeletonDashCards left or if it's loading
        >
          <div // Show spinner when loading and dont change button size
            style={{
              width: "60px",
              height: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isLoading ? <Spinner /> : "Short-It"}
          </div>
        </Button>
      </form>
      <div id="cards">
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {card}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {!hasSkeletonCards && (
        <Button
          onClick={() => (window.location.href = "/login")}
          className="m-2 font-bold"
        >
          Sign in for more links
        </Button>
      )}
    </div>
  );
};

export default ShortenerWithCard;
