import { useEffect, useState } from "react";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  message,
} from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";

import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from "../api";

interface Insight {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  tags: string;
  date: string;
}

function InsightsPage() {
  const [form] = Form.useForm();

  const [items, setItems] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] =
    useState<Insight | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getItems("insights");
      setItems(data);
    } catch (error) {
      message.error(
        error instanceof Error
          ? error.message
          : "Failed to load insights"
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

      const payload = {
        title: values.title,
        excerpt: values.excerpt,
        image: values.image,
        tags: values.tags,
        date: values.date.format("YYYY-MM-DD"),
      };

      if (editing) {
        await updateItem(
          "insights",
          editing.id,
          payload
        );
        message.success("Insight updated!");
      } else {
        await createItem("insights", payload);
        message.success("Insight added!");
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
      await deleteItem("insights", id);
      message.success("Insight deleted!");
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
          alt="insight"
          style={{
            width: 110,
            height: 70,
            objectFit: "cover",
            borderRadius: 6,
          }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Excerpt",
      dataIndex: "excerpt",
      ellipsis: true,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      render: (tags: string) =>
        tags.split(",").map((tag) => (
          <Tag key={tag.trim()}>
            {tag.trim()}
          </Tag>
        )),
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Actions",
      render: (_: unknown, record: Insight) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditing(record);

              form.setFieldsValue({
                ...record,
                date: dayjs(record.date),
              });

              setOpen(true);
            }}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete this insight?"
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
      title="Latest Insights & Updates"
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
          Add Insight
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
        title={editing ? "Edit Insight" : "Add Insight"}
        open={open}
        onOk={save}
        onCancel={() => setOpen(false)}
        width={700}
        okText={editing ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Excerpt"
            name="excerpt"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Image URL"
            name="image"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tags"
            name="tags"
            rules={[{ required: true }]}
          >
            <Input placeholder="Travel, Goa, Holiday" />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true }]}
          >
            <DatePicker
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default InsightsPage;