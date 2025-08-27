import '../globals.css';
import Sidebar from '@/components/ui/Sidebar';
import Navbar from '@/components/ui/Navbar';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen">
            <Sidebar />

            <div className="ml-60 min-h-screen">
                <div className="sticky top-0 z-20 bg-gray-50 border-b border-gray-200">
                    <Navbar />
                </div>

                <main className="p-6">
                    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 min-h-[calc(100vh-10rem)]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}