import Menu from "../components/Menu";
import RestaurantNavbar from "../components/RestaurantNavbar";
import {Item, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const fetchRestaurants = async (slug:string):Promise<Item[]> =>{
  const restaurant = await prisma.restaurant.findUnique({
    where:{
      slug
    },
    select:{
      items:true
    }
  })
  if(!restaurant){
    throw new Error()
  }

  return restaurant.items
}

const RestaurantMenu = async ({params}:{params:{slug:string}}) => {
  const menus = await fetchRestaurants(params.slug)
  
  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavbar slug={params.slug}/>
        <Menu menus={menus}/>
    </div>
  ) 
}
export default RestaurantMenu