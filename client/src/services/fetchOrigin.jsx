const fetchOrigin = () => {
  const env = import.meta.env.VITE_ENV; 
   if(env=='/dev'){
    return 'http://localhost:3000';
   } else {
    return 'https://beyond-chat-articles.vercel.app';
   }
};

export default fetchOrigin;