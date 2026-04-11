const LecturePlayer = ({ video }) => {
  const getEmbedUrl = (url) => {
    if (!url) return "";

    if (url.includes("youtube.com/embed/")) {
      return url;
    }

    try {
      const parsedUrl = new URL(url);
      const shortId = parsedUrl.hostname.includes("youtu.be")
        ? parsedUrl.pathname.slice(1)
        : parsedUrl.searchParams.get("v");

      if (shortId) {
        return `https://www.youtube.com/embed/${shortId}`;
      }
    } catch (error) {
      return url;
    }

    return url;
  };

  const embedUrl = getEmbedUrl(video);

  return (
    <div className="aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-cyan-950/40">

      <iframe
        src={embedUrl}
        title="Lecture"
        className="w-full h-full"
        allowFullScreen
      />

    </div>
  );
};

export default LecturePlayer;
