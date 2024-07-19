import { Up, Down } from '../../images/drawer';
import { useSelector } from 'react-redux';
import { selectDrawer } from '../../store/drawer/drawerSlice';

const MenuIcon = ({ menu, type, length, index }: { menu: any; type: any; length: number; index: number }) => {
  const indexClass = length === 0 ? 'pt-2' : '';
  const subMenuClass = `ml-5 gap-2 ` + indexClass;
  const menuClass = ' gap-3';

  const drawer = useSelector(selectDrawer);

  return (
    <div className={`flex items-center w-full justify-between ${type === 'menu' ? menuClass : subMenuClass}`}>
      <div className="w-full flex gap-2">
        {type === 'menu' ? (
          menu?.icon
        ) : (
          <div>
            <div className={`${length === index && 'rounded-bl'} w-4 border-b border-l border-secondary h-4`}></div>

            <div className={`${length !== index && 'border-l border-secondary'} w-4  h-4`}></div>
          </div>
        )}

        <span className="text-[0.65rem] sm:text-xs whitespace-nowrap">{menu.name}</span>
      </div>
      {menu?.options?.length > 0 && (
        <div className={`transition-all ${drawer.expendMenu && menu.key === drawer.expendKey ? 'rotate-180' : ''}`}>
          <Down />
        </div>
      )}
    </div>
  );
};

export default MenuIcon;
