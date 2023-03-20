import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import Link from "next/link"
import Price from './../../components/Price';
import calculateReviewAverage from './../../../utils/calculateReviewAverage';
import Stars from './../../components/Stars';


interface Restaurant {
    id: number;
    name: string;
    main_image: string;
    price: PRICE;
    location: Location;
    cuisine: Cuisine;
    slug: string;
    reviews : Review[]
}


const RestaurantCard = ({restaurant}:{restaurant: Restaurant}) => {

  const renderRatingText = () => {
    const average = calculateReviewAverage(restaurant.reviews)
    if(average > 4 ) return 'Awesome'
    else if(average > 3 && average <=4 ) return 'Good'
    else if(average > 0 && average <=3 ) return 'Average'
    else ''
  }
  
  return (
    <div className="border-b flex pb-5 ml-4">
      <img src={restaurant.main_image} alt="" className='w-44 rounded h-36'/>
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Stars reviews={restaurant.reviews}/>
          </div>
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price}/>
            <div className="mr-4 capitalize">{restaurant.cuisine.name}</div>
            <div className="mr-4 capitalize">{restaurant.location.name}</div>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>View more information</Link>
        </div>
      </div>
   
    </div>
  )
}
export default RestaurantCard