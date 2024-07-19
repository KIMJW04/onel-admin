// components/page/sample/shop/shop-form.tsx
import { IShopFormValue, createShop, updateShop } from "@/client/sample/shop";
import QuillEditor from "@/components/shared/form/control/quill-editor";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import { Button, Divider, Form, Input, Radio, Select, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";

interface IShopFormProps {
  id?: string;
  initialValues?: Partial<IShopFormValue>;
}

const ShopForm = ({ id, initialValues }: IShopFormProps) => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleFinish = async (formValue: IShopFormValue) => {
    try {
      setIsLoading(true);

      if (id) {
        await updateShop(id, formValue);
        messageApi.success("수정되었습니다");
      } else {
        await createShop(formValue);
        messageApi.success("생성되었습니다");
      }
    } catch (e: unknown) {
      messageApi.error("에러가 발생했습니다");
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  return (
    <>
      {contextHolder}
      <DefaultForm<IShopFormValue>
        form={form}
        initialValues={initialValues}
        onFinish={handleFinish}
      >
        <FormSection title="기본정보" description="업체 기본 정보를 입력해주세요">
          <FormGroup title="운영상태*">
            <Form.Item name="status" rules={[{ required: true, message: "필수값입니다" }]}>
              <Radio.Group>
                <Radio value="OPEN">운영중</Radio>
                <Radio value="CLOSED">폐업</Radio>
                <Radio value="SUSPENDED">운영중지</Radio>
              </Radio.Group>
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="카테고리*">
            <Form.Item name="category" rules={[{ required: true, message: "필수값입니다" }]}>
              <Select style={{ maxWidth: 200 }} placeholder="카테고리를 선택하세요">
                <Select.Option value="salon">미용실</Select.Option>
              </Select>
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="업체명*">
            <Form.Item name="title" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="업체명을 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="업체코드*">
            <Form.Item name="_id" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="업체코드를 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="주소*">
            <Form.Item name="addresses" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="주소를 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="플레이스*">
            <Form.Item name="search_url" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="플레이스 주소를 입력하세요" />
            </Form.Item>
          </FormGroup>
        </FormSection>

        <FormSection title="업체소개" description="업체 소개 정보를 입력해주세요">
          <FormGroup title="업체소개">
            <Form.Item name="introduction">
              <QuillEditor />
            </Form.Item>
          </FormGroup>
        </FormSection>

        <FormSection title="운영시간" description="운영 정보를 입력해주세요">
          <FormGroup title="운영시간">
            <Form.Item name="operating_hours">
              <Input.TextArea placeholder="운영시간을 입력하세요" rows={6} />
            </Form.Item>
          </FormGroup>
        </FormSection>

        <FormSection title="편의시설" description="편의시설 정보를 입력해주세요">
          <FormGroup title="편의시설">
            <Form.Item name="facilities">
              <Input.TextArea placeholder="편의시설을 입력하세요" rows={4} />
            </Form.Item>
          </FormGroup>
        </FormSection>

        <div className="text-center">
          <Button htmlType="submit" type="primary" loading={isLoading}>
            저장
          </Button>
        </div>
      </DefaultForm>
    </>
  );
};

export default React.memo(ShopForm);
