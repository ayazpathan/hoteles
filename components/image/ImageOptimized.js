import React, { useState } from "react";
import Image from "next/image";

const ImageOptimized = ({ url, height, width, placeholder }) => {
  const [isImageReady, setIsImageReady] = useState(false);
  return (
    <>
      <Image
        className="explore-im"
        src={url}
        height={height}
        width={width}
        onLoad={(e) => {
          setIsImageReady(true);
        }}
      />
      {isImageReady === false && (
        <div
          className={`${placeholder} animate-img-background`}
          style={{ backgroundColor: "#FCE8E8" }}
        ></div>
      )}
    </>
  );
};

export default ImageOptimized;
