import React, { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Load the Google Maps API script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => {
      // Script has loaded, do something with the API
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 8,
      });
    });
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
}

export default MyComponent;
