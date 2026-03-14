import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/appContext";

export default function SendPage() {
  const location = useLocation();
  const { theme } = useAppContext();
  const { fixType, service } = location.state ?? {};
  const [description, setDescription] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);

  const hasContext = useMemo(() => Boolean(fixType || service), [fixType, service]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [imagePreviews]);

  const handleFiles = (event) => {
    const files = Array.from(event.target.files ?? []);
    const previews = files.map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setImagePreviews((current) => [...current, ...previews]);
  };

  const removeImage = (preview) => {
    URL.revokeObjectURL(preview.preview);
    setImagePreviews((current) => current.filter((item) => item.preview !== preview.preview));
  };

  return (
    <section className="page-section" style={{ backgroundColor: theme.colors.background }}>
      <h1 className="section-heading">Send Service Request</h1>
      {hasContext ? (
        <p>
          {service && <strong>{service}</strong>} for <em>{fixType}</em>
        </p>
      ) : (
        <p>Pick a fix type and service to pre-fill this form.</p>
      )}
      <label>
        Describe the issue
        <textarea
          className="textarea-field"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <label>
        Upload supporting images
        <input type="file" accept="image/*" multiple onChange={handleFiles} className="input-field" />
      </label>
      <div>
        {imagePreviews.map((photo, index) => (
          <div key={`${photo.preview}-${index}`} className="image-preview">
            <img src={photo.preview} alt={`uploaded-${index}`} />
            <button type="button" onClick={() => removeImage(photo)} aria-label="Remove image">
              ×
            </button>
          </div>
        ))}
      </div>
      <button type="button" style={{ marginTop: theme.spacing.md }}>
        Submit request (mock)
      </button>
    </section>
  );
}
