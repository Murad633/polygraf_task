import { SignInHeader } from "../../components/SignInHeader";
import { SignInFooter } from "../../components/SignInFooter";
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileVideo } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export function Analyzer() {
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const [productInfo, setProductInfo] = useState('');
  const location = useLocation();
  const user = location.state ? location.state.user : null;

  const realTimeAnalyzeHandler = () => {
    setProductInfo('Your result is good for real-time analysis');
  };

  const backgroundProcessHandler = async () => {
    try {
      if (user) {
        const userEmail = user.email;

        // Make a POST request to the server to upload the video
        const response = await fetch("http://localhost:8000/videos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail,
            videoName: file.name,
            // Add any other relevant information about the video
          }),
        });

        if (response.ok) {
          setProductInfo('Your data is being processed in the background, we will notify you when the result is ready');
        } else {
          console.log('Failed to upload video to the server');
          setProductInfo('Failed to upload video. Please try again.');
        }
      } else {
        console.error('User information not available.');
        setProductInfo('An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setProductInfo('An error occurred. Please try again later.');
    }
  };
  const uploaderClickHandler = () => {
    fileRef.current.click();
  };

  const uploaderChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile && droppedFile.type === "video/mp4") {
      setFile(droppedFile);
    }
  };

  return (
    <div className={styles.container}>
      <SignInHeader />
      <div className={styles.main_wrapper}>
        <div className={styles.analyze_wrapper}>
            <div className={styles.content}>
              <h1 className={styles.heading}>Analyze the Video</h1>
              <p>Find out which product video you can trust. Insert a product video from one of our supported platforms and our AI will do the rest.</p>
            </div>
            <div className={styles.uploader_wrapper} onDrop={handleDrop} onDragOver={handleDragOver}>
              <form action="" onSubmit={(e) => e.preventDefault()}>
                <input onChange={uploaderChangeHandler} style={{ display: "none" }} ref={fileRef} type="file" name="file" id="file" accept=".mp4" />
                <div onClick={uploaderClickHandler} className={styles.uploader_box}>
                  <FontAwesomeIcon className={styles.faFileVideo} icon={faFileVideo} />
                  {file ? <p>{file.name}</p> : <p>Click to upload or drag and drop here</p>}
                </div>
                <div className={styles.btn_wrapper}>
                    <button className={styles.btn_primary} onClick={realTimeAnalyzeHandler}>Real time analyze</button>
                    <button className={styles.btn_primary} onClick={backgroundProcessHandler}>Background processing</button>
                </div>
              </form>
            </div>
        </div>
        {file && productInfo && 
            <div className={styles.result_wrapper}>
                <div className={styles.video_result}>
                    <div className={styles.result_text}>
                        <h2 className={styles.heading}>{file.name}</h2>
                        {productInfo && <p className={styles.product_info}>{productInfo}</p>}
                    </div>
                </div>
            </div>
        }
      </div>
      <SignInFooter />
    </div>
  );
}
