// src/pages/sample/shop/edit/[id].tsx
import { useShop } from "@/client/sample/shop";
import { IDefaultLayoutPage, IPageHeader, getDefaultLayout } from "@/components/layout/default-layout";
import ShopForm from "@/components/page/sample/shop/shop-form";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const pageHeader: IPageHeader = {
  title: "업체 수정",
};

const ShopEditPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading, isValidating } = useShop(id as string);
  const [initialValues, setInitialValues] = useState<any>(null);

  useEffect(() => {
    if (data) {
      console.log(data); // 데이터 확인
      // 데이터를 적절히 변환하여 initialValues에 설정
      const { _id, search_url, title, category, addresses, status, introduction, operating_hours, facilities } = data.data;
      setInitialValues({
        _id,
        search_url,
        title,
        category,
        addresses,
        introduction: introduction || "",
        operating_hours: Object.entries(operating_hours).map(([day, hours]) => `${day}: ${hours}`).join('\n'),
        facilities: facilities.join(', '), // Assuming facilities is an array, join it into a string
        status: status === 1 ? "OPEN" : status === 0 ? "CLOSED" : "SUSPENDED",
      });
    }
  }, [data]);

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data && (isLoading || isValidating)) {
    return <Skeleton className="my-5" />;
  }

  return <ShopForm id={id as string} initialValues={initialValues} />;
};

ShopEditPage.getLayout = getDefaultLayout;
ShopEditPage.pageHeader = pageHeader;

export default ShopEditPage;
