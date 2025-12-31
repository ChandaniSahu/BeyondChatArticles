import { CheckCircle, Loader2, Link as LinkIcon } from "lucide-react";

const ArticlePreview = ({ article, onSave, saving, optimizing }) => {
//   if (optimizing) {
//     return (
//       <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-3 border border-red-500">
//         <Loader2 size={28} className="animate-spin" />
//         <p className="text-sm font-medium">Optimizing article…</p>
//       </div>
//     );
//   }

//   if (!article) {
//     return (
// <div className="h-full flex flex-col items-center justify-center gap-3 text-center border border-black">
//   <div className="bg-blue-50 p-4 rounded-full">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="44"
//       height="44"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="text-blue-500"
//     >
//       <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
//       <path d="M13 2v7h7" />
//       <path d="M8 13h8" />
//       <path d="M8 17h5" />
//     </svg>
//   </div>

//   <h3 className="text-lg font-semibold text-slate-800">
//     Optimized Article Preview
//   </h3>

//   <p className="text-sm text-slate-500 max-w-xs">
//     Click <span className="font-semibold text-blue-600">Enhance</span> on any article to generate an AI-optimized version here.
//   </p>
// </div>


//     );
//   }

  return (
  <div className="relative p-4 rounded-lg h-[calc(100%-50px)] ">
    {/* Fixed Header */}
    <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-blue-200 border-b border-blue-100 rounded-t-lg">
      <h2 className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
        Optimized Article
      </h2>

      <button
        onClick={onSave}
        disabled={saving}
        className="bg-blue-600 text-white cursor-pointer px-3 py-1.5 rounded-md text-xs flex items-center gap-2 disabled:opacity-50"
      >
        {saving ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <CheckCircle size={14} />
        )}
        Save Changes
      </button>
    </div>

    {/* Content */}
    <div className="mt-14 pb-6 px-6 h-full overflow-y-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        {article.title}
      </h1>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {article.references?.length > 0 && (
        <div className="mt-10">
          <h4 className="text-xs font-bold uppercase text-slate-400 mb-3">
            References
          </h4>
          <div className="flex flex-wrap gap-2">
            {article.references.map((ref, i) => (
              <a
                key={i}
                href={ref}
                target="_blank"
                rel="noreferrer"
                className="border px-3 py-1 rounded-full text-xs flex items-center gap-1"
              >
                <LinkIcon size={12} />
                {new URL(ref).hostname}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

};

export default ArticlePreview;
