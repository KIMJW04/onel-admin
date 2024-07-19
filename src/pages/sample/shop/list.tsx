import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import ShopList from "@/components/page/sample/shop/shop-list";
import ShopSearch from "@/components/page/sample/shop/shop-search";

const pageHeader: IPageHeader = {
  title: "업체 목록",
};

const shopListPage: IDefaultLayoutPage = () => {
  return (
    <>
      <ShopSearch />
      <ShopList />
    </>
  );
};

shopListPage.getLayout = getDefaultLayout;
shopListPage.pageHeader = pageHeader;

export default shopListPage;
