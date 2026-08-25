import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
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

import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from "../api";

interface Deal {
  id: number;
  image: string;
  propertyName: string;
  location: string;
  badge: string;
  startingPrice: number;
}

function DealsPage() {
  const [form] = Form.useForm();

  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

  const loadDeals = async () => {
    try {
      setLoading(true);

      const data = await getItems("deals");

      setDeals(
        data.map((deal: any) => ({
          id: deal.id,
          image: deal.image,
          propertyName: deal.property_name,
          location: deal.location,
          badge: deal.badge,
          startingPrice: Number(deal.starting_price),
        }))
      );
    } catch (error) {
      message.error(
        error instanceof Error
          ? error.message
          : "Failed to load deals"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeals();
  }, []);

  const openAddModal = () => {
    setEditingDeal(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditModal = (deal: Deal) => {
    setEditingDeal(deal);

    form.setFieldsValue({
      image: deal.image,
      propertyName: deal.propertyName,
      location: deal.location,
      badge: deal.badge,
      startingPrice: deal.startingPrice,
    });

    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        image: values.image,
        property_name: values.propertyName,
        location: values.location,
        badge: values.badge,
        starting_price: values.startingPrice,
      };

      if (editingDeal) {
        await updateItem(
          "deals",
          editingDeal.id,
          payload
        );

        message.success("Deal updated successfully!");
      } else {
        await createItem("deals", payload);

        message.success("Deal added successfully!");
      }

      setIsModalOpen(false);
      form.resetFields();

      await loadDeals();
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteItem("deals", id);

      message.success("Deal deleted successfully!");

      await loadDeals();
    } catch (error) {
      message.error(
        error instanceof Error
          ? error.message
          : "Failed to delete deal"
      );
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img
          src={image}
          alt="property"
          style={{
            width: 100,
            height: 70,
            objectFit: "cover",
            borderRadius: 6,
          }}
        />
      ),
    },
    {
      title: "Property",
      dataIndex: "propertyName",
      key: "propertyName",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Badge",
      dataIndex: "badge",
      key: "badge",
      render: (badge: string) => (
        <Tag color="blue">{badge}</Tag>
      ),
    },
    {
      title: "Starting Price",
      dataIndex: "startingPrice",
      key: "startingPrice",
      render: (price: number) => `₹${price}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Deal) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditModal(record)}
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete this deal?"
            onConfirm={() =>
              handleDelete(record.id)
            }
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
      title="Travel Simba Exclusives"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openAddModal}
        >
          Add Deal
        </Button>
      }
    >
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={deals}
      />

      <Modal
        title={editingDeal ? "Edit Deal" : "Add Deal"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        okText={editingDeal ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Image URL"
            name="image"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Property Name"
            name="propertyName"
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
            label="Badge"
            name="badge"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Starting Price"
            name="startingPrice"
            rules={[{ required: true }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default DealsPage;