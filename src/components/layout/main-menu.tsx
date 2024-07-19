import { Divider } from "antd";
import { Home, Monitor, Package2 } from "lucide-react";
import React from "react";
import Menu, { IMenu } from "./nav";

const mainMenuData: IMenu[] = [
  {
    id: "home",
    name: "홈",
    icon: <Home className="w-5 h-5" />,
    link: {
      path: "/",
    },
  },
  {
    id: "user",
    name: "유저 관리",
    icon: <Package2 className="w-5 h-5" />,
    submenu: [
      {
        id: "userList",
        name: "유저 목록",
        link: {
          path: "/sample/product/list",
        },
      },
    ],
  },
  {
    id: "review",
    name: "리뷰 관리",
    icon: <Package2 className="w-5 h-5" />,
    submenu: [
      {
        id: "reviewList",
        name: "리뷰 목록",
        link: {
          path: "/sample/review/list",
        },
      },
      {
        id: "reviewRecognize",
        name: "리뷰 승인",
        link: {
          path: "/sample/review/Recognize",
        },
      },
    ],
  },
  {
    id: "company",
    name: "업체 관리",
    icon: <Package2 className="w-5 h-5" />,
    submenu: [
      {
        id: "companyList",
        name: "업체 목록",
        link: {
          path: "/sample/shop/list",
        },
      },
    ],
  },
];

const devMenuData: IMenu[] = [
  {
    id: "dev",
    name: "사용 가이드",
    icon: <Monitor className="w-5 h-5" />,
    submenu: [
      {
        name: "폼",
        link: {
          path: "/sample/form",
        },
      },
    ],
  },
];

const MainMenu = () => {
  return (
    <>
      <>
        <Divider orientation="left" plain>
          메인
        </Divider>

        <Menu data={mainMenuData} />
      </>
      {/* <>
        <Divider orientation="left" plain>
          개발
        </Divider>

        <Menu data={devMenuData} />
      </> */}
    </>
  );
};

export default React.memo(MainMenu);
