const VideoEmbed = ({ imdbId, season, episode }) => {
    let src = `https://www.2embed.skin/embedtv/${imdbId}&s=${season}&e=${episode}`;
  
    return (
      <div className="video-container" style={{ position: "relative", paddingTop: "56.25%" }}>
        <iframe
          src={src}
          title="TV Show Episode"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "0"
          }}
          allowFullScreen
          scrolling="no"
          sandbox="allow-same-origin allow-scripts"
        ></iframe>
      </div>
    );
  };
  
export default VideoEmbed;
  