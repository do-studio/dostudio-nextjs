// The previous creative-posters page, kept as a draft: reachable by URL but hidden from search engines.
export const metadata = {
  title: "Creative Posters (draft)",
  robots: { index: false, follow: false },
};

export default function DraftLayout({ children }) {
  return children;
}
