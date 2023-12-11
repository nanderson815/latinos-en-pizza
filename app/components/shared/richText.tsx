import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

const renderOptions = (links: any) => {
  // create an asset map
  const assetMap = new Map();
  if (links) {
    // loop through the assets and add them to the map
    for (const asset of links.assets.block) {
      assetMap.set(asset.sys.id, asset);
    }
  }
  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any, children: any) => {
        // find the asset in the assetMap by ID
        const asset = assetMap.get(node.data.target.sys.id);
        // render the EMBEDDED_ASSET as you need
        return <img src={asset.url} alt="post" />;
      },
    },
  };
};

export default function RichTextResponse(richTextResponse: any) {
  return (
    <>
      {documentToReactComponents(
        richTextResponse.json,
        renderOptions(richTextResponse.links)
      )}
    </>
  );
}
