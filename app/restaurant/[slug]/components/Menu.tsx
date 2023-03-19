import { Item } from "@prisma/client"
import MenuCard from "./MenuCard"

const Menu = ({menus}:{menus:Item[]}) => {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">
          {menus.length ? 
            menus.map(menu=>
              <MenuCard key={menu.id} menu={menu}/>
            ):(
              <div>This restaurant does not have a menu</div>
            ) 
        }
        </div>
      </div>
    </main>
  )
}
export default Menu