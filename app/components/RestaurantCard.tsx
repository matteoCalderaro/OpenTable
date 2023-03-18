import Link from "next/link"
import { RestaurantCardType } from "../page"
import Price from './Price';

interface Props {
  restaurant: RestaurantCardType
}

const RestaurantCard = ({restaurant}:Props) => {
  return (
    <div className='w-64 h-72 m-3 rounded overflow-hidden border border-gray-400 cursor-pointer'>
      <Link href={`/restaurant/${restaurant.slug}`}>
      <img className='w-full h-36' src={restaurant.main_image} alt="" />
      <div className='p-1'>
        <h3 className='font-bold text-2xl m-b2'>{restaurant.name}</h3>
        <div className='flex items-start'>
          <div className="flex mb-2">****</div>
          <div className="ml-2">77 reviews</div>
        </div>
        <div className="flex text-reg font-light capitalize">
          <p className="mr-3">{restaurant.cuisine.name}</p>
          <Price price={restaurant.price} />
          <p>{restaurant.location.name}</p>
        </div>
        <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
      </div>
      </Link>
    </div>
  )
}
export default RestaurantCard