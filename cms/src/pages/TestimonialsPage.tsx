import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Rate,
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

interface Testimonial {
  id: number;
  name: string;
  location: string;
  star_rating: number;
  review_text: string;
}

function TestimonialsPage() {
  const [form] = Form.useForm();

  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] =
    useState<Testimonial | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getItems("testimonials");
      setItems(data);
    } catch (error) {
      message.error(
        error instanceof Error
          ? error.message
          : "Failed to load testimonials"
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
          "testimonials",
          editing.id,
          values
        );
        message.success("Testimonial updated!");
      } else {
        await createItem("testimonials", values);
        message.success("Testimonial added!");
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
      await deleteItem("testimonials", id);
      message.success("Testimonial deleted!");
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Rating",
      dataIndex: "star_rating",
      render: (rating: number) => (
        <Rate disabled value={rating} />
      ),
    },
    {
      title: "Review",
      dataIndex: "review_text",
      ellipsis: true,
    },
    {
      title: "Actions",
      render: (_: unknown, record: Testimonial) => (
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
            title="Delete this testimonial?"
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
      title="Testimonials"
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
          Add Testimonial
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
        title={
          editing
            ? "Edit Testimonial"
            : "Add Testimonial"
        }
        open={open}
        onOk={save}
        onCancel={() => setOpen(false)}
        width={650}
        okText={editing ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Star Rating"
            name="star_rating"
            rules={[{ required: true }]}
          >
            <InputNumber
              min={1}
              max={5}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Review"
            name="review_text"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default TestimonialsPage;