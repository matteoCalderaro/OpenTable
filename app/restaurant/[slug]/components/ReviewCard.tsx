import { Review } from "@prisma/client"
import Stars from "../../../components/Stars"


const ReviewCard = ({review}:{review:Review}) => {
  return (
    <div className="border-b pb-7 mb-7">
      <div className="flex">
        <div className="w-1/6 flex flex-col items-center text-center">
          <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
            <h2 className="text-white text-2xl uppercase">
              {review.first_name[0]}{review.first_name[1]}</h2>
          </div>
          <p>{review.first_name} {review.last_name}</p>
        </div>
        <div className="ml-10 w-5/6">
          <div className="flex items-center">
            {/* <div className="flex mr-5">
              *****
            </div> */}
            <Stars rating={review.rating} reviews={[]}/>
          </div>
          <div className="mt-5">
            <p className="text-lg font-light">{review.text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ReviewCard