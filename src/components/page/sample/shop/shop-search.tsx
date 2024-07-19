import DateRangeField from "@/components/shared/form/control/date-range-field";
import DefaultSearchForm from "@/components/shared/form/ui/default-search-form";
import FieldInline from "@/components/shared/form/ui/field-inline";
import FormSearch from "@/components/shared/form/ui/form-search";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

interface FormValue {
  searchDateType?: string;
  searchDatePeriod?: [string, string];
  status?: string[];
  searchType?: string;
  searchText?: string;
  shopCode?: string;
}

const statusOptions = [
  { label: "운영중", value: "1" },
  { label: "폐업", value: "2" },
  { label: "운영중지", value: "0" }
];

const UserSearch = () => {
  const [form] = useForm();
  const router = useRouter();

  const handleFinish = useCallback(
    (formValue: FormValue) => {
      // 상태 값을 숫자로 변환하여 쿼리에 추가
      const formattedFormValue = {
        ...formValue,
        status: formValue.status ? formValue.status.map(Number) : undefined,
      };

      router.push({
        pathname: router.pathname,
        query: { ...router.query, ...formattedFormValue, page: 1 }, // 페이지를 1로 초기화
      });
    },
    [router]
  );

  const handleReset = useCallback(() => {
    form.resetFields();
    router.push({
      pathname: router.pathname,
      query: {},
    });
  }, [form, router]);

  return (
    <DefaultSearchForm form={form} onFinish={handleFinish}>
      <FormSearch>
        <FieldInline>
          <Form.Item label="기간" name="searchDateType" initialValue="created">
            <Select popupMatchSelectWidth={false}>
              <Select.Option value="created">등록일자</Select.Option>
              <Select.Option value="updated">수정일자</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="searchDatePeriod">
            <DateRangeField />
          </Form.Item>
        </FieldInline>
        <div>
          <Form.Item name="status" label="영업상태">
            <Checkbox.Group options={statusOptions} />
          </Form.Item>
        </div>
        <div>
          <FieldInline>
            <Form.Item label="검색조건" name="searchType" initialValue="shopName">
              <Select popupMatchSelectWidth={false}>
                <Select.Option value="shopName">업체명</Select.Option>
                <Select.Option value="shopAdd">업체주소</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="searchText" className="grow">
              <Input placeholder="검색어를 입력해주세요" />
            </Form.Item>
          </FieldInline>
        </div>
        <div>
          <Form.Item name="shopCode" label="업체번호">
            <Input placeholder="업체 번호를 입력해주세요" />
          </Form.Item>
        </div>
      </FormSearch>
      <div className="flex justify-center gap-2">
        <Button htmlType="submit" className="btn-with-icon" icon={<Search />}>
          검색
        </Button>
        <Button htmlType="button" className="btn-with-icon" onClick={handleReset}>
          초기화
        </Button>
      </div>
    </DefaultSearchForm>
  );
};

export default React.memo(UserSearch);
