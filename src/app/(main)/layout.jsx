import '../globals.css';
import Sidebar from '@/components/ui/Sidebar';
import Navbar from '@/components/ui/Navbar';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen">
            <div className="z-50">
                <Sidebar />
            </div>

            <div className="ml-60 min-h-screen">
                <div className="sticky top-0 z-10 bg-gray-50">
                    <Navbar />
                </div>

                <main className="pt-1 pr-4">
                    <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm p-8 min-h-[calc(100vh-10rem)]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}