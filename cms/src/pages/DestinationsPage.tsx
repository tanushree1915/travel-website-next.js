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

interface Destination {
  id: number;
  name: string;
  image: string;
}

function DestinationsPage() {
  const [form] = Form.useForm();

  const [items, setItems] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] =
    useState<Destination | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getItems("destinations");
      setItems(data);
    } catch (error) {
      message.error(
        error instanceof Error
          ? error.message
          : "Failed to load destinations"
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
          "destinations",
          editing.id,
          values
        );
        message.success("Destination updated!");
      } else {
        await createItem("destinations", values);
        message.success("Destination added!");
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
      await deleteItem("destinations", id);
      message.success("Destination deleted!");
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
      title: "Image",
      dataIndex: "image",
      render: (image: string) => (
        <img
          src={image}
          alt="destination"
          style={{
            width: 120,
            height: 75,
            objectFit: "cover",
            borderRadius: 6,
          }}
        />
      ),
    },
    {
      title: "Destination",
      dataIndex: "name",
    },
    {
      title: "Actions",
      render: (_: unknown, record: Destination) => (
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
            title="Delete this destination?"
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
      title="Popular Destinations"
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
          Add Destination
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
        title={editing ? "Edit Destination" : "Add Destination"}
        open={open}
        onOk={save}
        onCancel={() => setOpen(false)}
        okText={editing ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Destination Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image URL"
            name="image"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default DestinationsPage;