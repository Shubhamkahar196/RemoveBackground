
import { useState } from "react";
import axios from "axios";
import { UploadCloud, Image as ImageIcon, Loader2, Download, X } from "lucide-react";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null); 
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:5000/remove-bg",
        formData,
        { responseType: "blob" }
      );
      setResult(URL.createObjectURL(res.data));
    } catch (error) {
      console.error("Upload failed", error);
      alert("Something went wrong. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto ">
      {/* Upload Zone */}
      {!preview ? (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-700 rounded-2xl cursor-pointer bg-slate-800/50 hover:bg-slate-800 hover:border-blue-500 transition-all group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="p-4 bg-slate-700/50 rounded-full group-hover:scale-110 transition-transform duration-300 mb-4">
              <UploadCloud className="w-8 h-8 text-blue-400" />
            </div>
            <p className="mb-2 text-sm text-slate-200">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-500">PNG, JPG or WEBP (Max. 10MB)</p>
          </div>
          <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
        </label>
      ) : (
        <div className="space-y-6">
          {/* Comparison / Preview Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Original</p>
              <img src={preview} alt="Original" className="rounded-lg h-48 w-full object-cover border border-slate-700" />
              {!loading && !result && (
                <button 
                  onClick={() => {setPreview(null); setImage(null);}}
                  className="absolute top-8 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              )}
            </div>

            <div className="relative">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Result</p>
              <div className="h-48 w-full rounded-lg border border-slate-700 bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] bg-slate-700 flex items-center justify-center overflow-hidden">
                {loading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                    <span className="text-xs text-slate-400">Removing...</span>
                  </div>
                ) : result ? (
                  <img src={result} alt="Result" className="h-full w-full object-contain" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-600" />
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            {!result ? (
              <button
                onClick={handleUpload}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : <UploadCloud size={20} />}
                {loading ? "Processing..." : "Remove Background"}
              </button>
            ) : (
              <div className="flex gap-3">
                 <button
                  onClick={() => {setPreview(null); setImage(null); setResult(null);}}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                  Upload New
                </button>
                <a
                  href={result}
                  download="no-bg-image.png"
                  className="flex-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Download PNG
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;