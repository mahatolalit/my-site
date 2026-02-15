import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControls from "#components/WindowControls";
import { finderItems, startUpProjects, locations } from "#constants";
import { useState, useEffect } from "react";
import useWindowStore from "#store/window";
import { Menu } from "lucide-react";

const Finder = () => {
    const [active, setActive] = useState(1); // 'Work' is default active
    const [selectedItem, setSelectedItem] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const { openWindow, windows } = useWindowStore();

    useEffect(() => {
        if(windows.finder.data?.activeId) {
            setActive(windows.finder.data.activeId);
        }
    }, [windows.finder.data]);

    const handleFolderClick = (id) => {
        // If it's a project folder (id >= 5), we can set it as active
        // But currently 'active' state logic is tied to finderItems ids (1, 2, 3, 4)
        // We probably need a more robust navigation system.
        // For now, let's just make it possible to navigate into subfolders if implemented
        // But user request is about clicking folders in sidebar (already working) OR from work section
        setActive(id);
        setSelectedItem(null);
    };

    const getCurrentContent = () => {
        if (active === 1) { // Work
             return locations.work.children;
        } else if (active === 2) { // About me
             return locations.about.children;
        } else if (active === 3) { // Resume
             return locations.resume.children;
        } else if (active === 4) { // Trash
             return locations.trash.children;
        } else if (active === 10) { // Socials
             return locations.socials.children;
        } else {
             // Check if it's a subfolder in Work
             const workFolder = locations.work.children.find(c => c.id === active);
             if (workFolder) return workFolder.children;
        }
        return [];
    }

    const currentItems = getCurrentContent();

    return (
        <div className="h-full flex overflow-hidden rounded-xl bg-white w-full relative">
            {/* Sidebar Overlay */}
            {showSidebar && (
                <div 
                    className="absolute inset-0 bg-black/10 z-10 md:hidden"
                    onClick={() => setShowSidebar(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`sidebar w-48 bg-gray-50/80 backdrop-blur-xl border-r border-gray-200 flex flex-col p-4 absolute inset-y-0 left-0 z-20 transition-transform duration-300 md:static md:translate-x-0 ${showSidebar ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}>
                <div className="flex gap-2 mb-6">
                     <WindowControls target="finder" />
                </div>
                
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 mb-2 px-2">Favorites</h3>
                        <ul className="space-y-1">
                            {finderItems.map((item) => (
                                <li 
                                    key={item.id} 
                                    className={`flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
                                        active === item.id 
                                        ? "bg-gray-200/60" 
                                        : "hover:bg-gray-200/40"
                                    }`}
                                    onClick={() => { setActive(item.id); setShowSidebar(false); }}
                                >
                                    <img 
                                        src={item.icon} 
                                        alt={item.title} 
                                        className={`w-4 h-4 ${active === item.id ? "opacity-100" : "opacity-70"}`}
                                    />
                                    <span className={`text-[13px] ${active === item.id ? "font-medium text-black" : "text-gray-600"}`}>
                                        {item.title}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 mb-2 px-2">Work</h3>
                         <ul className="space-y-1">
                         {locations.work.children.map((item) => {
                                return (
                                <li 
                                    key={item.id} 
                                    className={`flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
                                        active === item.id 
                                        ? "bg-gray-200/60" 
                                        : "hover:bg-gray-200/40"
                                    }`}
                                    onClick={() => { setActive(item.id); setSelectedItem(null); setShowSidebar(false); }} 
                                 >
                                    <img src={item.icon} alt={item.name} className="w-4 h-4 opacity-70" />
                                    <span className="text-[13px] truncate text-gray-600 max-w-[140px] block overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</span>
                                 </li>
                                )
                         })}
                         </ul>
                     </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col h-full bg-white transition-all duration-300 min-w-0">
                <div id="window-header" className="h-12 bg-white flex items-center justify-between px-2 sm:px-4 border-b border-gray-100 shrink-0 gap-2">
                     <div className="flex items-center gap-2 sm:gap-4 text-gray-400 min-w-0 flex-1">
                        {/* Mobile Controls */}
                        <div className="flex items-center gap-2 sm:gap-3 md:hidden border-r border-gray-200 pr-2 sm:pr-3 mr-1 shrink-0">
                             <WindowControls target="finder" />
                             <button
                                onClick={() => setShowSidebar(!showSidebar)}
                                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                             >
                                <Menu className="w-4 h-4 text-gray-600" />
                             </button>
                        </div>
                        <div className="flex gap-2 sm:gap-4 hidden sm:flex shrink-0">
                            <span className="hover:text-gray-600 cursor-default" onClick={() => { setActive(1); setSelectedItem(null); }}>❮</span>
                            <span className="hover:text-gray-600 cursor-default">❯</span>
                        </div>
                        <span className="font-semibold text-gray-700 text-sm truncate min-w-0 flex-1">
                            {
                                finderItems.find(i => i.id === active)?.title ||
                                locations.work.children.find(c => c.id === active)?.name ||
                                "Folder"
                            }
                        </span>
                     </div>
                     <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        <img src="/icons/search.svg" className="w-4 h-4 opacity-50" />
                     </div>
                </div>
                
                <div className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {currentItems.length > 0 ? (
                         <ul className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-x-2 gap-y-6 md:gap-x-4 md:gap-y-8">
                             {currentItems.map((item) => (
                                 <li 
                                    key={item.id} 
                                    className={`flex flex-col items-center gap-2 group cursor-pointer ${selectedItem?.id === item.id ? "bg-gray-100/50 rounded-lg" : ""}`}
                                    onClick={() => {
                                        setSelectedItem(item);
                                        if (item.kind === 'folder') {
                                            setActive(item.id);
                                            setSelectedItem(null);
                                        } else if (item.kind === 'file') {
                                            if (item.fileType === 'pdf') {
                                                openWindow("resume");
                                            } else if (item.fileType === 'url') {
                                                window.open(item.href, '_blank');
                                            } else if (item.fileType === 'img') {
                                                openWindow("imgfile", { name: item.name, imageUrl: item.imageUrl });
                                            } else if (item.fileType === 'fig') {
                                                window.open(item.href, '_blank');
                                            }
                                        }
                                    }}
                                >
                                     <div 
                                        className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center ${
                                            selectedItem?.id === item.id 
                                            ? "bg-gray-300/40 ring-2 ring-blue-400/50" 
                                            : item.bg 
                                                ? "hover:brightness-110 shadow-sm" 
                                                : "bg-blue-50/0 group-hover:bg-gray-100"
                                        }`}
                                        style={item.bg ? { backgroundColor: item.bg } : {}}
                                     >
                                        <img 
                                            src={item.icon} 
                                            alt={item.name} 
                                            className={`w-12 h-12 md:w-16 md:h-16 drop-shadow-sm object-contain ${item.bg ? "p-2 md:p-3 brightness-0 invert" : ""}`} 
                                        />
                                     </div>
                                     <p className={`text-[11px] md:text-[13px] text-center font-medium leading-tight max-w-[80px] md:max-w-[120px] break-words transition-colors ${selectedItem?.id === item.id ? "text-blue-600 bg-blue-100/50 rounded px-1" : "text-gray-700 group-hover:text-blue-600"}`}>
                                         {item.name}
                                     </p>
                                 </li>
                             ))}
                         </ul>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                             <img src="/images/folder.png" className="w-16 h-16 opacity-20 mb-4" />
                             <p>Folder is empty</p>
                        </div>
                    )}
                </div>
                
                {selectedItem && selectedItem.kind === 'file' && selectedItem.fileType === 'txt' && (
                    <div className="h-40 bg-gray-50 border-t border-gray-100 p-4 shrink-0 overflow-y-auto">
                        <div className="flex gap-4">
                            <img src={selectedItem.icon} className="w-10 h-10 object-contain" />
                            <div>
                                <h4 className="font-semibold text-sm text-gray-700 mb-1">{selectedItem.name}</h4>
                                <div className="text-xs text-gray-500 space-y-1">
                                    {selectedItem.description && selectedItem.description.map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="h-8 bg-gray-50 border-t border-gray-100 flex items-center px-4 text-xs text-gray-500 justify-between shrink-0">
                    <span>{currentItems.length} items</span>
                    <span>Available space 100 GB</span>
                </div>
            </div>
        </div>
    );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
