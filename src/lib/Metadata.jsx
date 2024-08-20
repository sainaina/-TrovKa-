import React from "react";
import { Helmet } from "react-helmet";
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
      <meta property="og:url" content={""} />
      <meta property="og:type" content={"Service Listing Platform"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={thumbnail} />
    </Helmet>
  );
};

