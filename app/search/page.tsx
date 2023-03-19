import Header from "./components/Header"
import RestaurantCard from "./components/RestaurantCard"
import SearchSideBar from "./components/SearchSideBar"
import { Location, PrismaClient, Cuisine, PRICE } from '@prisma/client';


const prisma = new PrismaClient()

interface SearchParams {
  city?:string,
  cuisine?:string,
  price?: PRICE
}

const fetchRestaurantPerCity = (searchParams:SearchParams) => {
  
  const select = {
    id:true,
    name:true,
    main_image:true,
    price:true,
    location: true,
    cuisine: true,
    slug:true
  }
  
  const where: any = {}
  if(searchParams.city){
    const location = {
      name:{
        equals:searchParams.city.toLowerCase()
      }
    }
    where.location = location
  }
  if(searchParams.cuisine){
    const cuisine = {
      name:{
        equals:searchParams.cuisine.toLowerCase()
      }
    }
    where.cuisine = cuisine
  }
  if(searchParams.price){
    const price = {
        equals:searchParams.price
    }
    where.price = price
  }

  return prisma.restaurant.findMany({
    where,
    select
  })
}

const fetchLocations = () => {
  return prisma.location.findMany()
}
const fetchCuisine = () => {
  return prisma.cuisine.findMany()
}

const Search = async (
  {searchParams
  }:{
    searchParams:SearchParams
  }) => {
  
  const restaurants = await fetchRestaurantPerCity(searchParams)

  const locations = await fetchLocations()
  const cuisines = await fetchCuisine()
  
  return (
    <>
      <Header/>
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          <SearchSideBar locations={locations} cuisines={cuisines} searchParams={searchParams}/>
          <span className="w-5/6">
            {restaurants.length ? 
            restaurants.map(restaurant=>(
              <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
            ))  : (
              <div>Sorry, we found no restaurants in this area</div>
            )
          }
          </span>
      </div>

    </>
  )
}
export default Search