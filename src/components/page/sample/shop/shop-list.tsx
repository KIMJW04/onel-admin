import { useShops } from "@/client/sample/shop";
import DefaultTable from "@/components/shared/ui/default-table";
import DefaultTableBtn from "@/components/shared/ui/default-table-btn";
import { Alert, Button, Dropdown, Popconfirm } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Download } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const ShopList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const router = useRouter();
  const { data, error } = useShops(router.query); // useShops 훅 사용
  const isLoading = !data && !error;

  useEffect(() => {
    if (data) {
      console.log('Fetched Data:', data);
    } else if (error) {
      console.error('Error fetching data:', error);
    }
  }, [data, error]);

  // 데이터와 관련된 변수를 명시적으로 선언
  const items = data?.items || [];
  const total = data?.total || 0;

  const handleChangePage = useCallback(
    (pageNumber: number) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: pageNumber },
      });
    },
    [router]
  );

  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const modifyDropdownItems = useMemo(
    () => [
      {
        key: "statusUpdate",
        label: <a onClick={() => console.log(selectedRowKeys)}>상태수정</a>,
      },
    ],
    [selectedRowKeys]
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<any> = [
    {
      key: "action",
      width: 120,
      align: "center" as const,
      render: (_value: any, record: any): JSX.Element => {
        return (
          <span className="flex justify-center gap-2">
            <Link
              href={{
                pathname: `/sample/shop/edit/${record._id}`,
                query: { data: JSON.stringify(record) }
              }}
              className="px-2 py-1 text-sm btn"
            >
              수정
            </Link>
            <Popconfirm
              title="업체를 삭제하시겠습니까?"
              onConfirm={() => alert("삭제")}
              okText="예"
              cancelText="아니오"
            >
              <a className="px-2 py-1 text-sm btn">삭제</a>
            </Popconfirm>
          </span>
        );
      },
    },
    {
      title: "업체",
      dataIndex: "search_url",
      key: "search_url",
      align: "center" as const,
      width: 100,
      render: (value: string, record: any): JSX.Element => {
        return <a href={value} target="_blank" rel="noopener noreferrer">{record.title}</a>;
      },
    },
    {
      title: "주소",
      dataIndex: "addresses",
      key: "addresses",
      render: (value: string, record: any): JSX.Element => {
        return (
          <span>
            <span className="px-2 py-1 mr-1 bg-gray-100 rounded">{record.category}</span>
            <span>{value}</span>
          </span>
        );
      },
    },
    {
      title: "고유코드",
      dataIndex: "_id",
      key: "_id",
      width: 100,
    },
    {
      title: "영업상태",
      dataIndex: "status",
      key: "status",
      align: "center" as const,
      width: 100,
      render: (value: string): JSX.Element => {
        return <span>{value === "0" ? "운영중지" : value === "2" ? "폐업" : "운영중"}</span>;
      },
    },
    {
      title: "생성일시",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center" as const,
      width: 120,
      render: (value: string): JSX.Element => {
        return (
          <div className="text-sm">
            <span className="block">{dayjs(value).format("YYYY/MM/DD")}</span>
            <span className="block">{dayjs(value).format("hh:mm")}</span>
          </div>
        );
      },
    },
    {
      title: "수정일시",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center" as const,
      width: 120,
      render: (value: string): JSX.Element => {
        return (
          <div className="text-sm">
            <span className="block">{dayjs(value).format("YYYY/MM/DD")}</span>
            <span className="block">{dayjs(value).format("hh:mm")}</span>
          </div>
        );
      },
    },
  ];

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" />;
  }

  return (
    <>
      <DefaultTableBtn className="justify-between">
        <div>
          <Dropdown disabled={!hasSelected} menu={{ items: modifyDropdownItems }} trigger={["click"]}>
            <Button>일괄수정</Button>
          </Dropdown>

          <span style={{ marginLeft: 8 }}>{hasSelected ? `${selectedRowKeys.length}건 선택` : ""}</span>
        </div>

        <div className="flex-item-list">
          <Button className="btn-with-icon" icon={<Download />}>
            엑셀 다운로드
          </Button>
          <Button type="primary" onClick={() => router.push("/sample/shop/new")}>
            업체등록
          </Button>
        </div>
      </DefaultTableBtn>

      <DefaultTable
        rowSelection={rowSelection}
        columns={columns}
        dataSource={items.map((item, index) => ({ ...item, key: index }))} // 고유한 키 설정
        loading={isLoading}
        pagination={{
          current: Number(router.query.page || 1),
          defaultPageSize: 50, // 한 번에 불러올 데이터 수를 50으로 설정
          total: total,
          showSizeChanger: false,
          onChange: handleChangePage,
        }}
        className="mt-3"
        countLabel={total}
      />
    </>
  );
};

export default React.memo(ShopList);
