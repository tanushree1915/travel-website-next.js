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

interface Promo {
  id: number;
  badge_label: string;
  headline: string;
  background_image: string;
  link: string;
}

function PromosPage() {
  const [form] = Form.useForm();

  const [items, setItems] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] =
    useState<Promo | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getItems("promos");
      setItems(data);
    } catch (error) {
      message.error(
        error instanceof Error
          ? error.message
          : "Failed to load promos"
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
        await updateItem("promos", editing.id, values);
        message.success("Promo updated!");
      } else {
        await createItem("promos", values);
        message.success("Promo added!");
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
      await deleteItem("promos", id);
      message.success("Promo deleted!");
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
          alt="promo"
          style={{
            width: 120,
            height: 70,
            objectFit: "cover",
            borderRadius: 6,
          }}
        />
      ),
    },
    {
      title: "Badge",
      dataIndex: "badge_label",
    },
    {
      title: "Headline",
      dataIndex: "headline",
    },
    {
      title: "Link",
      dataIndex: "link",
    },
    {
      title: "Actions",
      render: (_: unknown, record: Promo) => (
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
            title="Delete this promo?"
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
      title="Promo Banners"
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
          Add Promo
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
        title={editing ? "Edit Promo" : "Add Promo"}
        open={open}
        onOk={save}
        onCancel={() => setOpen(false)}
        width={650}
        okText={editing ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Badge Label"
            name="badge_label"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Headline"
            name="headline"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Background Image URL"
            name="background_image"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Link"
            name="link"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default PromosPage;