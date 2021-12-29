import React, { useState } from 'react';
import { Card, Row, Col, Form, Input, Modal, Breadcrumb, Button } from 'antd'
import { supabaseClient } from "../utils/supabase-client";
import { useLoaderData, useActionData } from "remix";

export const loader = async () => {
  const { data: group } = await supabaseClient
    .from('group')
    .select('id,name,location,description');
  return group;
};

export const action = async ({
  request
}) => {
  const formData = await request.formData();
  await createGroup(formData);
  return redirect('/group');
};

async function createGroup(formData) {
  try {
    const { data, error } = await supabaseClient
      .from('group')
      .insert([
        { name: formData.title, location: formData.location, description: formData.description }
      ])

    if(error) {
      throw error;
    }
  }
  catch(error) {
    console.log(error);
  }
}

const SubmitForm = () => {
  const onFinish = (value) => {
    console.log('Success:', value);
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      method="post"
      action="/group"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="소모임 이름"
        name="title"
        rules={[
          {
            required: true,
            message: '소모임 이름을 입력해주세요.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="소모임 장소"
        name="location"
        rules={[
          {
            required: true,
            message: '소모임 장소를 입력해주세요.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="소모임 설명"
        name="description"
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default function Index() {
  const groups = useLoaderData();
  const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

  return (
    <div>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>소모임 목록</Breadcrumb.Item>
              <Breadcrumb.Item>
                <Button onClick={showModal}>소모임 추가하기</Button>
                <Modal title="소모임 추가하기" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <SubmitForm />
                </Modal>
              </Breadcrumb.Item>
      </Breadcrumb>
        <Row>
          {groups.map(group => (
            <Col key={group.id} className="gutter-row" flex="1 0 25%" >
            <Card title={group.name} extra={<a href="#">More</a>} style={{ margin: 16 }}>
              <p>{group.location}</p>
              <p>{group.description}</p>
            </Card>
          </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
