import { Review } from "@prisma/client"

const calculateReviewAverage = (reviews:Review[]) => {
  if(!reviews.length) return 0  
  
  return reviews.reduce((acc,curr)=> acc += curr.rating,0)/reviews.length
}


export default calculateReviewAverage