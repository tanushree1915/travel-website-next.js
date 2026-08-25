import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  message,
} from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from "../api";

interface Hero {
  id: number;
  heading: string;
  subheading: string;
  background_image: string;
}

function HeroPage() {
  const [form] = Form.useForm();

  const [items, setItems] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] =
    useState<Hero | null>(null);

  const load = async () => {
    try {
      setLoading(true);

      const data = await getItems("hero");

      setItems(data);
    } catch (error) {
      message.error(
        error instanceof Error
          ? error.message
          : "Failed to load hero banners"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    try {
      const values = await form.validateFields();

      if (editing) {
        await updateItem(
          "hero",
          editing.id,
          values
        );

        message.success("Hero banner updated!");
      } else {
        await createItem("hero", values);

        message.success("Hero banner added!");
      }

      setOpen(false);
      form.resetFields();

      await load();
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      }
    }
  };

  const remove = async (id: number) => {
    try {
      await deleteItem("hero", id);

      message.success("Hero banner deleted!");

      await load();
    } catch (error) {
      message.error(
        error instanceof Error
          ? error.message
          : "Failed to delete"
      );
    }
  };

  const columns = [
    {
      title: "Background",
      dataIndex: "background_image",
      render: (image: string) => (
        <img
          src={image}
          alt="hero"
          style={{
            width: 140,
            height: 80,
            objectFit: "cover",
            borderRadius: 6,
          }}
        />
      ),
    },
    {
      title: "Heading",
      dataIndex: "heading",
    },
    {
      title: "Subheading",
      dataIndex: "subheading",
      ellipsis: true,
    },
    {
      title: "Actions",
      render: (_: unknown, record: Hero) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditing(record);
              form.setFieldsValue(record);
              setOpen(true);
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete this hero banner?"
            onConfirm={() => remove(record.id)}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Hero Banner"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          Add Hero
        </Button>
      }
    >
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={items}
      />

      <Modal
        title={editing ? "Edit Hero" : "Add Hero"}
        open={open}
        onOk={save}
        onCancel={() => setOpen(false)}
        width={650}
        okText={editing ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Heading"
            name="heading"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Subheading"
            name="subheading"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Background Image URL"
            name="background_image"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default HeroPage;