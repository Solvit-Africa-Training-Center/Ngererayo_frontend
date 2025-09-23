import React from "react";
import { useParams } from "react-router-dom";
import MessageList from "../../components/sellerDashboard/MessageList";

const MessagePage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const token = sessionStorage.getItem("token");

  if (!productId || !token) return <p>Invalid product or token</p>;

  return <MessageList productId={parseInt(productId)} token={token} />;
};

export default MessagePage;
