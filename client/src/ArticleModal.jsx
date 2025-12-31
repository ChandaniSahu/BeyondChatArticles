import { X, ExternalLink, FileText } from "lucide-react";
import { marked } from "marked";

const ArticleModal = ({ isOpen, onClose, article }) => {
  if (!isOpen || !article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60"
      onClick={(e) => e.target === e.currentTarget && onClose()}
     >
      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl ">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <div className="flex items-center gap-2 text-indigo-600">
            <FileText size={18} />
            <span className="text-xs font-bold uppercase">
              Original Article
            </span>
          </div>
          <button onClick={onClose} className="cursor-pointer p-2 hover:bg-slate-100 rounded-full">
            <X />
          </button>
        </div>

        <div className="p-6  overflow-y-auto max-h-[calc(90vh-80px)]">
          <h2 className="text-2xl font-bold mb-4">
            {article.title}
          </h2>

          <a
            href={article.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm text-indigo-600 mb-4"
          >
            <ExternalLink size={14} />
            View Source
          </a>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: marked.parse(article.content),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
