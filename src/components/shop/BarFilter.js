import React from "react";
import icons from "../../assets/img/icon";
import { CheckBar } from "../shop/checkbar";

const { IoIosArrowDown } = icons;

const listShop = ["Rings", "Necklace", "Earrings", "Jewelry"];
const listSort = ["Giá tăng dần", "Giá giảm dần", "Mới nhất"];

const BarFilter = ({ title, filters, setFilters }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleShopChange = (item) => {
    const current = filters.shopby;
    const newList = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];
    setFilters((prev) => ({ ...prev, shopby: newList }));
  };

  const handleSortChange = (item) => {
    setFilters((prev) => ({ ...prev, sortby: item }));
  };

  const isChecked = (item) => {
    if (title === "shopby") return filters.shopby.includes(item);
    if (title === "sortby") return filters.sortby === item;
    return false;
  };
  return (
    <div className={title}>
      <div className={`${title}-title filter-bar`} onClick={handleToggle}>
        {title === "shopby" ? "Shop By" : "Sort By"}
        <IoIosArrowDown />
      </div>
      {isOpen && (
        <div className={`${title}-content item-content`}>
          {(title === "shopby" ? listShop : listSort).map((item, idx) => (
            <CheckBar
              key={idx}
              title={title}
              item={item}
              checked={isChecked(item)}
              onChange={
                title === "shopby" ? handleShopChange : handleSortChange
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BarFilter;
