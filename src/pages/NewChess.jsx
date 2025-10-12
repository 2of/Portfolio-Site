import React, { useState } from "react";
import { CenteredContainer } from "../components/Scroll/CenteredContainer";
import { StandardButton } from "../components/UI/StandardButton";
import styles from "./NewChess.module.scss";
import { CHESS_Board } from "../components/chess/CHESS_Board";
import { useAlertMenu } from "../contexts/AlertMenuContext";
import { Modal } from "../components/Modal";
import { useProjects } from "../contexts/ContentContext";
import {
  isValidPGN,
  parsePGNtoRawMoves,
  samplePGN,
} from "../components/chess/chessutils";
import { Article } from "../components/Article/Article";
import { loadModel, predict } from "../utils/Model";
import { StandardRadioButtons } from "../components/UI/StandardRadioButtons";
import getIcon from "../utils/Iconifier";
import Loader from "../components/Loader";
import { CHESS_Container } from "../components/chess/CHESS_Container";
import { ChessTracker } from "../components/chess/gametracker";
import { useModal } from "../contexts/ModalContext";
export const NewChessPage = () => {
  const [pgn, setpgn] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("dense");
  const [game, setGame] = useState(new ChessTracker());

  const { alertState, showAlert, hideAlert, alertVisible } = useAlertMenu();
  const [modelStatus, setModelStatus] = useState("Not loaded");
  const { getArticle, getListOfArticles, getArticleMetaData } = useProjects();
  //   const game = new ChessTracker();
  const [version, setVersion] = useState(0); // dummy for chess being broken ish
  const { modalState, showModal, hideModal, modalVisible } = useModal();
  const handleOpenModal = () => {
    openModal();
  };


  const openModal = () => { 
showModal({
      // title: "blah blah",
      size : "large",
      floatnav: true,
      content: (
        <Article
          metadata={getArticleMetaData("chessEloEstimator")}
          // style="modern"
          // topDivideDouble={true}
          // twoColumns={true}
          // AsArticle={true}
        />
      ),
    });

  }
  const sampleBoard = [
    ["r", "n", "b", "q", "k", "b", "n", "r"], // Rank 8 - Black back rank
    ["p", "p", "p", "p", "p", "p", "p", "p"], // Rank 7 - Black pawns
    [null, null, null, null, null, null, null, null], // Rank 6
    [null, null, null, null, null, null, null, null], // Rank 5
    [null, null, null, null, null, null, null, null], // Rank 4
    [null, null, null, null, null, null, null, null], // Rank 3
    ["P", "P", "P", "P", "P", "P", "P", "P"], // Rank 2 - White pawns
    ["R", "N", "B", "Q", "K", "B", "N", "R"], // Rank 1 - White back rank
  ];
  const handleLoadSampleClick = () => {
    setpgn(samplePGN);
    updateClick(samplePGN); // pass it directly
  };

  const updateClick = (currentPGN = pgn) => {
    if (!isValidPGN(currentPGN)) {
      showAlert({
        title: "Your PGN sucks",
        message: "From a formatting POV, check it's correct pls",
      });
      return;
    }

    const moves = parsePGNtoRawMoves(currentPGN);
    setGame(new ChessTracker(moves));
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
      const message = `There are ${issues.length} issue(s):\n\n- ${issues.join(
        "\n- "
      )}`;

      // If your modal renders HTML, replace \n with <br>:
      // const message = `There are ${issues.length} issue(s):<br><br>- ${issues.join("<br>- ")}`;

      triggerAlert(title, message);
    }
  };

  return (
    <>

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
            <CHESS_Container key={version} game={game} />
          </div>

          <div className={styles.controlArea}>
            <h4>Paste Your PGN Here</h4>

            <textarea
              value={pgn}
              onChange={(e) => setpgn(e.target.value)}
              placeholder="Paste PGN here"
              className={`flatStyleShadow_NO_INTERACT ${styles.Textarea}`}
            />
            <div className={styles.buttonRow}>
              <StandardButton
                label="Update"
                tooltip="White prediction"
                type="subtle"
                callback={updateClick}
              />

              <StandardButton
                label="Load Sample"
                tooltip="White prediction"
                //   type="subtle"
                callback={handleLoadSampleClick}
                type="subtle"
              >
                Submit
              </StandardButton>
            </div>
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
              />
              <span className={styles.buttonRow}>
                <StandardButton
                  label="Load Model"
                  type="subtle"
                  callback={handleLoadModel}
                />
                <StandardButton
                  label={modelStatus === "Loaded" ? "" : "Compute"}
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
              {pgn === "" ? "No moves yet" : parsePGNtoRawMoves(pgn, true)}
            </div>
          </div>
        </div>
      </CenteredContainer>
    </>
  );
};
