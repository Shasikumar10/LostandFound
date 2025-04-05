
import { useEffect, useRef } from 'react';

type MapProps = {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  className?: string;
  interactive?: boolean;
};

const Map = ({ 
  latitude = 17.4065, 
  longitude = 78.5455, 
  zoom = 14,
  className = "h-[300px] w-full rounded-md overflow-hidden", 
  interactive = true 
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This is a placeholder for an actual map integration
    // In a real application, you would integrate with a map provider like Google Maps, Mapbox, etc.
    
    if (!mapRef.current) return;
    
    const mapElement = mapRef.current;
    
    // Add a simulated map background (gradient + pattern)
    mapElement.style.background = `linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)`;
    mapElement.style.position = 'relative';
    
    // Clear previous contents
    mapElement.innerHTML = '';
    
    // Create the map marker
    const marker = document.createElement('div');
    marker.style.position = 'absolute';
    marker.style.left = '50%';
    marker.style.top = '50%';
    marker.style.transform = 'translate(-50%, -50%)';
    marker.style.width = '20px';
    marker.style.height = '20px';
    marker.style.borderRadius = '50%';
    marker.style.backgroundColor = '#1E88E5';
    marker.style.border = '2px solid white';
    marker.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    
    // Add location info
    const infoBox = document.createElement('div');
    infoBox.style.position = 'absolute';
    infoBox.style.bottom = '10px';
    infoBox.style.left = '10px';
    infoBox.style.padding = '8px 12px';
    infoBox.style.backgroundColor = 'rgba(255,255,255,0.9)';
    infoBox.style.borderRadius = '4px';
    infoBox.style.fontSize = '12px';
    infoBox.style.fontWeight = 'bold';
    infoBox.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)';
    infoBox.textContent = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
    
    // Add zoom controls if interactive
    if (interactive) {
      const zoomControls = document.createElement('div');
      zoomControls.style.position = 'absolute';
      zoomControls.style.top = '10px';
      zoomControls.style.right = '10px';
      zoomControls.style.display = 'flex';
      zoomControls.style.flexDirection = 'column';
      zoomControls.style.gap = '5px';
      
      const zoomIn = document.createElement('button');
      zoomIn.textContent = '+';
      zoomIn.style.width = '30px';
      zoomIn.style.height = '30px';
      zoomIn.style.background = 'white';
      zoomIn.style.border = '1px solid #ccc';
      zoomIn.style.borderRadius = '4px';
      zoomIn.style.cursor = 'pointer';
      
      const zoomOut = document.createElement('button');
      zoomOut.textContent = '-';
      zoomOut.style.width = '30px';
      zoomOut.style.height = '30px';
      zoomOut.style.background = 'white';
      zoomOut.style.border = '1px solid #ccc';
      zoomOut.style.borderRadius = '4px';
      zoomOut.style.cursor = 'pointer';
      
      zoomControls.appendChild(zoomIn);
      zoomControls.appendChild(zoomOut);
      mapElement.appendChild(zoomControls);
    }
    
    // Create a grid pattern to simulate a map
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const grid = document.createElement('div');
        grid.style.position = 'absolute';
        grid.style.left = `${i * 10}%`;
        grid.style.top = `${j * 10}%`;
        grid.style.width = '10%';
        grid.style.height = '10%';
        grid.style.border = '1px solid rgba(0,0,0,0.05)';
        mapElement.appendChild(grid);
      }
    }
    
    // Add some road-like lines
    const road1 = document.createElement('div');
    road1.style.position = 'absolute';
    road1.style.left = '20%';
    road1.style.top = '0';
    road1.style.width = '6px';
    road1.style.height = '100%';
    road1.style.backgroundColor = 'rgba(255,255,255,0.7)';
    
    const road2 = document.createElement('div');
    road2.style.position = 'absolute';
    road2.style.left = '0';
    road2.style.top = '40%';
    road2.style.width = '100%';
    road2.style.height = '6px';
    road2.style.backgroundColor = 'rgba(255,255,255,0.7)';
    
    mapElement.appendChild(road1);
    mapElement.appendChild(road2);
    mapElement.appendChild(marker);
    mapElement.appendChild(infoBox);

    // Add "KLH Campus" label
    const campusLabel = document.createElement('div');
    campusLabel.style.position = 'absolute';
    campusLabel.style.top = '50%';
    campusLabel.style.left = '50%';
    campusLabel.style.transform = 'translate(-50%, 15px)';
    campusLabel.style.backgroundColor = 'rgba(0,0,0,0.7)';
    campusLabel.style.color = 'white';
    campusLabel.style.padding = '4px 8px';
    campusLabel.style.borderRadius = '4px';
    campusLabel.style.fontSize = '10px';
    campusLabel.style.fontWeight = 'bold';
    campusLabel.textContent = 'KLH Campus';
    
    mapElement.appendChild(campusLabel);
    
    // Note about real implementation
    const noteElement = document.createElement('div');
    noteElement.style.position = 'absolute';
    noteElement.style.bottom = '10px';
    noteElement.style.right = '10px';
    noteElement.style.padding = '4px 8px';
    noteElement.style.backgroundColor = 'rgba(255,255,255,0.9)';
    noteElement.style.borderRadius = '4px';
    noteElement.style.fontSize = '9px';
    noteElement.style.color = '#666';
    noteElement.textContent = 'Map Preview';
    
    mapElement.appendChild(noteElement);
    
  }, [latitude, longitude, zoom, interactive]);

  return <div ref={mapRef} className={className}></div>;
};

export default Map;
