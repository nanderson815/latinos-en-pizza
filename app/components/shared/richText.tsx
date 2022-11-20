import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
// import { BLOCKS } from '@contentful/rich-text-types';

// const renderOptions = {
//     renderNode: {
//         [BLOCKS.EMBEDDED_ENTRY]: (node: any, children: any) => {
//             if (node.data.target.sys.contentType.sys.id === 'videoEmbed') {
//                 return (
//                     <iframe
//                         src={node.data.target.fields.embedUrl}
//                         height="100%"
//                         width="100%"
//                         frameBorder="0"
//                         scrolling="no"
//                         title={node.data.target.fields.title}
//                         allowFullScreen={true}
//                     />
//                 );
//             }
//         },

//         [BLOCKS.EMBEDDED_ASSET]: (node: any, children: any) => {
//             // render the EMBEDDED_ASSET as you need
//             return (
//                 <img
//                     src={`https://${node.data.target.fields.file.url}`}
//                     height={node.data.target.fields.file.details.image.height}
//                     width={node.data.target.fields.file.details.image.width}
//                     alt={node.data.target.fields.description}
//                 />
//             );
//         },
//     },
// };

export default function RichTextResponse(richTextResponse: any) {
    return <>{documentToReactComponents(richTextResponse.json)}</>;
}