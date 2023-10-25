import type { HomePageSection } from "~/data/contentful";
import RichTextResponse from "../shared/richText";

export default function HomeSection(data: HomePageSection) {
  const { media, textColor, title, body } = data;
  const mediaContainer = media.contentType?.includes("video") ? (
    <video width={375} controls>
      <source src={media.url} type={media.contentType} />
    </video>
  ) : (
    <img
      src={media.url}
      alt={media.description || "Latinos en Pizza"}
      style={{ margin: "auto", maxHeight: "500px" }}
    />
  );

  if (data.leftAlign) {
    return (
      <>
        <div className="flex items-center flex-col my-5 w-full md:w-3/6 ">
          <h1
            className="text-4xl md:text-5xl text-center"
            style={{ color: textColor }}
          >
            {title}
          </h1>
          <p
            className={`text-2xl text-center pt-4`}
            style={{ whiteSpace: "pre-wrap", color: textColor }}
          >
            {RichTextResponse(body)}
          </p>
        </div>
        <div className="flex items-center my-5 w-full md:w-2/6 ">
          {mediaContainer}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex items-center justify-center my-5 w-full md:w-2/6 ">
          {mediaContainer}
        </div>
        <div className="flex items-center flex-col my-5 w-full md:w-3/6 ">
          <h1
            className="text-4xl md:text-5xl text-center"
            style={{ color: textColor }}
          >
            {title}
          </h1>
          <p
            className={`text-2xl text-center pt-4`}
            style={{ whiteSpace: "pre-wrap", color: textColor }}
          >
            {RichTextResponse(body)}
          </p>
        </div>
      </>
    );
  }
}
