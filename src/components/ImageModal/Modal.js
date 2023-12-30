import React from "react";

import { Modal, ModalManager, Effect } from "react-dynamic-modal";
export const MyModal = ({ text, onRequestClose, data }) => {
  console.log(data);

  const image = data.reviewImages.forEach((image) => {
    console.log(image.url);
  });
  return (
    <Modal onRequestClose={onRequestClose} effect={Effect.Fall}>
      <div style={{ padding: 16 }}>
        <h1>What you input: {text}</h1>
        <div
          style={{
            overflow: "auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {data.reviewImages.map((images, index) => (
            <img
              key={index}
              src={images.url}
              alt={`Review Image ${index}`}
              height={220}
              width={220}
            />
          ))}
        </div>

        <button onClick={ModalManager.close}>Close Modal</button>
      </div>
    </Modal>
  );
};
