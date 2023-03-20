import { Review } from "@prisma/client"
import calculateReviewAverage from './../../../../utils/calculateReviewAverage';
import Stars from './../../../components/Stars';

const Rating = ({reviews}:{reviews:Review[]}) => {
  const average = calculateReviewAverage(reviews)
  return (
    <div className="flex items-end">
      <div className="rating mt-2 flex items-center">
        <Stars reviews={reviews} rating={0}/>
        <p className="text-reg ml-3">{average.toFixed(1)}</p>
      </div>
      <div>
        <p className="text-reg ml-4">{reviews.length} Review{reviews.length === 1 ? '':'s'}</p>
      </div>
    </div>
  )
}
export default Rating