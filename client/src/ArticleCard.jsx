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
    className="bg-white rounded-2xl p-5 cursor-pointer
               border border-slate-200
               hover:border-blue-300 hover:shadow-md
               transition-all duration-200"
    onClick={() => onPreview(item)}
  >
    {/* Content */}
    <div className="max-h-[200px] overflow-y-auto mb-5 pr-2">
      <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
        {item.title}
      </h3>

      <div
        className="text-sm text-slate-600 leading-relaxed prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{
          __html: marked.parse(item.content),
        }}
      />
    </div>

    {/* Actions */}
    <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRefine(item);
        }}
        title="Enhance Article with AI"
        disabled={isAnyRefining}
        className={`bg-blue-600 hover:bg-blue-700 text-white
                   px-4 py-1.5 text-xs rounded-lg
                   flex items-center gap-1.5
                   disabled:opacity-50 transition ${isAnyRefining ? 'cursor-not-allowed' : 'cursor-pointer'}`}
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
        title="Preview Original Article"
        className="text-xs text-blue-600 border border-blue-200
                   hover:bg-blue-50 px-3 py-1.5 rounded-lg
                   flex items-center gap-1 transition cursor-pointer"
      >
        <Eye size={12} />
        View
      </button>

      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
        title="View Source Article"
        className="p-1.5 rounded-full hover:bg-slate-100 transition"
      >
        <ExternalLink size={16} className="text-slate-400" />
      </a>
    </div>
  </div>
);

};

export default ArticleCard;
