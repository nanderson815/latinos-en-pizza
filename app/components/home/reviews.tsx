import Card from "../shared/card";
import QuoteIcon from 'public/images/quote.png'
import { Testimonial } from "~/data/contentful";
import { getFilters } from "~/utilities/hexToCssFilters";


export default function Reviews({ reviews }: { reviews: Testimonial[] }) {
    return (
        <div className="flex justify-center items-center max-w-screen-2xl mx-auto md:p-8">
            <div className="flex space-x-4 horizontal-scroll-container">
                {reviews.map((review, i) => (
                    <div className="scroll-item" key={i}>
                        <Card className="max-w-[18rem]">
                            <div className="flex justify-between flex-col p-4 min-h-[290px]" style={{ backgroundColor: review.backgroundColor }}>
                                <img src={QuoteIcon} className="h-8 mx-auto mb-2" style={{ filter: getFilters(review.accentColor).filter }} />
                                <p>"{review.quote}"</p>
                                <p className="text-right">- {review.name}</p>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>

    )
}