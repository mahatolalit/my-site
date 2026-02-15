import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";
import WindowControls from "#components/WindowControls";

const ImgFile = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;

    if (!data) return null;

    return (
        <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-2xl">
            <div id="window-header" className="flex items-center justify-between px-4 py-3 bg-[#e8e8e8] border-b border-[#d1d1d1]">
                 <div className="flex items-center gap-4">
                     <WindowControls target="imgfile" />
                 </div>
                 <p className="font-semibold text-gray-600 text-sm truncate max-w-[200px]">{data.name}</p>
                 <div className="w-14"></div> {/* Spacer for centering */}
            </div>
            <div className="flex-1 flex items-center justify-center p-4 bg-[#f5f5f7] overflow-hidden">
                <img 
                    src={data.imageUrl} 
                    alt={data.name} 
                    className="max-h-full max-w-full object-contain shadow-md rounded"
                />
            </div>
        </div>
    );
};

const ImgFileWindow = WindowWrapper(ImgFile, "imgfile");

export default ImgFileWindow;
