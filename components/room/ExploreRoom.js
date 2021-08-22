import React from "react";
import ImageOptimized from "../image/ImageOptimized";

const ExploreRoom = () => {
  return (
    <section id="rooms" className="container mt-5">
      <h2 className="mb-3 ml-2 stays-heading">Explore Nearby</h2>
      <div className="row">
        <div className="explore-holder">
          <div className="explore-container">
            <div className="explore-item">
              <div className="explore-img-container">
                <ImageOptimized
                  url={"/images/Mumbai.jpg"}
                  height={80}
                  width={80}
                  placeholder={"image-placeholder"}
                />
              </div>
              <div className="explore-text-container">
                <span style={{ fontWeight: "bold" }}>Mumbai</span>
                <span>15 Minutes Drive</span>
              </div>
            </div>
          </div>

          <div className="explore-container">
            <div className="explore-item">
              <div className="explore-img-container">
                <ImageOptimized
                  url={"/images/Vadodra.jpg"}
                  height={80}
                  width={80}
                  placeholder={"image-placeholder"}
                />
              </div>
              <div className="explore-text-container">
                <span style={{ fontWeight: "bold" }}>Vadodra</span>
                <span>11 Hours Drive</span>
              </div>
            </div>
          </div>

          <div className="explore-container">
            <div className="explore-item">
              <div className="explore-img-container">
                <ImageOptimized
                  url={"/images/Daman.jpg"}
                  height={80}
                  width={80}
                  placeholder={"image-placeholder"}
                />
              </div>
              <div className="explore-text-container">
                <span style={{ fontWeight: "bold" }}>Daman</span>
                <span>1.5 Hours Drive</span>
              </div>
            </div>
          </div>

          <div className="explore-container">
            <div className="explore-item">
              <div className="explore-img-container">
                <ImageOptimized
                  url={"/images/Surat.jpg"}
                  height={80}
                  width={80}
                  placeholder={"image-placeholder"}
                />
              </div>
              <div className="explore-text-container">
                <span style={{ fontWeight: "bold" }}>Surat</span>
                <span>45 Minutes Drive</span>
              </div>
            </div>
          </div>

          <div className="explore-container">
            <div className="explore-item">
              <div className="explore-img-container">
                <ImageOptimized
                  url={"/images/Ahmedabad.jpg"}
                  height={80}
                  width={80}
                  placeholder={"image-placeholder"}
                />
              </div>
              <div className="explore-text-container">
                <span style={{ fontWeight: "bold" }}>Ahmedabad</span>
                <span>6 Hours Drive</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreRoom;
