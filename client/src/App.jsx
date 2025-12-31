import React, { useEffect, useState } from "react";
import axios from "axios";
import { marked } from "marked";
import { Loader2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import fetchOrigin from "./services/fetchOrigin";

import ArticleCard from "./ArticleCard";
import ArticlePreview from "./ArticleView";
import ArticleModal from "./ArticleModal";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [previewArticle, setPreviewArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refiningId, setRefiningId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${fetchOrigin()}/fetchFromBeyond`
        );
        setArticles(res.data.data);
      } catch {
        toast.error("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, []);

   const handleSave = async () => {
      if (!selectedArticle) return;

      setSaving(true);
      try {
        const payload = {
          link: selectedArticle.link, // Used as the unique identifier
          updatedTitle: selectedArticle.title,
          updatedContent: selectedArticle.content, // This is the HTML/Markdown string
            references: selectedArticle.references,
          };

        await axios.post(`${fetchOrigin()}/save-refined`, payload);
        toast.success("Article saved to Firestore!");
      } catch (error) {
        console.error("Save failed:", error);
        toast.error("Failed to save article.");
      } finally {
        setSaving(false);
        }
      };


  const handleRefine = async (article) => {
    // 1. Start loading state for the specific article
    setRefiningId(article.link);

    try {
      // 2. Prepare the payload exactly as your Node.js route expects it
      const payload = {
        title: article.title,
        description: article.content,
      };



      // 3. Make the POST request to your backend
      // Replace '/refine-article' with your full URL if the backend is on a different port
      const response = await axios.post(
        `${fetchOrigin()}/refine-article`,
        payload
      );

      // 4. Axios automatically parses the JSON, so 'response.data' is your final object
      const refinedData = response.data;

      // 5. Update your React state with the new SEO title, content, and references
      setSelectedArticle({
        ...article, // Keep original data like links or images
        title: refinedData.updatedTitle,
        content: marked.parse(refinedData.updatedContent),
        references: refinedData.references || [],
      });
    } catch (error) {
      console.error("Frontend Refinement Error:", error);

      // Check for specific error status from your Node.js route
      if (error.response?.status === 500) {
        alert("The AI failed to rewrite the article. Please try again.");
      } else {
        alert("Network error: Could not reach the optimization server.");
      }
    } finally {
      // 6. Stop loading state
      setRefiningId(null);
    }
  };
  if (loading) {
    return (
      <div className="h-screen flex  flex-col items-center  gap-4 justify-center">
        <h1 className="text-lg font-semibold text-blue-600">Dynamically Fetching 5 Oldest Articles from BeyondChats...</h1>
        <Loader2 size={40} className="animate-spin text-blue-200" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <ToastContainer />

      <h1 className="text-3xl font-bold mb-6">
        AI Content Workspace
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          {articles.map((item, idx) => (
            <ArticleCard
              key={idx}
              item={item}
              refiningId={refiningId}
              isAnyRefining={!!refiningId}
              onRefine={handleRefine}
              onPreview={(article) => {
                setPreviewArticle(article);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>

        <div className="md:col-span-2 bg-white rounded-xl ">
          <ArticlePreview
            article={selectedArticle}
            optimizing={!!refiningId}
            saving={saving}
            onSave={() => {handleSave()}}
          />
        </div>
      </div>

      <ArticleModal
        isOpen={isModalOpen}
        article={previewArticle}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default App;

