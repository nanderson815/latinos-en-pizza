import Card from "../shared/card";
import QuoteIcon from 'public/images/quote.png'

interface Review {
    name: string;
    review: string;
    backgroundColor: string;
    accentColor: string;
}

const reviews: Review[] = [
    {
        name: "Molly C",
        review: "We seriously LOVE Yom Ice Cream! Can’t seem to keep it in the freezer for more than 2 days before it’s all gone. Whether you eat it plain or with flavor pairings(coffee YOM + condor chocolate might be our favorite), you can’t go wrong! Thanks for making such a delicious and quality treat and so glad we can get it at Daily Groceries!",
        backgroundColor: "#FFDD77",
        accentColor: "invert(71%) sepia(84%) saturate(3484%) hue-rotate(347deg) brightness(100%) contrast(94%)" // #F6871F calculated using https://codepen.io/sosuke/pen/Pjoqqp
    },
    {
        name: "Donna N",
        review: "“I love chocolate ice cream and I’ve tasted almost every brand out there. But this is hands-down the best one I’ve ever had. I can’t believe how creamy and smooth it is and the chocolate is just amazing! I’m really looking forward to trying the other flavors!”",
        backgroundColor: "#FDD6BC",
        accentColor: "invert(42%) sepia(37%) saturate(2761%) hue-rotate(352deg) brightness(88%) contrast(88%)" // #F6871F calculated using https://codepen.io/sosuke/pen/Pjoqqp
    },
    {
        name: "Noah G",
        review: "We just tried the green tea ice cream. My entire family agrees, it is the best green tea ice cream we have ever had!",
        backgroundColor: "#CFE4CB",
        accentColor: "invert(64%) sepia(17%) saturate(1034%) hue-rotate(172deg) brightness(87%) contrast(97%)" // #F6871F calculated using https://codepen.io/sosuke/pen/Pjoqqp
    },
    {
        name: "Victoria S",
        review: "Some of the BEST ice cream you will EVER have!!! I Love Yom!!!!",
        backgroundColor: "#FFDD77",
        accentColor: "invert(71%) sepia(84%) saturate(3484%) hue-rotate(347deg) brightness(100%) contrast(94%)" // #F6871F calculated using https://codepen.io/sosuke/pen/Pjoqqp
    }
]

export default function Reviews() {
    return (

        <div className="flex justify-center items-center max-w-screen-2xl mx-auto md:p-8">
            <div className="flex space-x-4 horizontal-scroll-container">
                {reviews.map((review, i) => (
                    <div className="scroll-item" key={i}>
                        <Card className="max-w-[18rem]">
                            <div className="flex justify-between flex-col p-4 min-h-[290px]" style={{ backgroundColor: review.backgroundColor }}>
                                <img src={QuoteIcon} className="h-8 mx-auto mb-2" style={{ filter: review.accentColor }} />
                                <p>"{review.review}"</p>
                                <p className="text-right">- {review.name}</p>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>

    )
}