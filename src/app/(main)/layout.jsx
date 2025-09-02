import '../globals.css';
import Sidebar from '@/components/ui/Sidebar';
import Navbar from '@/components/ui/Navbar';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex">
            <div className="z-50 fixed left-0 top-0 h-full">
                <Sidebar />
            </div>

            <div className="ml-60 flex-1 flex flex-col min-h-screen">
                <div className="sticky top-0 z-10 bg-gray-50 flex-shrink-0">
                    <Navbar />
                </div>

                <main className="flex-1 pt-1 pr-4 pb-4">
                    <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm p-5 h-full min-h-[calc(100vh-8rem)]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}