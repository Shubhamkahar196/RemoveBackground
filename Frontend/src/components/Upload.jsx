import { useState } from "react";
import axios from "axios";

const  Upload = () => {

  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!image) return alert("Select image first");

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post(
      "http://localhost:5000/remove-bg",
      formData,
      { responseType: "blob" }
    );

    setResult(URL.createObjectURL(res.data));
    setLoading(false);
  };

  return (
    
      <div className="bg-gray-800 p-8 rounded-xl w-100 text-center shadow-xl">

       

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="text-white mb-4"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 cursor-pointer rounded"
        >
          Remove Background
        </button>

        {loading && <p className="text-white mt-4">Processing...</p>}

        {result && (
          <div className="mt-6">
            <img src={result} className="mx-auto rounded" />

            <a
              href={result}
              download="output.png"
              className="block mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded cursor-pointer"
            >
              Download Image
            </a>
          </div>
        )}

      </div>
    
  );
}

export default Upload;