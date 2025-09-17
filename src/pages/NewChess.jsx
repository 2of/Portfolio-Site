import React, { useState } from "react";
import { CenteredContainer } from "../components/Scroll/CenteredContainer";
import { StandardButton } from "../components/UI/StandardButton";
import styles from "./NewChess.module.scss";
import { CHESS_Board } from "../components/chess/CHESS_Board";
import { useAlertMenu } from "../contexts/AlertMenuContext";
import { Modal } from "../components/Modal";
import { useProjects } from "../contexts/ContentContext";
import { isValidPGN } from "../components/chess/chessutils";
import { Article } from "../components/Article/Article";
import { loadModel, predict } from "../utils/Model";
import { StandardRadioButtons } from "../components/UI/StandardRadioButtons";
import getIcon from "../utils/Iconifier";
import Loader from "../components/Loader";
export const NewChessPage = () => {
  const [pgn, setpgn] = useState("");
  const [showmodal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("dense");

  const { alertState, showAlert, hideAlert, alertVisible } = useAlertMenu();
  const [modelStatus, setModelStatus] = useState("Not loaded");
  const { getArticle, getListOfArticles, getArticleMetaData } = useProjects();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const triggerAlert = (title, desc) => {
    showAlert({
      title: title,
      message: desc,
    });
    sethasShownWarning(1);
  };

  const handleLoadModel = async () => {
    setLoading(true);
    try {
      const result = await loadModel(selectedModel);
      setModelStatus(result.message); // success message
    } catch (err) {
      setModelStatus(err.message || "Failed to load model"); // handle failure
    } finally {
      setLoading(false);
    }
  };

const handleComputeClick = () => {
  let issues = [];

  if (!isValidPGN(pgn)) {
    issues.push("Invalid PGN format");
  }

  issues.push("The model returned an error");

  if (issues.length > 0) {
    const title = `Did not run Forward Pass`;

    // Use \n for plain alerts
    const message = `There are ${issues.length} issue(s):\n\n- ${issues.join("\n- ")}`;

    // If your modal renders HTML, replace \n with <br>:
    // const message = `There are ${issues.length} issue(s):<br><br>- ${issues.join("<br>- ")}`;

    triggerAlert(title, message);
  }
};

  return (
    <>
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

      <CenteredContainer>
        <div className={styles.header}>
          <h1>Chess Elo Estimator</h1>

          <span>Paste PGN → Select a Model → Load Model → Press predict</span>
          <p>
            This page loads tensorflow models trained on ~33 million chess games
            to estimate ELO. See the Link Link Link Read about it{" "}
            <a
              onClick={handleOpenModal}
              style={{
                color: "var(--primary-color)", // or any accent color
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              here
            </a>
          </p>
        </div>

        <div className={styles.twocol}>
          <div className={styles.gameArea}>
            <CHESS_Board />
          </div>

          <div className={styles.controlArea}>
            <h4>Paste Your PGN Here</h4>

            <textarea
              value={pgn}
              onChange={(e) => setpgn(e.target.value)}
              placeholder="Paste PGN here"
              className={`flatStyleShadow_NO_INTERACT ${styles.Textarea}`}
            />

            <StandardButton
              label="Submit"
              tooltip="White prediction"
              type="subtle"
              callback={handleComputeClick}
            >
              Submit
            </StandardButton>

            <div className={styles.divider} />

            <div className={styles.ControlsSection}>
              {loading && (
                <div className={styles.loadingOverlay}>
                  <Loader />
                </div>
              )}
              {/* <div className={styles.modelStatus}>Model Status: {modelStatus}</div> */}
              <h4>Select a Model</h4>
              {/* <p>Select a Model</p> */}
              <StandardRadioButtons
                //   label="Model"
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
              <span className={styles.buttonRow}>
                <StandardButton
                  label="Load Model"
                  tooltip="White prediction"
                  type="subtle"
                  callback={handleLoadModel}
                />
                <StandardButton
                  label={modelStatus === "Loaded" ? "" : "Compute"}
                  tooltip="White prediction"
                  disable={modelStatus === "Loaded"}
                  type="subtle"
                  callback={handleComputeClick}
                />

                {/* <div className={styles.modelStatus}>Model Status: {modelStatus}</div> */}
              </span>
              <div className={styles.modelStatus}>{modelStatus}</div>
            </div>
            <div className={styles.divider} />
            {/* <h4>And Voila</h4> */}

            <span className={styles.buttonRow}>
              <h5>Estimated ELOs </h5>
              <span className={styles.estimation}>White: ????</span>
              <span className={styles.estimation}>Black: ????</span>
            </span>
            <div className={styles.divider} />

            <div className={styles.movesList}>
              {pgn === "" ? "No moves yet" : "e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6"}
            </div>
          </div>
        </div>
      </CenteredContainer>
    </>
  );
};
