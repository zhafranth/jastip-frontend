import React from "react";
import { Card } from "antd";

export default function CardPost({ title, desc, price, onRemove, onUpdate }) {
  const { Meta } = Card;

  return (
    <Card
      hoverable
      cover={<img src="https://placeimg.com/220/220/people"></img>}
      className="card-style"
    >
      <Meta title={title} description={desc}></Meta>
      <h5>{price}</h5>
      <div className="button-wrapper">
        <div className="button-del" onClick={onRemove}>
          Hapus
        </div>
        <div className="button-upd" onClick={onUpdate}>
          Update
        </div>
      </div>
    </Card>
  );
}
