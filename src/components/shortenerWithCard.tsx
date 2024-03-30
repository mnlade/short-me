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
            shorturl="l/LHIFYt4"
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
    const { data } = api.createLinkRouter.getLinkByUrl.useQuery({ url: bigurl });

    const fetchUpdatedData = async () => {
        // Wait for the short URL to be created
        const updatedData = {
            avatarSrc: data?.short, //temporary placeholder for the avatar replace with a favicon searcher
            username: data?.creatorId,
            shorturl: "l/" + data?.short,
            url: data?.url,
        };
        if (data === undefined) {
            return updatedData;
        }
        return updatedData;
    };
    

    const addNewCard = async () => {
        createShortUrl();

        // Wait for the short URL to be created and then get the updated data
        const updatedData = await fetchUpdatedData();

        // Create the new card with the obtained data
        const newCard = (
            <DashCard
                key={updatedData.shorturl}
                avatarSrc={updatedData.avatarSrc ?? ''}
                username={updatedData.username ?? ''}
                shorturl={updatedData.shorturl ?? ''}
                url={updatedData.url ?? ''}
            />
        );

        // Update the card list by replacing the first skeleton with the new card
        const newCards = [...cards];
        const skeletonIndex = newCards.findIndex(
            (card) => card.type === SkeletonDashCard
        );
        if (skeletonIndex !== -1) {
            newCards.splice(skeletonIndex, 1, newCard);
            setCards(newCards);
        }
    };

    const { toast } = useToast();

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Copied to clipboard:', text);
            })
            .catch(err => {
                console.error('Failed to copy:', err);
            });
    };

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
                            action: <ToastAction altText="Copy"  onClick={() => copyToClipboard("https://short-me-omega.vercel.app/l/" + data?.short ?? '')}>Copy It</ToastAction> // Add the action correctly
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
