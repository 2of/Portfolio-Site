import React, { useState } from "react";
import styles from "./styles/ChessPage.module.scss";
import { loadModel, predict } from "../utils/Model";
import { StandardButton } from "../components/UI/StandardLib/StandardButton.jsx";
import { StandardRadioButtons } from "../components/UI/StandardLib/StandardRadioButtons.jsx";
import getIcon from "../utils/Iconifier";
import FlowChartComponent from "../components/Misc/FlowChart";
// import ColumnWithSections from "../components/Column/ColumnWithSections";
import { Modal } from "../components/UI/StandardLib/Modal.jsx";
import { useProjects } from "../contexts/ContentContext";
import { Article } from "../components/Article/Article";


export const ChessPage = () => {
  const [pgnText, setPgnText] = useState("");
  const [selectedModel, setSelectedModel] = useState("dense");
  const [modelStatus, setModelStatus] = useState("Not loaded");
  const { getArticle, getListOfArticles,getArticleMetaData } = useProjects();
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" }); // 'error' | 'success' | 'info'

  const [showmodal, setShowModal] = useState(false);



  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleLoadModel = async () => {
    setLoading(true);
    const result = await loadModel(selectedModel);
    setModelStatus(result.message);
    setLoading(false);
  };
  const testData = {
    nodes: [
      { id: '1', label: 'Input' },
      { id: '2', label: 'Process' },
      { id: '3', label: 'Validate' },
      { id: '4', label: 'Complete' }
    ],
    links: [
      { source: '1', target: '2' },
      { source: '2', target: '3' },
      { source: '3', target: '4' }
    ]
  };
  const handlePredict = async () => {
    if (!pgnText.trim()) {
      setFeedback({ message: "Please enter a PGN string.", type: "error" });
      return;
    }

    if (modelStatus === "Not loaded") {
      setFeedback({ message: "Please load a model first.", type: "error" });
      return;
    }

    setLoading(true);
    setFeedback({ message: "Predicting...", type: "info" });

    try {
      const result = await predict({ pgn: pgnText, model: selectedModel });

      if (!result || !result.prediction) {
        setFeedback({
          message: "Something went wrong with the prediction.",
          type: "error",
        });
      } else {
        setPrediction(result);
        setFeedback({ message: "Prediction complete!", type: "success" });
      }
    } catch (err) {
      setFeedback({
        message: "Error during prediction. Possibly invalid PGN.",
        type: "error",
      });
    }

    setLoading(false);
  };

  return (
    <div className={`GenericPageContainer centered`}>
      <div className={styles.ChessPage}>
        <div className={styles.Header}>
          <div className={styles.Title}>♟️ Neural Net Chess Ratings Estimator</div>
        </div>

        <div className={styles.explainer}>
Paste a valid PGN below (Valid syntactically, not necessarily as a plausible game) and select a model. Select 'load model' then 'predict'. Model descriptions are in 'about'
        </div>
        {feedback.message && (
          <div className={`${styles.Feedback} ${styles[feedback.type]}`}>
            {feedback.message}
          </div>
        )}
        <div className={styles.UploadSection}>
          <textarea
            value={pgnText}
            onChange={(e) => setPgnText(e.target.value)}
            placeholder="Paste PGN here"
            className={`flatStyleShadow_NO_INTERACT ${styles.Textarea}`}
          />

          <div className={styles.Controls}>
            <h4>Estimated Elos</h4>
            <StandardButton
              label={
                prediction
                  ? `${prediction.prediction.white} (${Math.round(
                    prediction.confidence.white * 100
                  )}%)`
                  : "Black"
              }
              tooltip="White prediction"
              type="basic_Expand"
              disable={true}
              callback={() => { }}
            />



            <StandardButton
              label={
                prediction
                  ? `${prediction.prediction.black} (${Math.round(
                    prediction.confidence.black * 100
                  )}%)`
                  : "White"
              }
              tooltip="White prediction"
              type="basic_Expand"
              disable={true}
              callback={() => { }}
            />
            <StandardRadioButtons
              label="Model"
              options={[
                { label: "CNN", value: "cnn" },
                { label: "RNN", value: "rnn" },
                { label: "Dense", value: "dense" },
              ]}
              selectedValue={selectedModel}
              onChange={setSelectedModel}
              layout="horizontal"
              tooltip="Choose the model type"
            />

            <StandardButton
              label="Predict"
              tooltip="Run the prediction"
              type="basic_Expand"
              callback={handlePredict}
            />

            <StandardButton
              label={loading ? "Wait" : "Load Model"}
              tooltip="Load the selected model"
              type="basic_Expand"
              callback={handleLoadModel}
            />


            <StandardButton
              label="About"
              tooltip="Open popup"
              type="basic_small"
              icon={getIcon("chess")}
              callback={handleOpenModal}
            />


          </div>
        </div>



        <div className={styles.BoardDisplay}></div>
      </div>


      {showmodal && (
        <Modal
          component={
            <Article
              metadata={getArticleMetaData("chessEloEstimator")}
              // style="modern"
              // topDivideDouble={true}
              // twoColumns={true}
              // AsArticle={true}
            />
          }
          onClose={() => setShowModal(false)}
          size="large"
          title={"Project Features"}
          isOpen={showmodal}
        />
      )}




    </div>
  );
};