import Sidebar from "@/components/admin/Sidebar";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div className="flex">
  <Sidebar />

  <main className="min-w-0 flex-1">
    {children}
  </main>
</div>
  );
}