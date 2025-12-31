// import { Loader2, Sparkles, ExternalLink } from "lucide-react";
// import { marked } from "marked";

// const ArticleCard = ({ item, refiningId, onRefine, onPreview }) => {
//   return (
//     <div
//       className="bg-white border rounded-xl p-4 hover:bg-slate-50 cursor-pointer relative"
//       onClick={() => onPreview(item)}
//     >
//       <div className="max-h-[220px] overflow-hidden mb-4">
//         <h3 className="font-semibold text-slate-900 mb-2">
//           {item.title}
//         </h3>
//         <div
//           className="text-sm text-slate-600"
//           dangerouslySetInnerHTML={{
//             __html: marked.parse(item.content),
//           }}
//         />
//       </div>

//       <div className="flex items-center justify-between">
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onRefine(item);
//           }}
//           disabled={refiningId === item.link}
//           className="bg-black text-white px-3 py-1 text-xs rounded-md flex items-center gap-1 disabled:opacity-50"
//         >
//           {refiningId === item.link ? (
//             <Loader2 size={12} className="animate-spin" />
//           ) : (
//             <Sparkles size={12} />
//           )}
//           Enhance
//         </button>

//         <a
//           href={item.link}
//           target="_blank"
//           rel="noreferrer"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <ExternalLink size={16} className="text-slate-400" />
//         </a>
//       </div>
//     </div>
//   );
// };

// export default ArticleCard;


import { Loader2, Sparkles, ExternalLink, Eye } from "lucide-react";
import { marked } from "marked";

const ArticleCard = ({
  item,
  refiningId,
  isAnyRefining,
  onRefine,
  onPreview,
}) => {
  return (
    <div
      className="bg-white rounded-xl p-4 hover:bg-slate-50 cursor-pointer"
      onClick={() => onPreview(item)}
    >
      <div className="max-h-[200px] overflow-y-auto mb-4">
        <h3 className="font-semibold text-slate-900 mb-2">
          {item.title}
        </h3>
        <div
          className="text-sm text-slate-600"
          dangerouslySetInnerHTML={{
            __html: marked.parse(item.content),
          }}
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRefine(item);
          }}
          disabled={isAnyRefining}
          className="bg-black text-white px-3 py-1 text-xs rounded-md flex items-center gap-1 disabled:opacity-50"
        >
          {refiningId === item.link ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              Optimizing
            </>
          ) : (
            <>
              <Sparkles size={12} />
              Enhance
            </>
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPreview(item);
          }}
          className="text-xs border px-3 py-1 rounded-md flex items-center gap-1"
        >
          <Eye size={12} />
          View
        </button>

        <a
          href={item.link}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink size={16} className="text-slate-400" />
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
