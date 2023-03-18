import Header from "./components/Header"
import RestaurantCard from "./components/RestaurantCard"
import SearchSideBar from "./components/SearchSideBar"
import { Location, PrismaClient, Cuisine, PRICE } from '@prisma/client';

const prisma = new PrismaClient()

const fetchRestaurantPerCity = (city:string | undefined) => {
  const select = {
    id:true,
    name:true,
    main_image:true,
    price:true,
    location: true,
    cuisine: true,
    slug:true
  }
  if(!city) return prisma.restaurant.findMany({select})
  return prisma.restaurant.findMany({
    where : {
      location: {
        name : {
          equals:city.toLocaleLowerCase()
        }
      }
    },
    select
  })
}


const Search = async ({searchParams}:{searchParams:{city:string}}) => {
  const restaurants = await fetchRestaurantPerCity(searchParams.city)
  console.log(restaurants);
  

  return (
    <>
      <Header/>
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          <SearchSideBar/>
          <div className="w-5/6">
            {restaurants.length ? 
            restaurants.map(restaurant=>(
              <RestaurantCard restaurant={restaurant}/>
            ))  : (
              <div>Sorry, we found no restaurants in this area</div>
            )
          }
          </div>
      </div>

    </>
  )
}
export default Search