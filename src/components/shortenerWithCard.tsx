import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { api } from '~/utils/api';
import { motion } from 'framer-motion'; 
import DashCard from '~/components/dashcard';
import { SkeletonDashCard } from "~/components/skeletonDashcard";
import { useToast } from "~/components/ui/use-toast"
import { ToastAction } from "~/components/ui/toast"

const ShortenerWithCard: React.FC = () => {
    const [bigurl, setUrl] = useState('');
    const [cards, setCards] = useState<JSX.Element[]>([
        <DashCard key="default"
            avatarSrc="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
            username="mnlade"
            shorturl="short-me/l/qwer123"
            url="https://github.com/mnlade/short-me"
        />,
        <SkeletonDashCard key="skeleton1" />,
        <SkeletonDashCard key="skeleton2" />,
        <SkeletonDashCard key="skeleton3" />,
    ]);

    const createShortUrlMutation = api.createLinkRouter.createShortUrl.useMutation();

    function createShortUrl() {
        createShortUrlMutation.mutate({
            url: bigurl
        });
    }

    const fetchUpdatedData = async () => {
        // Here you would fetch updated data from the server based on the created short URL
        // This is a placeholder for fetching the updated data
        const updatedData = {
            avatarSrc: 'https://example.com/avatar.jpg',
            username: 'New Username',
            shorturl: 'short-me/l/newurl',
            url: 'https://example.com/newurl',
        };

        return updatedData;
    };

    const addNewCard = async () => {
        createShortUrl();

        // Wait for the short URL to be created and then get the updated data
        const updatedData = await fetchUpdatedData();

        // Create the new card with the obtained data
        const newCard = (
            <DashCard key={updatedData.shorturl} {...updatedData} />
        );

        // Update the card list by replacing the first skeleton with the new card
        const newCards = [...cards];
        const skeletonIndex = newCards.findIndex(card => card.type === SkeletonDashCard);
        if (skeletonIndex !== -1) {
            newCards.splice(skeletonIndex, 1, newCard);
            setCards(newCards);
        }
    };

    const { toast } = useToast();

    return (
        <div className="container flex flex-col items-center justify-center px-4">
            <form
                className="flex w-[370px] m-2 items-center space-x-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    setUrl(''); // Clear the input value
                    void addNewCard(); // Add new card
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
                    onClick={() => {
                        toast({
                            description: "The link has successfully created.",
                            action: <ToastAction altText="Copy" onClick={() => console.log("clicked")}>Copy It</ToastAction>
                        });
                    }}
                >Short-It</Button>
            </form>
            <div id="cards">
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
            </div>
        </div>
    );
};

export default ShortenerWithCard;
