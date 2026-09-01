export const ARTICLE_PER_PAGE = 6;
const production_domain = "https://cloud-hosting-eight.vercel.app";
const development_domain = "http://localhost:3000";
export const domain= process.env.NODE_ENV === "production" ? production_domain : development_domain;