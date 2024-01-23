// UVInfo.js
import React from 'react';

const UVInfo = ({ uvIntensity, uvLocation }) => {
  return (
    <div className="uv-info">
      <p className="mb-3">Intensidad UV: {uvIntensity}</p>
      <p className="mb-3">Localizacion: {uvLocation}</p>
    </div>
  );
};

export default UVInfo;
