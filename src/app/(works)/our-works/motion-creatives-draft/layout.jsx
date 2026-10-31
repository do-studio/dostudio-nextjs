// The previous motion creatives page, kept as a draft: reachable by URL but hidden from search engines.
export const metadata = {
  title: "Motion Creatives (draft)",
  robots: { index: false, follow: false },
};

export default function DraftLayout({ children }) {
  return children;
}
