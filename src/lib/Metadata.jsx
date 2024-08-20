import { Helmet } from "react-helmet-async";

export const Metadata = ({
  title = "Your Project's name",
  description = "Add default description here",
  author = "Default Author",
  keywords = "Add default keywords here",
  thumbnail = "Add default thumbnail here",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="keywords" content={keywords} />
      <meta name="thumbnail" content={thumbnail} />

      {/* Open Graph Meta Tags */}
      <meta property="og:url" content={window.location.href} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={thumbnail} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={thumbnail} />
    </Helmet>
  );
};
