interface AcceptedListProps {
  previews: File[];
  removeFile: (id: string) => void;
}

const AcceptedList: React.FC<AcceptedListProps> = ({
  previews,
  removeFile,
}) => {
  const styles = {
    listStyle: {
      marginTop: "2em",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
      gap: "20px",
      marginBottom: "5em",
      gridRowGap: "4em",
    },
    listItmeStyle: {
      position: "relative",
      height: "4.5em",
      width: "5em",
      listStyleType: "none",
    },
    iframeStyle: {
      overflow: "hidden",
      border: "none",
      width: "100%",
      height: "100%",
    },
    imageStyle: {
      height: "100%",
      width: "100%",
      objectFit: "fill",
      borderRadius: "0.375rem",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    cancelStyle: {
      width: "1.3em",
      height: "1.3em",
      padding: "2px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "-10px",
      right: "-10px",
      cursor: "pointer",
      color: "#fff",
      backgroundColor: "#f54257",
      borderRadius: "50%",
    },
    tooltipStyle: {
      position: "absolute",
      top: "-10px",
      transform: "translateX(-70%)",
      color: "red",
    },
    titleStyle: {
      marginTop: "2px",
      fontSize: "0.85em",
      color: "#666",
      wordWrap: "break-word",
    },
  };

  return (
    <>
      <ul style={styles.listStyle}>
        {previews?.map((preview) => {
          return (
            <li
              key={preview.id}
              style={styles.listItmeStyle as React.CSSProperties}
            >
              {preview.type.startsWith("image/") ? (
                <img
                  src={preview.preview}
                  alt={preview.name}
                  onLoad={() => URL.revokeObjectURL(preview.preview)}
                  style={styles.imageStyle as React.CSSProperties}
                />
              ) : (
                <iframe
                  title="PDF Preview"
                  style={styles.iframeStyle}
                  onLoad={() => URL.revokeObjectURL(preview.preview)}
                  src={preview.preview}
                  width={100}
                  height={100}
                  allowFullScreen
                />
              )}

              <Icon
                style={styles.cancelStyle as React.CSSProperties}
                name="x"
                size={12}
                onClick={() => removeFile(preview.id)}
              />

              <p style={styles.titleStyle as React.CSSProperties}>
                `${preview.name.substring(0, 30)}...`
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default AcceptedList;
