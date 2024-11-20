import { twMerge } from 'tailwind-merge';
import { MenuItem } from '../../constants/menu';
import SidebarButton from './SideBarButton';

type SidebarProps = {
  menuItems: MenuItem[];
  replaceHistory?: boolean;
  hideSidebarMobile?: boolean;
} & Pick<React.HTMLAttributes<HTMLElement>, 'className'>;

export default function Sidebar({
  menuItems,
  replaceHistory,
  className,
  hideSidebarMobile
}: SidebarProps) {
  return (
    <aside
      className={twMerge(
        'h-full bg-content1 overflow-hidden flex-col',
        hideSidebarMobile
          ? 'hidden lg:flex w-unit-64'
          : 'flex w-unit-32 lg:w-unit-64',
        className
      )}
    >
      <div className="flex flex-col justify-center mb-auto">
        {menuItems.map((item, index) => (
          <SidebarButton
            key={`${item.path}-${index}`}
            href={item.path}
            startContent={item.icon}
            replace={replaceHistory}
            id={item.tourId}
          >
            {item.text}
            {item.betaIcon}
          </SidebarButton>
        ))}
      </div>
    </aside>
  );
}
