import React from 'react';

interface Category {
  label: string;
  value:string,
  categories?: Category[];
}

const menu: Category[] = [
  {
    label: 'Default',
    value: 'mapper'
  },
];

interface Menu {
  onClick: (value: string) => void;
}

const Menu: React.FunctionComponent<Menu> = (props: Menu) => {
  const [selected, updateSelection] = React.useState<string>(menu[0].value);
  const { onClick } = props;

  const handleOnClick = (value: string): void => {
    updateSelection(value);
    onClick(value)
  };

  const renderCategories = (categories: Category[]): React.ReactNode => (
    <ul className="menu-category">
      {categories.map(({ label, value }, idx) => (
        <React.Fragment>
          <li key={`${value}-${idx}`} className={selected == value && 'active'}>
            <span
              onClick={(e) => {
                e.preventDefault();
                handleOnClick(value);
              }}
            >
              {label}
            </span>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );

  return <div className="menu-container">{renderCategories(menu)}</div>;
};

export type { Menu };
export default Menu;
