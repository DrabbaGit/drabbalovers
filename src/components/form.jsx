import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";
import { firebaseApp, uploadFile } from "../../lib/firebase";

// Firebase database configuration
const db = getFirestore(firebaseApp);

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // DOC is the influencer image file
  const [doc, setDoc] = useState(null);
  // Gallery is the array of images
  const [gallery, setGallery] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const handleDocChange = (e) => {
    const file = e.target.files[0];
    setDoc(file);
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGallery(files);
    console.log(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (gallery.length < 5) {
      alert("Por favor sube al menos 5 imágenes en la galería.");
      return;
    } else if (gallery.length > 10) {
      alert("El maximo de fotos en la galería es de 10");
      return;
    }
    setLoading(true);
    try {
      const docUrl = await uploadFile(doc);
      const galleryUrls = await Promise.all(
        gallery.map((file) => uploadFile(file))
      );
      const influencer = {
        name: name,
        description: description,
        email: email,
        instagram: instagram,
        tiktok: tiktok,
        urlDoc: docUrl,
        galleryUrls: galleryUrls,
      };
      const docRef = await addDoc(collection(db, "influencers"), {
        ...influencer,
      });
      window.location.replace(`/${docRef.id}`);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setName("");
    setDescription("");
    setEmail("");
    setInstagram("");
    setTiktok("");
    setDoc(null);
    setGallery([]);
    setGalleryPreviews([]);
  };

  return (
    <div className="relative m-5 text-black">
      {loading && (
        <div className="absolute inset-0 bg-opacity-75 flex items-center justify-center z-50">
          <div className="loader border-4 border-t-4 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          <span className="ml-2 text-gray-700">Enviando...</span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
        disabled={loading}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Descripción (Cuentanos un poco sobre ti):
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Correo:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Foto de perfil (Imagen de alta calidad usando ropa de nuestra marca)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleDocChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Por favor, suba aquí varias fotos tuyas de tu preferencia (Entre 5 y
            10 fotos):
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            disabled={loading}
          />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {galleryPreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Imagen ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Link de instagram, ejemplo: <b className="text-blue-600"> https://www.instagram.com/drabbalovers/ </b> 
          </label>
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Link de Tiktok, ejemplo: <b className="text-blue-600"> https://www.tiktok.com/@drabbalovers </b> 
          </label>
          <input
            type="text"
            value={tiktok}
            onChange={(e) => setTiktok(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg focus:outline-none ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
};

export default Form;
