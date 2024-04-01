import React from "react";
import { MapInteractionCSS } from 'react-map-interaction';

export default function Image ({imgSrc}){
  return (
    <MapInteractionCSS
    showControls
      defaultValue={{
        scale: 1,
        translation: { x: 0, y: 20 }
      }}
      minScale={0.5}
      maxScale={3}
      translationBounds={{
        xMax: 400,
        yMax: 200
      }}
      >
      <img src={imgSrc} className="photo-img"/>
    </MapInteractionCSS>
  );
}