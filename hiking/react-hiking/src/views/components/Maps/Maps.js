export const Maps = ({lat, lon}) => {
    //key is IP restricted
    const GOOGLE_MAPS_EMBED_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_EMBED_API_KEY;
    return (
        <div><iframe
        width="300"
        height="300"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={"https://www.google.com/maps/embed/v1/view?key=" + GOOGLE_MAPS_EMBED_API_KEY + 
            "&center=" + lat + "," + lon + "&zoom=18&maptype=satellite"}>
      </iframe></div>
    );
}
