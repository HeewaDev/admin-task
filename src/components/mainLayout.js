import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { BiSolidDashboard } from "react-icons/bi";
import { BiSolidStore } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { AiFillDropboxCircle } from "react-icons/ai";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { Layout, Menu, Button } from "antd";

const { Header, Sider, Content } = Layout;

const colorBgContainer = "#ffffff";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <h2 className="text-white fs-5 text-center py-3 mb-0">
          {" "}
          <span className="lg-logo"> Admin Panel</span>
        </h2>

        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "dashboard",
              icon: <BiSolidDashboard className="fs-4" />,
              label: "Dashboard",
              children: [
                {
                  key: "stores",
                  icon: <BiSolidStore className="fs-4" />,
                  label: "Stores",
                },
                {
                  key: "categories",
                  icon: <MdCategory className="fs-4" />,
                  label: "Categories",
                },

                {
                  key: "catalog",
                  icon: <AiFillDropboxCircle className="fs-4" />,
                  label: "Catalog",
                  children: [
                    {
                      key: "product",
                      icon: <AiOutlineAppstoreAdd className="fs-4" />,
                      label: "Add Products",
                    },

                    {
                      key: "product-list",
                      icon: <FaClipboardList className="fs-4" />,
                      label: "Products List",
                    },

                    {
                      key: "brand",
                      icon: <SiBrandfolder className="fs-4" />,
                      label: "Brand",
                    },

                    {
                      key: "brand-list",
                      icon: <FaClipboardList className="fs-4" />,
                      label: "Brand List",
                    },

                    {
                      key: "category",
                      icon: <AiOutlineAppstoreAdd className="fs-4" />,
                      label: "Add Category",
                    },

                    {
                      key: "category-list",
                      icon: <FaClipboardList className="fs-4" />,
                      label: "List Category",
                    },
                  ],
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
