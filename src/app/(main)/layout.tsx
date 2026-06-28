import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import PageTransitionWrapper from "@/components/layout/PageTransitionWrapper";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main id="main-content" className="min-h-screen pt-[72px] grid-bg">
        <PageTransitionWrapper>
          {children}
        </PageTransitionWrapper>
      </main>
      <Footer />
    </>
  );
}
